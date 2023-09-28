import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView/TaskView';
import {Task} from '../models/Task';
import {TaskLoad} from '../components/TaskLoad/TaskLoad';
import {TaskEmpty} from '../components/TaskEmpty/TaskEmpty';
import {DEFAULT_TASK} from '../navigation/Navigation';
import ActionSheet from 'react-native-action-sheet';

export const TasksList = () => {
  const {send} = useGlobalActorRef();
  const {currentTasks} = useGlobalSelector(state => state.context);

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setTasks([]);
    setTimeout(() => {
      setIsLoading(false);
      setTasks(currentTasks);
    }, 1000);
  }, [currentTasks]);

  const handleDelete = (taskID: string) => {
    send({type: 'DELETE', taskID: taskID});
  };

  const handleCompleted = (taskID: string) => {
    send({type: 'UPDATE', taskID: taskID});
  };

  const showAlert = (task: Task) => {
    let options = ['Mark task as completed', 'Delete Task', 'Cancel'];
    let DESTRUCTIVE_INDEX = 3;
    let CANCEL_INDEX = 2;
    ActionSheet.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: '#ff0b0b',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          handleDelete(task?.id);
        }
        if (buttonIndex === 0) {
          handleCompleted(task?.id);
        }
      },
    );
  };
  const navigateToDetail = (task: Task) => {
    send({type: 'SHOW_EDITOR', data: {...task}});
  };
  const renderLoadState = () => <TaskLoad quantity={12} />;

  const renderEmptyState = () => {
    return (
      <TaskEmpty
        title={'You don`t have any task'}
        actionTitle={'Try add a new task'}
        action={() => navigateToDetail(DEFAULT_TASK)}
      />
    );
  };

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskView
            onPressCard={() => navigateToDetail(item)}
            onPressOptions={() => showAlert(item)}
            task={item}
          />
        )}
        ListEmptyComponent={isLoading ? renderLoadState() : renderEmptyState()}
      />
    </>
  );
};
