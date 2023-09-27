import React from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';

export const TasksList = () => {
  const currentTasks = useGlobalSelector(state => state.context.currentTasks);

  return (
    <FlatList
      data={currentTasks?.filter(a => !a?.completed)}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskView task={item} />}
    />
  );
};
