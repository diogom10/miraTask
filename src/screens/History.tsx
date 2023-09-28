import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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

  const renderHeaderList = () => {
    return (
      <View>
        <Text style={styles.title}>COMPLETED</Text>
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={isLoading ? null : renderHeaderList()}
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskView task={item} />}
      ListEmptyComponent={isLoading ? renderLoadState() : renderEmptyState()}
    />
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#989aae',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
});
