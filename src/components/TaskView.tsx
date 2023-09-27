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
      <Text style={styles.title}>{task?.title}</Text>
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
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  check: {
    fontSize: 24,
  },
});
