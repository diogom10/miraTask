import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Warning} from '../assets/icons/warning';
import {Profile} from '../models/Profile';

interface IProfileInfoProps {
  profile: Profile;
  currentTasks: number;
  completedTasks: number;
}

export const ProfileInfo = ({
  profile,
  currentTasks = 0,
  completedTasks = 0,
}: IProfileInfoProps) => {
  return (
    <>
      <View style={styles.containerHeader}>
        <View style={styles.userInfo}>
          <Image
            style={styles.image}
            source={{
              uri:
                profile?.phoroUrl ||
                'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
            }}
          />
          <View style={styles.controlName}>
            {/*<Text style={styles.title}>Diogo Moura</Text>*/}
            {/*<Text style={styles.subtitle}>React Native Developer</Text>  */}
            <Text style={styles.title}>{profile?.name}</Text>
            <Text style={styles.subtitle}>{profile?.profession}</Text>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.rowInfo}>
            <Warning width={16} height={16} fill={'#989aae'} />
            <Text style={styles.infoText}>{profile?.phone}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Warning width={16} height={16} fill={'#989aae'} />
            <Text style={styles.infoText}>{profile?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerTaskInfo}>
        <View style={styles.taskInfo}>
          <Text style={styles.title}>Current Tasks</Text>
          <Text style={styles.subtitle}>{currentTasks}</Text>
        </View>
        <View style={styles.taskInfoSeparatorCenter} />
        <View style={styles.taskInfo}>
          <Text style={styles.title}>Completed Tasks</Text>
          <Text style={styles.subtitle}>{completedTasks}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    padding: 20,
    borderRadius: 20,
    margin: 2,
    minHeight: 70,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlName: {
    flexDirection: 'column',
    marginLeft: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#0b1352',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#989aae',
  },
  contactInfo: {
    marginTop: 20,
  },
  rowInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 10,
    color: '#989aae',
  },
  containerTaskInfo: {
    minHeight: 90,
    width: '100%',
    justifyContent: 'space-between',
    borderColor: '#ebecee',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRightWidth: 0,
    borderLeftWidthWidth: 0,
    flexDirection: 'row',
  },
  taskInfo: {
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskInfoSeparatorCenter: {
    height: '100%',
    borderWidth: 2,
    borderColor: '#ebecee',
  },
});
