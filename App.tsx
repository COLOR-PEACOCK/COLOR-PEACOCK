import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { ObjectStateProvider } from '@hooks/ObjectScreen/objectStateContext';
import Router from './src/router';

function App() {
	return (
		<ObjectStateProvider>
			<NavigationContainer
				onReady={() => {
					BootSplash.hide({ fade: true });
				}}>
				<GestureHandlerRootView>
					<Router />
				</GestureHandlerRootView>
			</NavigationContainer>
		</ObjectStateProvider>
	);
}

export default App;
