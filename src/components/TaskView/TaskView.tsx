import React from 'react';
import {Task} from '../../models/Task';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MenuIcon} from '../../assets/icons/menu';
import {CheckIcon} from '../../assets/icons/check';

export interface ITaskViewProps {
  task: Task;
  onPressCard?: () => void;
  onPressOptions?: () => void;
  testID?: string;
}

export const TaskView = ({
  task,
  onPressCard,
  onPressOptions,
  testID = 'TaskView',
}: ITaskViewProps) => (
  <TouchableOpacity
    activeOpacity={1}
    testID={`${testID}_btn_card`}
    style={styles.container}
    onPress={onPressCard}>
    <View style={styles.mainSection}>
      <Text
        testID={`${testID}_title`}
        style={styles.title}
        ellipsizeMode="tail"
        numberOfLines={2}>
        {task?.title}
      </Text>
      <>
        {!task?.completed && (
          <TouchableOpacity
            testID={`${testID}_btn_options`}
            style={styles.ctnButton}
            onPress={onPressOptions}>
            <MenuIcon width={20} height={20} fill={'gray'} />
          </TouchableOpacity>
        )}
      </>
      <>
        {task?.completed && (
          <CheckIcon
            testID={`${testID}_check_icon`}
            width={20}
            height={20}
            fill={'green'}
          />
        )}
      </>
    </View>
    <Text testID={`${testID}_description`}>{task?.description}</Text>
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
