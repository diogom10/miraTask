import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView/TaskView';
import {Task} from '../models/Task';
import {TaskLoad} from '../components/TaskLoad/TaskLoad';
import {TaskEmpty} from '../components/TaskEmpty/TaskEmpty';

export const History = () => {
  const completedTasks = useGlobalSelector(
    state => state.context.completedTasks,
  );

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setTasks([]);
    setTimeout(() => {
      setIsLoading(false);
      setTasks(completedTasks);
    }, 1000);
  }, [completedTasks]);

  const renderLoadState = () => <TaskLoad quantity={12} />;

  const renderEmptyState = () => {
    return <TaskEmpty title={'You don`t have any completed task'} />;
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
