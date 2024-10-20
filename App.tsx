import React from 'react';
import Navigation from './src/Navigation';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Warning: ...', // Add specific warning messages you want to ignore
]);

LogBox.ignoreAllLogs(true);
function App() {
  return <Navigation />;
}

export default App;
