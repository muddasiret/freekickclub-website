import Link from "next/link";
import Image from "next/image";

interface ImageAttribute {
  data: AttributeItem;
}

interface AttributeItem {
  title: string;
  subtitle: string;
  slug: string;
  main_image: ImageAttribute;
  url: string;
  attributes: AttributeItem;
  publishedAt: string;
}

interface NewsItem {
  id: number;
  attributes: AttributeItem;
}

interface NewsProps {
  items: NewsItem[];
}

export function News({ items }: NewsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 mb-5">
      {items.map((item) => {
        return (
          <Link href={`/news/${item.attributes.slug}`} key={item.id}>
            <div className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden lg:flex lg:h-[160px] news-card transition-shadow duration-300 ease-in-out">
              <Image
                src={item?.attributes?.main_image?.data?.attributes?.url}
                alt="freekick-img"
                width={200}
                height={150}
                className="object-cover w-full"
              />
              <div className="p-6">
                <h3 className="lg:text-xl font-semibold mb-2 mallu">
                  {item.attributes.title}
                </h3>
                {item?.attributes?.subtitle ? (
                  <h5 className="text-xs text-gray-500 mb-2">
                    {item.attributes.subtitle}
                  </h5>
                ) : (
                  <h5 className="text-xs text-gray-500 mb-2 italic">
                    <span className="italic">PUBLISHED ON: </span>
                    {new Date(
                      item.attributes?.publishedAt
                    ).toLocaleDateString()}
                  </h5>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// app/news/[slug]/page.tsx
async function getNewsItem(id: number) {
  const res = await fetch(`${process.env.LOCAL_BACKEND}/api/newses/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch news item");
  }
  return res.json();
}

export default async function NewsItem({ params }: { params: { id: number } }) {
  const newsItem = await getNewsItem(params.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{newsItem.attributes.title}</h1>
      {/* <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: newsItem.content }} /> */}
    </main>
  );
}
