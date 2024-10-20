import {
  createNavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import {NavigationStackType} from '../types';
const navigationRef = createNavigationContainerRef<NavigationStackType>();

const navigate = (name: any, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
const reset = (name: any, data?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params: {data}}],
      }),
    );
  }
};
const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

export default {
  navigationRef,
  navigate,
  reset,
  goBack,
};
