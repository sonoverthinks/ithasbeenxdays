import OpenAI from "openai";

export const analyzeTweets = async (tweetContent: string) => {
  const openai = new OpenAI();
  const prompt = `
    Analyze the following tweet and identify the main topics it covers.
    Generate 1 or 2 extremely vague topic tags that best represent the content of the tweet.
    Each topic should be a single word or a short phrase (2-3 words maximum).
    The topics should be general enough to be applicable to multiple tweets, but specific enough to be meaningful.
    If the tweet content is mostly or entirely a URL, return only the word "uncategorized".
    Respond with only the topic tags, separated by commas, or "uncategorized" if applicable. Nothing else.
    
    Tweet: "${tweetContent}"
    
    Topics:`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const topicsString = res.choices[0].message.content?.trim().toLowerCase();
    const topics = topicsString
      ? topicsString.split(",").map((topic) => topic.trim())
      : [];
    return topics.length > 0 ? topics : ["uncategorized"];
  } catch (error) {
    console.error("Error analyzing tweet:", error);
    return ["uncategorized"];
  }
};
