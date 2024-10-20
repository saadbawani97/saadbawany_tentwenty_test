import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';
import { NavigationService } from '../config';

const Navigation = () => {
  return (
    <NavigationContainer ref={NavigationService?.navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigation;
