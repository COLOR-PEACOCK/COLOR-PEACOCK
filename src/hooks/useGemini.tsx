import {
	GoogleGenerativeAI,
	GenerativeModel,
	GenerationConfig,
} from '@google/generative-ai';

interface BaseColor {
	base_color_name_kr: string;
	base_color_name_eng: string;
	hexCode: string;
}

export interface RecommendedColor {
	[x: string]: any;
	color_name_kr: string;
	color_name_eng: string;
	hexCode: string;
	harmony_description: string;
}

interface RecommendedTheme {
	theme_name_kr: string;
	theme_name_eng: string;
	colors: RecommendedColor;
	theme_hexCode_list: string[];
}

export interface ResponseData {
	base_color: BaseColor;
	recommended_themes_and_colors: RecommendedTheme[];
}

const useGemini = () => {
	const apiKey = process.env.API_KEY as string;
	const genAI = new GoogleGenerativeAI(apiKey);
	const model: GenerativeModel = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
	});
	const generationConfig: GenerationConfig = {
		temperature: 1,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: 'application/json',
	};

	const run = async (value: string) => {
		const chatSession = model.startChat({
			generationConfig,
			history: [],
		});
		const prompt = `
            ${value}의 색을 분석해서 조화를 이루는 테마 6가지와 각 테마에서 ${value}과 어울리는 3가지 색상을 추천해줘.
            테마 이름은 길지 않도록 하고, 테마별로 언급된 3가지 색상에 대한 hexcode는 theme_hexCode_list에 정리해줘.
            harmony_description에는 추천색이 조합되어 생기는 효과에 대해 ${value}의 색상 이름은 빼고 작성해줘.
            응답 내용은 한국말로 JSON 형식으로 만들어줘.
            JSON 응답의 형식은 아래와 같아야 해:
            {
                "base_color": {
                    "base_color_name_kr": "string",
                    "base_color_name_eng": "string",
                    "hexCode": "string"},
                "recommended_themes_and_colors" : [{
                    "theme_name_kr" : "string",
                    "theme_name_eng" : "string",
                    "colors": [{
                        "color_name_kr" : "string",
                        "color_name_eng" : "string",
                        "hexCode":"string",
                        "harmony_description": "string"
                    }],
                    "theme_hexCode_list" : ["string"]
                }]
            }`;

		try {
			const result = await chatSession.sendMessage(prompt);
			const response = result.response.text();
			if (!response) {
				throw new Error('Empty response from AI');
			}
			const data = JSON.parse(response);
			return data;
		} catch (error) {
			throw error;
		}
	};

	return { run };
};

export default useGemini;
