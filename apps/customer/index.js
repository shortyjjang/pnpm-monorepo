/**
 * @format
 */

// Gesture Handler를 가장 먼저 import 해야 합니다
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';

// 매우 단순화된 형태로 코드 작성
AppRegistry.registerComponent('CustomerApp', () => App);
