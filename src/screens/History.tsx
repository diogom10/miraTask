import React from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';

export const History = () => {
  const completedTasks = useGlobalSelector(state => state.context.completedTasks);

  return (
    <FlatList
      data={completedTasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskView task={item} />}
    />
  );
};
