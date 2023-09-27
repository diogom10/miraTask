import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface ITaskLoadrops {
  quantity: number;
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const TaskLoad = ({quantity = 10}: ITaskLoadrops) => {
  const quantityItems = new Array(quantity)?.fill(true);
  return quantityItems.map(_ => {
    return (
      <View style={styles?.container}>
        <ShimmerPlaceholder style={styles.shimmer} />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#dedede',
    borderRadius: 20,
    borderWidth: 1,
    margin: 2,
    overflow: 'hidden',
    marginBottom: 10,
    height: 70,
  },
  shimmer: {
    height: '100%',
    width: '100%',
  },
});
