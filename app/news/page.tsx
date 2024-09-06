import { News } from "@/components/News";
import { fetchAPI } from "@/lib/api";
import { log } from "console";

async function getNews() {
  return await fetchAPI("/newses", { populate: "main_image" });
}

export default async function Home() {
  const news = await getNews();
  log(news);
  return (
    <main className="container mx-auto py-8 px-10 w-1/2">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      <News items={news?.data} />
    </main>
  );
}
