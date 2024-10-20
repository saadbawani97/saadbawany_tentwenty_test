import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Metrix} from '../config';

type Props = {
  text: string;
  index: number;
};

export const Tags = ({text, index}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.TagsColor[index % Colors.TagsColor.length],
        },
      ]}>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(30),
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginRight: 10,
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '600',
    fontSize: Metrix.FontExtraSmall,
    padding: 1,
  },
});
