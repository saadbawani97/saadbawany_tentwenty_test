import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  tabBarContainer: {
    height: Metrix.VerticalSize(85),
    backgroundColor: '#2E2739',
    borderTopLeftRadius: Metrix.HorizontalSize(30),
    borderTopRightRadius: Metrix.HorizontalSize(30),
    position: 'absolute',
    bottom: Metrix.VerticalSize(-10),
  },
  textStyle: {
    fontSize: 11,
    fontFamily: Fonts['Poppins-Regular'],
    top: Platform.OS === "android" ? -15 : 0,
    color: Colors.grayColor
  },
});
export default styles;
