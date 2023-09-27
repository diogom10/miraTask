import React from 'react';
import {Task} from '../models/Task';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface ITaskViewProps {
  task: Task;
  onPressCard?: () => void;
}
export const TaskView = ({task, onPressCard}: ITaskViewProps) => (
  <TouchableOpacity style={styles.container} onPress={onPressCard}>
    <View style={styles.mainSection}>
      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
        {task?.title}
      </Text>
      <Text style={styles.check}>{task?.completed ? '✅' : '▢'}</Text>
    </View>
    <Text>{task?.description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    padding: 4,
    margin: 2,
    backgroundColor: 'white',
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '92%',
  },
  check: {
    fontSize: 24,
    minHeight: 20,
    width: '8%',
    textAlign: 'center',
  },
});
