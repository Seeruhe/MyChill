const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, {error: "Method not allowed"});
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    sendJson(res, 500, {error: "Groq API key is not configured."});
    return;
  }

  const artistName = cleanText(req.body?.artist, 120);
  const question = cleanText(req.body?.question, 1000);
  const language = cleanText(req.body?.language, 40) || "English";

  if (!artistName || !question) {
    sendJson(res, 400, {error: "Artist and question are required."});
    return;
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
      sendJson(res, 502, {error: "Error connecting to the archive."});
      return;
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();

    sendJson(res, 200, {
      answer:
        answer ||
        "The archive is currently unresponsive. Please try again later.",
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    sendJson(res, 502, {error: "Error connecting to the archive."});
  }
}
