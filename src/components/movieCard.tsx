import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts, Metrix, NavigationService} from '../config';

type MovieCardProps = {
  containerStyle?: ViewStyle;
  movieTitle: string;
  imageUrl: string;
  id: string;
};

const MovieCard = ({
  containerStyle,
  movieTitle,
  imageUrl,
  id,
}: MovieCardProps) => {
  const navigateToDetailPage = () => {
    NavigationService.navigate('MovieDetail', {id});
  };

  return (
    <TouchableOpacity
      key={id.toString()}
      onPress={navigateToDetailPage}
      activeOpacity={Metrix.ActiveOpacity}
      style={[styles.container, containerStyle]}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={[styles.image]}
      />
      <Text style={styles.movieTitle}>{movieTitle}</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Metrix.VerticalSize(180),
    borderRadius: Metrix.Radius,
    marginVertical: Metrix.VerticalSize(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: Metrix.Radius,
  },
  movieTitle: {
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.FontMedium,
    position: 'absolute',
    bottom: Metrix.VerticalSize(20),
    left: Metrix.HorizontalSize(15),
    color: Colors.White,
  },
});
