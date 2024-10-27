import { useNavigation } from "@react-navigation/native";
import { Alert, Linking } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";


const useCamera = () => {
    const navigation = useNavigation();
    const { hasPermission, requestPermission } = useCameraPermission();
    const requestCameraPermission = async () => {
		try {
			if (hasPermission === false) {
				const newPermission = await requestPermission();
				if (!newPermission) {
					Alert.alert(
						'카메라 권한 필요',
						'이 기능은 카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
						[
							{ text: '취소', style: 'cancel' },
							{
								text: '설정으로 이동',
								onPress: Linking.openSettings,
							},
						],
					);
				}
			}
		} catch (error) {
			Alert.alert('알림', '카메라 렌더링중 오류가 발생했습니다.', [
				{ text: '확인', onPress: navigation.goBack() },
			]);
		}
	};

 return { hasPermission, requestCameraPermission}
}

export default useCamera;