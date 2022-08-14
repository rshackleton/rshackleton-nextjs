import type { StoryData } from '@storyblok/js';
import Link from 'next/link';
import * as React from 'react';
import type {
  ArticleStoryblok,
  ArticleSummaryStoryblok,
} from '~/storyblok/storyblok';

export type ArticleSummaryProps = Omit<ArticleSummaryStoryblok, 'article'> & {
  article: string | StoryData<ArticleStoryblok>;
};

const ArticleSummary: React.FC<ArticleSummaryProps> = (props) => {
  if (typeof props.article === 'string') {
    console.error(
      `ArticleSummary was rendered with an unresolved article reference`,
      props.article,
    );

    return null;
  }

  const model = {
    date: new Date(props.article.content.date),
    summary: props.article.content.summary,
    title: props.article.content.title,
  };

  return (
    <article className="my-8">
      <Link href={`/${props.article.full_slug}`}>
        <a className="group block rounded-lg bg-primary-50 p-4">
          <h2 className="mb-2 border-b-2 border-b-transparent font-bold text-primary-900 transition text-lg group-hover:border-b-primary-900">
            {model.title}
          </h2>
          <time
            className="mb-2 block font-medium text-primary-500 text-sm"
            dateTime={model.date.toISOString()}
          >
            {model.date.toLocaleDateString()}
          </time>
          <p className="text-primary-800 text-base">{model.summary}</p>
        </a>
      </Link>
    </article>
  );
};

export default ArticleSummary;
