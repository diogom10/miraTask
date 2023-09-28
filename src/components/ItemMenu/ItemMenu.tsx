import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export interface ItemMenuProps {
  icon: React.ReactElement;
  title: string;
  action?: () => void;
  testID?: string;
}

export const ItemMenu = ({
  icon,
  title,
  action = () => null,
  testID = 'ItemMenu',
}: ItemMenuProps) => {
  return (
    <TouchableOpacity
      testID={`${testID}_btn_action`}
      style={styles.container}
      onPress={action}>
      {icon}
      <Text testID={`${testID}_title`} style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
    marginBottom: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bdbfd3',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    color: '#6b7093',
    marginLeft: 20,
  },
});
