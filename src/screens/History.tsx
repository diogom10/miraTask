import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {Task} from '../models/Task';
import {TaskLoad} from '../components/TaskLoad';

export const History = () => {
  const completedTasks = useGlobalSelector(
    state => state.context.completedTasks,
  );

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTasks(completedTasks);
    }, 2000);
  }, []);

  const renderLoadState = () => <TaskLoad quantity={12} />;

  const renderEmptyState = () => {
    return null;
  };

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskView task={item} />}
      ListEmptyComponent={isLoading ? renderLoadState() : renderEmptyState()}
    />
  );
};
