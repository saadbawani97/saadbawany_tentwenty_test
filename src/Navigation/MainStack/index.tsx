import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from '../BottomTab';
import MovieDetail from '../../Screens/MovieDetails';
import MovieSearchScreen from '../../Screens/MovieSearchScreen';

const MainStackNavigator = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
      }}>
      <MainStackNavigator.Screen name="BottomTab" component={BottomTab} />
      <MainStackNavigator.Screen name="MovieDetail" component={MovieDetail} />
      <MainStackNavigator.Screen name="MovieSearchScreen" component={MovieSearchScreen} />
    </MainStackNavigator.Navigator>
  );
};
