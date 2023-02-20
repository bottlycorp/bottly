import { restRequest } from "../request/request";
import { ChatGPTResponse } from "../types";

export async function chatWithAI(prompt: string): Promise<string> {
  const response = await restRequest<ChatGPTResponse>("post", "https://api.openai.com/v1/completions", {
    headers: {
      authorization: `Bearer ${process.env.OPEN_AI}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6
    })
  });

  if (!response.success) {
    return "Une erreur est survenue lors de la communication avec l'API OpenAI.";
  }

  if (response.data.choices.length > 0) {
    return response.data.choices[0].text;
  } else {
    return "Une erreur est survenue lors de la communication avec l'API OpenAI.";
  }
}