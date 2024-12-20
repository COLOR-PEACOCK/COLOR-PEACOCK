const koreanPattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣0-9]*$/;
const hexCodePattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

export const isValidKorean = (value: string) => {
    return koreanPattern.test(value)
}
export const isValidHexCode = (value: string) => {
    return hexCodePattern.test(value)
}

export const isValidRGB =(value: number) => {
    return value >= 0 && value <= 255;
}

export const isValidDegree = (value: number) => {
    return value >= 0 && value <= 360;
}

export const isValidPercentage = (value: number) => {
    return value >= 0 && value <= 100;
}