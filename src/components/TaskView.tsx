import React from 'react';
import {Task} from '../models/Task';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MenuIcon} from '../assets/icons/menu';
import {CheckIcon} from '../assets/icons/check';

interface ITaskViewProps {
  task: Task;
  onPressCard?: () => void;
  onPressOptions?: () => void;
}

export const TaskView = ({
  task,
  onPressCard,
  onPressOptions,
}: ITaskViewProps) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={onPressCard}>
    <View style={styles.mainSection}>
      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
        {task?.title}
      </Text>
      <>
        {!task?.completed && (
          <TouchableOpacity style={styles.ctnButton} onPress={onPressOptions}>
            <MenuIcon width={20} height={20} fill={'gray'} />
          </TouchableOpacity>
        )}
      </>
      <>
        {task?.completed && <CheckIcon width={20} height={20} fill={'green'} />}
      </>
      {/*<Text style={styles.check}>{task?.completed ? '✅' : '▢'}</Text>*/}
    </View>
    <Text>{task?.description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    borderColor: '#dedede',
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
    margin: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fbfbfb',
    marginBottom: 10,
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 20,
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
  ctnButton: {
    width: 30,
    height: 20,
  },
});
