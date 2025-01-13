import React from 'react';
import Svg, { Path } from 'react-native-svg';

const OnboardingIcon = ({ color }: { color: string }) => (
	<Svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		// xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M14.988 8.03225L4.12796 2.5535C3.21596 2.09225 2.15996 2.891 2.44796 3.82475L3.93596 8.70725C3.99596 8.90975 3.99596 9.11225 3.93596 9.31475L2.44796 14.1972C2.15996 15.131 3.21596 15.9297 4.12796 15.4685L14.988 9.98975C15.1732 9.89484 15.3278 9.75493 15.4355 9.58469C15.5433 9.41446 15.6001 9.22018 15.6001 9.02225C15.6001 8.82432 15.5433 8.63004 15.4355 8.4598C15.3278 8.28957 15.1732 8.14965 14.988 8.05475V8.03225Z"
			fill={color}
		/>
	</Svg>
);

export default OnboardingIcon;
