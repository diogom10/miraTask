import {InterpreterFrom, MachineOptions, assign, createMachine} from 'xstate';
import {NavigationProp} from '@react-navigation/native';
import {Task} from '../models/Task';
import {RootStackParamList} from '../navigation/Navigation';
import {showToastMessage} from '../helper';

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  currentTasks: [Task];
  completedTasks: [Task];
  currentTask?: Task;
  navigationController: NavigationProp<RootStackParamList>;
  successForm: boolean;
};

type GlobalEvents =
  | {type: 'SHOW_EDITOR'; data: Partial<Task>}
  | {type: 'SAVE'; taskID?: string}
  | {type: 'CANCEL'}
  | {type: 'EDIT'; data: Partial<Task>}
  | {type: 'DELETE'; taskID?: string}
  | {type: 'UPDATE'; taskID?: string}
  | {type: 'UPDATE_FORM'; data: boolean};

const actions: MachineOptions<GlobalContext, GlobalEvents>['actions'] = {
  openTaskEditor: (ctx, e) => {
    ctx.navigationController.navigate('TaskEditor', {
      task: e.data,
    });
  },
  editTask: assign((ctx, e) => {
    if (e.type !== 'EDIT') {
      return {};
    }
    const currentTask = {
      ...(ctx.currentTask ?? {}),
      ...e.data,
    } as Task;
    return {
      currentTask,
    };
  }),
  saveNewTask: assign((ctx, e) => {
    if (e.type !== 'SAVE') {
      return {};
    }
    console.log('ctx>>SAVE', ctx);
    if (!ctx?.currentTask?.title) {
      return {};
    }
    if (!e.taskID && ctx.currentTask) {
      const newTask: Task = {
        id: (Math.random() * ctx.currentTask.title.length * 100).toString(),
        title: ctx.currentTask.title,
        description: ctx.currentTask.description,
        completed: false,
      };
      const updatedTasks = [newTask, ...ctx.currentTasks];

      return {
        currentTasks: updatedTasks as [Task],
        currentTask: undefined,
        successForm: true,
      };
    }
    let tasks = ctx.currentTasks;
    const index = tasks.findIndex(a => a?.id === e?.taskID);
    // @ts-ignore
    tasks[index] = ctx.currentTask;
    return {
      currentTasks: tasks as [Task],
      currentTask: undefined,
      successForm: true,
    };
  }),
  dismissTaskEditor: (ctx, _) =>
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack(),
  deleteTask: assign((ctx, e) => {
    if (e.type !== 'DELETE') {
      return {};
    }
    const tasks = [...ctx.currentTasks];
    return {
      currentTasks: tasks?.filter(a => a?.id !== e?.taskID) as [Task],
      currentTask: undefined,
    };
  }),
  updateTask: assign((ctx, e) => {
    if (e.type !== 'UPDATE') {
      return {};
    }
    let task = ctx.currentTasks?.find(a => a?.id === e?.taskID) as Task;
    task.completed = !task?.completed;
    return {
      currentTasks: ctx.currentTasks?.filter(a => a?.id !== task?.id) as [Task],
      completedTasks: [task, ...ctx.completedTasks],
      currentTask: undefined,
    };
  }),
  updateForm: assign((ctx, e) => {
    if (e.type !== 'UPDATE_FORM') {
      return {};
    }
    return {
      successForm: e?.data,
    };
  }),
};

export const globalController = createMachine(
  {
    schema: {
      context: {} as GlobalContext,
      events: {} as GlobalEvents,
    },
    predictableActionArguments: true,
    initial: 'idle',
    states: {
      idle: {
        on: {
          SHOW_EDITOR: {
            target: 'editing',
            actions: 'openTaskEditor',
          },
          DELETE: {
            target: 'idle',
            actions: 'deleteTask',
          },
          UPDATE: {
            target: 'idle',
            actions: 'updateTask',
          },
        },
      },
      editing: {
        on: {
          EDIT: {
            actions: 'editTask',
          },
          SAVE: {
            actions: 'saveNewTask',
            target: 'idle',
          },
          CANCEL: {
            target: 'idle',
            actions: 'dismissTaskEditor',
          },
          UPDATE_FORM: {
            target: 'idle',
            actions: 'updateForm',
          },
        },
      },
    },
  },
  {
    actions,
  },
);
