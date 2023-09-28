import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';
import {ProfileInfo} from '../components/Profileinfo';
import {ItemMenu} from '../components/ItemList';
import {ShareIcon} from '../assets/icons/share';
import {TrashIcon} from '../assets/icons/trash';
import {CheckIcon} from '../assets/icons/check';
import {LogoutIcon} from '../assets/icons/logout';
import {showToastMessage} from '../helper';

export const Settings = () => {
  const {currentTasks, completedTasks} = useGlobalSelector(
    state => state.context,
  );
  const {send} = useGlobalActorRef();

  const onDeleteAllTasks = () => {
    if (!currentTasks?.length) {
      showToastMessage({
        message: 'You don`t have any task',
        duration: 2000,
      });
      return;
    }
    Alert.alert('Are you sure?', 'All of your current tasks will be deleted!', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => send({type: 'DELETE_ALL'})},
    ]);
  };

  const onCompleteAllTasks = () => {
    if (!currentTasks?.length) {
      showToastMessage({
        message: 'You don`t have any task to complete',
        duration: 2000,
      });
      return;
    }
    Alert.alert(
      'Are you sure?',
      'All of your tasks will be set as completed!',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => send({type: 'COMPLETE_ALL'})},
      ],
    );
  };
  return (
    <View style={styles.container}>
      <ProfileInfo
        completedTasks={completedTasks?.length}
        currentTasks={currentTasks?.length}
        profile={{
          email: 'diogomoura10@gmail.com',
          name: 'Diogo Moura',
          phone: '(+55) 11 983593722',
          phoroUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
          profession: 'React Native Developer',
        }}
      />
      <View style={styles.containerMenu}>
        <ItemMenu
          icon={<ShareIcon width={20} height={20} fill={'#4270d4'} />}
          title={'Share'}
        />
        <ItemMenu
          action={() => onDeleteAllTasks()}
          icon={<TrashIcon width={20} height={20} fill={'#4270d4'} />}
          title={'Delete All Current Tasks'}
        />
        <ItemMenu
          action={() => onCompleteAllTasks()}
          icon={<CheckIcon width={20} height={20} fill={'#4270d4'} />}
          title={'Mark All tasks as Completed'}
        />
        <ItemMenu
          icon={<LogoutIcon width={20} height={20} fill={'#4270d4'} />}
          title={'Logout'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  containerMenu: {
    marginTop: 20,
  },
});
