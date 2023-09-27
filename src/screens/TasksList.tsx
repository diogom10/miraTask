import React from 'react';
import {FlatList} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {Task} from '../models/Task';

export const TasksList = () => {
  const {send} = useGlobalActorRef();

  const {currentTasks} = useGlobalSelector(state => state.context);

  const navigateToDetail = (task: Task) => {
    send({type: 'SHOW_EDITOR', data: {...task}});
  };

  return (
    <FlatList
      data={currentTasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TaskView onPressCard={() => navigateToDetail(item)} task={item} />
      )}
    />
  );
};
