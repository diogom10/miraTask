import {InterpreterFrom, MachineOptions, assign, createMachine} from 'xstate';
import {NavigationProp} from '@react-navigation/native';
import {Task} from '../models/Task';
import {RootStackParamList} from '../navigation/Navigation';

export type GlobalService = InterpreterFrom<typeof globalController>;

type GlobalContext = {
  currentTasks: [Task];
  completedTasks: [Task];
  currentTask?: Task;
  navigationController: NavigationProp<RootStackParamList>;
};

type GlobalEvents =
  | {type: 'SHOW_EDITOR'; data: Partial<Task>}
  | {type: 'SAVE'; taskID?: string}
  | {type: 'CANCEL'}
  | {type: 'EDIT'; data: Partial<Task>}
  | {type: 'DELETE'; taskID?: string};

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
    if (!e.taskID && ctx.currentTask) {
      const newTask: Task = {
        id: (Math.random() * ctx.currentTask.title.length * 100).toString(),
        title: ctx.currentTask.title,
        description: ctx.currentTask.description,
        completed: false,
      };
      const updatedTasks = [...ctx.currentTasks, newTask];
      return {
        currentTasks: updatedTasks as [Task],
        currentTask: undefined,
      };
    }
    let tasks = ctx.currentTasks;
    const index = tasks.findIndex(a => a?.id === e?.taskID);
    // @ts-ignore
    tasks[index] = ctx.currentTask;
    return {
      currentTasks: tasks as [Task],
      currentTask: undefined,
    };
  }),
  dismissTaskEditor: (ctx, _) =>
    ctx.navigationController.canGoBack() && ctx.navigationController.goBack(),
  deleteTask: assign((ctx, e) => {
    if (e.type !== 'DELETE') {
      return {};
    }
    const tasks = [...ctx.currentTasks];
    console.log('ctx>>>>',ctx)
    console.log('e>>>>',e)
    return {
      currentTasks: tasks?.filter(a => a?.id !== e?.taskID) as [Task],
      currentTask: undefined,
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
          DELETE: {
            target: 'idle',
            actions: 'deleteTask',
          },
        },
      },
    },
  },
  {
    actions,
  },
);
