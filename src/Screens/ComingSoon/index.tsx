import React, {useEffect, useState} from 'react';
import {FlatList, View, SafeAreaView, StyleSheet, Text} from 'react-native';
import useApp from '../../Statemanagement/hooks/useApp';
import MovieCard from '../../components/movieCard';
import SearchHeader from '../../components/searchHeader';
import {Colors, Constants, Fonts, Metrix} from '../../config';

export const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '400',
    fontSize: Metrix.customFontSize(30),
    color: Colors.Primary,
  },
});
