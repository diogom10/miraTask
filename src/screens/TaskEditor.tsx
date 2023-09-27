import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {Task} from '../models/Task';
import {RouteProp, useRoute} from '@react-navigation/native';
import {showToastMessage} from '../helper';

interface ITaskViewProps {
  task?: Task;
}

export const TaskEditor = ({navigation}: {navigation: any}) => {
  const {send} = useGlobalActorRef();
  const currentTask = useGlobalSelector(state => state.context.currentTask);

  const route = useRoute<RouteProp<Record<string, ITaskViewProps>, string>>();

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
    if (!currentTask?.title) {
      showToastMessage({message: 'Title can`t be empty', duration: 2000});
      return;
    }
    send({type: 'SAVE', taskID: currentTask?.id});
    if (route?.params?.task?.id) {
      showToastMessage({message: 'Successfully edited', duration: 2000});
    } else {
      showToastMessage({message: 'New task born', duration: 2000});
    }
    navigation?.goBack();
  };

  const handleCancel = () => send({type: 'CANCEL'});

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={currentTask?.title}
        onChangeText={handleEditTitle}
        maxLength={40}
      />
      <TextInput
        style={[styles.textInput, styles.description]}
        multiline
        placeholder="Description"
        value={currentTask?.description ?? ''}
        maxLength={200}
        onChangeText={handleEditDescription}
      />
      <View>
        <Button
          color="#4282da"
          title={currentTask?.id ? 'Edit' : 'Save'}
          onPress={handleSave}
        />
        <View style={{marginVertical: 5}} />
        <Button color="#d8bd5f" title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    height: '75%',
    padding: 4,
    margin: 20,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#dedede',
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 260,
  },
  description: {
    flex: 2,
  },
  buttonDefault: {
    width: '40%',
  },
});
