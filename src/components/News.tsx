'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Artical {
  title: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
}

const myLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticle] = useState(3);
  console.log(news);
  // console.log(news.slice(0, 3));

  useEffect(() => {
    fetch(
      'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json'
    ).then((res) => {
      res.json().then((data) => setNews(data.articles));
    });
  }, []);

  return (
    <div className="pt-2 bg-gray-100 text-gray-700 space-y-2 rounded-xl">
      <h4 className="font-bold mb-4 text-xl px-4">Whats happening</h4>
      <ul>
        {news.slice(0, articleNum).map((article: Artical) => (
          <Link
            href={article.url}
            key={article.url}
            className="flex items-center hover:bg-gray-200 px-4 py-1 transition duration-200"
          >
            <div>
              <h1 className="text-sm font-bold">{article.title}</h1>
              <span className="text-xs text-gray-500">
                {article.source.name}
              </span>
            </div>
            {/* article.urlToImage.replace(/"/g, '') */}

            <Image
              loader={myLoader}
              src={article.urlToImage.replace(/"/g, '')}
              width={70}
              height={50}
              alt="article logo"
              className="rounded-xl"
            />
          </Link>
        ))}
      </ul>
      <p
        className="text-blue-600 hover:text-blue-400 px-4 pb-2 cursor-pointer text-sm"
        onClick={() => setArticle((prev) => prev + 3)}
      >
        Show More
      </p>
    </div>
  );
};

export default News;
