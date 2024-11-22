import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BootSplash from 'react-native-bootsplash';
import { ObjectStateProvider } from '@hooks/ObjectScreen/objectStateContext';

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
