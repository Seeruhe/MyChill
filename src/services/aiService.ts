type ArtistArchiveResponse = {
  answer?: string;
  error?: string | {message?: string};
};

export async function askAboutArtist(
  artistName: string,
  question: string,
  language: string = "English",
) {
  try {
    const response = await fetch("/api/ask-artist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: artistName,
        question,
        language,
      }),
    });

    const data = (await response.json()) as ArtistArchiveResponse;

    if (!response.ok) {
      console.error("Archive API Error:", data.error || response.statusText);
      return "Error connecting to the archive. The signal is weak.";
    }

    return (
      data.answer?.trim() ||
      "The archive is currently unresponsive. Please try again later."
    );
  } catch (error) {
    console.error("Archive API Error:", error);
    return "Error connecting to the archive. The signal is weak.";
  }
}
