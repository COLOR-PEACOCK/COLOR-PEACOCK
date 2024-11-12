import {
	GoogleGenerativeAI,
	ChatSession,
	GenerativeModel,
	GenerationConfig,
} from '@google/generative-ai';
import { useState } from 'react';
import { Alert } from 'react-native';

interface BaseColor {
	base_color_name_kr: string;
	base_color_name_eng: string;
	hexCode: string;
}

interface RecommendedColor {
	color_name_kr: string;
	color_name_eng: string;
	hexCode: string;
	harmony_description: string;
}

interface RecommendedTheme {
	theme_name_kr: string;
	theme_name_eng: string;
	colors: RecommendedColor[];
	theme_hexCode_list: string[];
}

interface ResponseData {
	base_color: BaseColor[];
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
	const [isLoading, setIsLoading] = useState(false);

	async function run(value: string): Promise<ResponseData | null> {
		setIsLoading(true);
		const chatSession: ChatSession = model.startChat({
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
                "base_color": [{
                    "base_color_name_kr": "string",
                    "base_color_name_eng": "string",
                    "hexCode": "string"}],
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
			const data: ResponseData = JSON.parse(result.response.text());
			setIsLoading(false);
			return data;
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			return null;
		}
	}

	return { run, isLoading };
};

export default useGemini;
