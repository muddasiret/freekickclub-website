import { News } from "@/components/News";
import { fetchAPI } from "@/lib/api";

async function getNews() {
  return await fetchAPI("/newses", {
    populate: "main_image",
    filters: {
        type: "premierleague",
      },
  });
}

export default async function Home() {
  const news = await getNews();
  return (
    <main className="container mx-auto py-8 px-10 lg:w-1/2">
      <h1 className="text-3xl font-bold mb-6">Premier league</h1>
      {news?.data?.length ? <News items={news?.data} /> : "No news"}
    </main>
  );
}
