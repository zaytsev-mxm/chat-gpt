import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";

type Data = CreateCompletionResponse;

const DEFAULT_PROMPT = 'Say this is a test';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query: { prompt } } = req;
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt || DEFAULT_PROMPT,
        temperature: 0,
        max_tokens: 512,
    });

    res.status(200).json(response.data);
}
