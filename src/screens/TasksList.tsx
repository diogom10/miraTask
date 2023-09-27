import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {Task} from '../models/Task';
import {TaskLoad} from '../components/TaskLoad';
import {TaskEmpty} from '../components/TaskEmpty';
import {DEFAULT_TASK} from '../navigation/Navigation';

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
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TaskView onPressCard={() => navigateToDetail(item)} task={item} />
      )}
      ListEmptyComponent={isLoading ? renderLoadState() : renderEmptyState()}
    />
  );
};
