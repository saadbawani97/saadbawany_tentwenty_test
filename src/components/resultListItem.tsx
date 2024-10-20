import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Fonts, Metrix} from '../config';

type ResultListItemProps = {
  containerStyle?: ViewStyle;
  movieTitle: string;
  imageUrl: string | ImageSourcePropType;
  movieCategory: string;
  id: string
};

const ResultListItem = ({
  containerStyle,
  movieTitle,
  imageUrl,
  movieCategory,
  id,
}: ResultListItemProps) => {
  return (
    <View key={id} style={[styles.container, containerStyle]}>
      <View style={{width: '40%'}}>
        <Image source={imageUrl} style={[styles.image]} />
      </View>
      <View style={[styles.subContainer, {width: '40%'}]}>
        <Text style={styles.movieTitle} numberOfLines={2}>{movieTitle}</Text>
        <Text style={styles.categoryTitle}>{movieCategory}</Text>
      </View>
      <View style={[styles.subContainer, {width: '20%'}]}></View>
    </View>
  );
};

export default ResultListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrix.VerticalSize(100),
    borderRadius: Metrix.Radius,
    marginVertical: Metrix.VerticalSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    justifyContent: 'center',
    paddingLeft: Metrix.HorizontalSize(10),
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.grayColor,
    borderRadius: Metrix.Radius,
  },
  movieTitle: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.FontRegular,
    color: Colors.Secondary,
    marginBottom: Metrix.VerticalSize(10),
  },
  categoryTitle: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.FontExtraSmall,
    color: Colors.lightWhite,
  },
});
