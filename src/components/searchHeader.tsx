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
import {Colors, Fonts, Icons, Metrix, NavigationService} from '../config';

const SearchHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Watch</Text>
      </View>
      <View style={[styles.searchContainer, {width: 40}]}>
        <TouchableOpacity
          activeOpacity={Metrix.ActiveOpacity}
          onPress={() => {
            NavigationService.navigate('MovieSearchScreen', {});
          }}>
          <Icons.Ionicons
            color={Colors.black}
            size={Metrix.VerticalSize(25)}
            name={'search'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: Metrix.VerticalSize(70),
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.black,
    fontFamily: Fonts['Poppins-Regular'],
    paddingLeft: 10,
  },
  searchContainer: {
    borderRadius: 100,
    justifyContent: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon1: {
    height: 20,
    width: 20,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  icon2: {
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
  icon3: {
    height: 20,
    width: 20,
    backgroundColor: 'green',
    borderRadius: 100,
  },
});
