import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchAPI } from "@/lib/api";
import TwitterEmbed from "@/components/Twitterembed";

interface NewsArticle {
  id: number;
  attributes: {
    title: string;
    content: string;
    author: string;
    publishedAt: string;
    description: string;
    main_image?: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
          alternativeText: string;
        };
      };
    };
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const res = await fetchAPI("/newses", {
    filters: {
      slug: slug,
    },
    populate: ["main_image"],
  });
  return res.data[0];
}

export async function generateStaticParams() {
  const news = await fetchAPI("/newses");
  return news.data.map((article: any) => ({
    slug: article?.attributes?.slug,
  }));
}

export default async function NewsArticlePage({ params }: PageProps) {
  const article = await getNewsArticle(params.slug);
  if (!article) {
    notFound();
  }
  const { attributes } = article;

  return (
    <article className="lg:max-w-5xl mx-auto p-4">
      <h1 className="text-4xl  font-bold mb-4">{attributes.title}</h1>
      <p className="text-gray-600 mb-4">
        Published on: {new Date(attributes?.publishedAt).toLocaleDateString()}
      </p>
      {attributes?.main_image && attributes?.main_image.data && (
        <div className="mb-4">
          <Image
            src={`${attributes.main_image.data.attributes.url}`}
            alt={"image"}
            width={500}
            height={350}
            className="rounded-lg"
          />
        </div>
      )}
      {/* {attributes.description && (
        <div
          className="text-left"
          dangerouslySetInnerHTML={{
            __html: attributes.description,
          }}
        />
      )} */}
      <TwitterEmbed description={attributes.description} />
    </article>
  );
}
