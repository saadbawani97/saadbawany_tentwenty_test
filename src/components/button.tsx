import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts, Metrix} from '../config';

type StandardButtonProps = {
  buttonTitle: string;
  transparent: boolean;
  onPress?: () => void;
};

const StandardButton = ({
  buttonTitle,
  transparent,
  onPress,
  containerStyle
}: StandardButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={Metrix.ActiveOpacity}
      style={[
        styles.container,
        transparent ? styles.transparent : styles.filled,
        containerStyle
      ]}
      onPress={onPress}>
      <Text style={styles.buttonTitle}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default StandardButton;

const styles = StyleSheet.create({
  container: {
    height: Metrix.VerticalSize(50),
    borderRadius: Metrix.Radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    width: Metrix.HorizontalSize(243),
  },
  filled: {
    backgroundColor: Colors.Primary,
  },

  transparent: {
    backgroundColor: 'transparent',
    borderColor: Colors.Primary,
    borderWidth: 2,
  },
  buttonTitle: {
    color: Colors.White,
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '600',
    fontSize: Metrix.FontSmall,
  },
});
