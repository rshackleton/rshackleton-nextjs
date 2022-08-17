import Link from 'next/link';
import * as React from 'react';

export type ArticleListItemModel = {
  id: string;
  date: string;
  summary: string;
  target: '_self' | '_blank';
  title: string;
  url: string;
};

export type ArticleListItemProps = ArticleListItemModel;

const ArticleListItem: React.FC<ArticleListItemProps> = (props) => {
  return (
    <article className="my-8">
      <Link href={props.url}>
        <a
          className="group block rounded-lg bg-primary-50 p-4"
          target={props.target}
        >
          <h2 className="mb-2 inline border-b-2 border-b-transparent font-bold text-primary-900 transition text-lg group-hover:border-b-primary-900">
            {props.title}
          </h2>
          <time
            className="mb-2 block font-medium text-primary-500 text-sm"
            dateTime={new Date(props.date).toISOString()}
          >
            {new Date(props.date).toLocaleDateString()}
          </time>
          <p className="text-primary-800 text-base">{props.summary}</p>
        </a>
      </Link>
    </article>
  );
};

export default ArticleListItem;
