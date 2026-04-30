const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function GET() {
  return jsonResponse({error: "Method not allowed"}, 405);
}

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return jsonResponse({error: "Groq API key is not configured."}, 500);
  }

  const body = await request.json().catch(() => ({}));
  const artistName = cleanText(body?.artist, 120);
  const question = cleanText(body?.question, 1000);
  const language = cleanText(body?.language, 40) || "English";

  if (!artistName || !question) {
    return jsonResponse({error: "Artist and question are required."}, 400);
  }

  const prompt = `You are a knowledgeable music archivist for a retro-style jazz hip-hop radio station called "Chill FM".
Provide concise, insightful, and slightly poetic information about the artist "${artistName}".
Current context: The user is listening to a jazz hip-hop stream and wants to know: "${question}".
IMPORTANT: Please provide your response in ${language}.
Keep the response under 150 words and maintain a cool, lo-fi aesthetic in your tone.`;

  try {
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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Groq API Error:", data?.error?.message || response.statusText);
      return jsonResponse({error: "Error connecting to the archive."}, 502);
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();

    return jsonResponse({
      answer:
        answer ||
        "The archive is currently unresponsive. Please try again later.",
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return jsonResponse({error: "Error connecting to the archive."}, 502);
  }
}
