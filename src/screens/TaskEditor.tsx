import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {Task} from '../models/Task';
import {RouteProp, useRoute} from '@react-navigation/native';

interface ITaskViewProps {
  task?: Task;
}

export const TaskEditor = ({navigation}) => {
  const {send} = useGlobalActorRef();
  const currentTask = useGlobalSelector(state => state.context.currentTask);

  const route = useRoute<RouteProp<Record<string, ITaskViewProps>, string>>();

  console.log('currentTask', currentTask);
  console.log('route', route?.params?.task);

  useEffect(() => {
    handleTask(route?.params?.task);
  }, []);

  useEffect(() => {
    return () => send('CANCEL');
  }, [send]);

  const handleTask = (task: Task | undefined) =>
    send({type: 'EDIT', data: {...task}});

  const handleEditTitle = (text: string) =>
    send({type: 'EDIT', data: {title: text}});

  const handleEditDescription = (text: string) =>
    send({type: 'EDIT', data: {description: text}});

  const handleSave = () => {
    send({type: 'SAVE', taskID: currentTask?.id});
    navigation.goBack();
  };

  const handleCancel = () => send({type: 'CANCEL'});

  const handleDelete = () => {
    send({type: 'DELETE', taskID: currentTask?.id});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={currentTask?.title}
        onChangeText={handleEditTitle}
      />
      <TextInput
        style={[styles.textInput, styles.description]}
        multiline
        placeholder="Description"
        value={currentTask?.description ?? ''}
        onChangeText={handleEditDescription}
      />
      <View>
        <Button color="blue" title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
        <Button color="red" title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    height: '75%',
    padding: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 2,
  },
  description: {
    flex: 2,
  },
});
