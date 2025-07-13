export default async function handler(req, res) {
  const { country = "us", category = "general" } = req.query;
  const API_KEY = process.env.NEWSAPI_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing NEWSAPI_KEY" });
  }

  const endpoint = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status !== "ok") {
      return res.status(400).json({ error: data.message });
    }

    res.status(200).json(data.articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news", details: error.message });
  }
}
