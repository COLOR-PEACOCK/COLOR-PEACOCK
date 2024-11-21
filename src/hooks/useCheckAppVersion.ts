import { Alert, Linking, NativeModules } from 'react-native';
import { CheckVersionOptions, checkVersion } from 'react-native-check-version';

const useCheckAppVersion = () => {
	const checkAppVersion = async () => {
		const options: CheckVersionOptions = {
			bundleId: 'com.ColorPeacock',
		};
		const version = await checkVersion(options);
		console.log(NativeModules.RNDeviceInfo.appVersion);
		if (version.needsUpdate) {
			Alert.alert(
				'알림',
				'앱의 버전 업데이트가 필요합니다.',
				[
					{
						text: '나중에',
						onPress: () => null,
					},
					{
						text: '업데이트',
						onPress: () => Linking.openURL(version.url),
					},
				],
				{
					cancelable: true,
				},
			);
		}
	};

	return { checkAppVersion };
};

export default useCheckAppVersion;
