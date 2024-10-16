// import { Timeline } from "@/types/twitter";

export async function fetchTwitterTimeline<T>(): Promise<T> {
  const apiKey = process.env.X_RAPID_API_KEY as string;
  const url = `https://twitter-api45.p.rapidapi.com/timeline.php?screenname=elonmusk`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.timeline);
  return data.timeline;
}
