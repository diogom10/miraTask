import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useGlobalSelector} from '../contexts/GlobalContext';
import {ProfileInfo} from '../components/Profileinfo';
import {ItemMenu} from '../components/ItemList';
import {ShareIcon} from '../assets/icons/share';
import {TrashIcon} from '../assets/icons/trash';
import {CheckIcon} from '../assets/icons/check';
import {LogoutIcon} from '../assets/icons/logout';

export const Settings = () => {
  const {currentTasks, completedTasks} = useGlobalSelector(
    state => state.context,
  );

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
          icon={<TrashIcon width={20} height={20} fill={'#4270d4'} />}
          title={'Delete All Tasks'}
        />
        <ItemMenu
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
