import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {TaskView} from '../components/TaskView';
import {Task} from '../models/Task';
import {TaskLoad} from '../components/TaskLoad';

export const TasksList = () => {
  const {send} = useGlobalActorRef();
  const {currentTasks} = useGlobalSelector(state => state.context);

  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTasks(currentTasks);
    }, 2000);
  }, []);

  const navigateToDetail = (task: Task) => {
    send({type: 'SHOW_EDITOR', data: {...task}});
  };
  const renderLoadState = () => <TaskLoad quantity={12} />;

  const renderEmptyState = () => {
    return null;
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
