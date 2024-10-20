import {Dimensions, Platform} from 'react-native';

type dimension = {
  width: number;
  height: number;
};

export function isIPhoneXSize(dim: dimension) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim: dimension) {
  return dim.height == 896 || dim.width == 896;
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
}
