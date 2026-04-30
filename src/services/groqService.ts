const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

type GroqChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export async function askAboutArtist(
  artistName: string,
  question: string,
  language: string = "English",
) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return "Groq API key missing. Please set GROQ_API_KEY.";
    }

    const prompt = `You are a knowledgeable music archivist for a retro-style jazz hip-hop radio station called "Chill FM".
Provide concise, insightful, and slightly poetic information about the artist "${artistName}".
Current context: The user is listening to a jazz hip-hop stream and wants to know: "${question}".
IMPORTANT: Please provide your response in ${language}.
Keep the response under 150 words and maintain a cool, lo-fi aesthetic in your tone.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are Chill FM's archivist assistant. Give concise, accurate, stylistic responses.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 220,
      }),
    });

    const data = (await response.json()) as GroqChatResponse;

    if (!response.ok) {
      console.error("Groq API Error:", data.error?.message || response.statusText);
      return "Error connecting to the archive. The signal is weak.";
    }

    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "The archive is currently unresponsive. Please try again later."
    );
  } catch (error) {
    console.error("Groq API Error:", error);
    return "Error connecting to the archive. The signal is weak.";
  }
}
