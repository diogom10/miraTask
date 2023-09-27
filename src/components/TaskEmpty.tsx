import React from 'react';
import {Task} from '../models/Task';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Warning} from '../assets/icons/warning';

interface ITaskEmptyProps {
  title: string;
  actionTitle?: string;
  action?: () => void;
}

export const TaskEmpty = ({
  title,
  actionTitle,
  action = () => {},
}: ITaskEmptyProps) => (
  <View style={styles.container}>
    <Warning style={styles.icon} width={80} height={80} fill={'#656053'} />
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={action}>
      <Text style={styles.actionTitle}>{actionTitle}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderRadius: 20,
    minHeight: 200,
    borderWidth: 1,
    padding: 4,
    margin: 2,
    marginTop: '50%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fbfbfb',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '92%',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#508ce8',
    color: '#508ce8',
    textAlign: 'center',
    width: '92%',
  },
  icon: {
    marginBottom: 20,
  },
});
