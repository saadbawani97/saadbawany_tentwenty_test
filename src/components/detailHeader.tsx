import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import {Colors, Fonts, Metrix} from '../config';

const DetailHeader = () => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        style={{width: '20%'}}>
        <Text>back icon</Text>
      </TouchableOpacity>
      <View style={[styles.subContainer, {width: '60%'}]}>
        <Text style={styles.text1}>The King’s Man</Text>
        <Text style={styles.text2}>In theaters december 22, 2021</Text>
      </View>
      <View style={[styles.subContainer, {width: '20%'}]}></View>
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.grayColor,
    height: Metrix.VerticalSize(100),
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'orange',
    borderRadius: Metrix.Radius,
  },
  text1: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.FontRegular,
    color: Colors.Secondary,
  },
  text2: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.FontExtraSmall,
    color: Colors.Primary,
  },
});
