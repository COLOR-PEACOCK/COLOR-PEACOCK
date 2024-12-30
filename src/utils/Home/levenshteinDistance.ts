/**
 * 두 문자열의 Damerau-Levenshtein 거리를 계산
 * Levenshtein 거리에 인접한 두 문자의 전치 연산을 추가
 *
 * @param a 첫 번째 문자열
 * @param b 두 번째 문자열
 * @returns 두 문자열 사이의 Damerau-Levenshtein 거리
 */
export function getLevenshteinDistance(a: string, b: string): number {
	const aLength = a.length;
	const bLength = b.length;

	// 빈 문자열 처리
	if (aLength === 0) return bLength;
	if (bLength === 0) return aLength;

	// 2차원 배열 초기화
	const matrix: number[][] = Array(aLength + 1);
	for (let i = 0; i <= aLength; i++) {
		matrix[i] = Array(bLength + 1).fill(0);
	}

	// 첫 번째 행과 열 초기화
	for (let i = 0; i <= aLength; i++) {
		matrix[i][0] = i;
	}
	for (let j = 0; j <= bLength; j++) {
		matrix[0][j] = j;
	}

	// 나머지 행렬 채우기
	for (let i = 1; i <= aLength; i++) {
		for (let j = 1; j <= bLength; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1; // 문자가 같으면 0, 다르면 1
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1, // 삭제
				matrix[i][j - 1] + 1, // 삽입
				matrix[i - 1][j - 1] + cost, // 치환
			);

			// 전치 연산 추가
			if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
				matrix[i][j] = Math.min(matrix[i][j],matrix[i - 2][j - 2] + cost);
			}
		}
	}

	return matrix[aLength][bLength];
}
