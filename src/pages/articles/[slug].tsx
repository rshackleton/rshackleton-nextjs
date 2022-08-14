import type { Richtext } from '@storyblok/js';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { PageProps } from '~/app';
import Layout, { getLayoutProps } from '~/components/Layout/Layout';
import RichText from '~/components/RichText/RichText';
import { StoryblokService } from '~/storyblok/service';
import type { ArticleStoryblok } from '~/storyblok/storyblok';

type ArticlePageModel = {
  content: Richtext;
  date: string;
  title: string;
};

type ArticlePageProps = PageProps<ArticlePageModel>;

const Article: NextPage<ArticlePageProps> = (props) => {
  const date = new Date(props.model.date);

  return (
    <Layout {...props.layout}>
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="pb-4 font-bold text-2xl">{props.model.title}</h1>
        <div className="pb-8 font-medium text-lg">
          <time dateTime={date.toISOString()}>{formatDate(date)}</time>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <RichText content={props.model.content} />
      </div>
    </Layout>
  );

  function formatDate(value: string | Date): string {
    const formatter = new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return formatter.format(
      typeof value === 'string' ? new Date(value) : value,
    );
  }
};

export default Article;

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (
  context,
) => {
  if (!context.params?.slug) {
    return {
      notFound: true,
    };
  }

  const layout = await getLayoutProps(context);

  const service = new StoryblokService(context.preview);
  const slug = `articles/${context.params.slug}`;
  const data = await service.getStory<ArticleStoryblok>(slug, {
    resolve_relations: 'articleSummary.article',
  });

  const model: ArticlePageModel = {
    content: data.content.body ?? [],
    date: data.content.date ?? null,
    title: data.content.title ?? null,
  };

  return {
    props: { layout, model },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new StoryblokService();

  const items = await service.getStories<ArticleStoryblok>({
    filter_query: {
      component: { in: 'article' },
    },
    is_startpage: 0,
    starts_with: 'articles/',
  });

  const paths = items.map((item) => `/${item.full_slug}`);

  console.log('### getStaticPaths\n');
  console.log('paths', paths);
  console.log('\n### end getStaticPaths\n');

  return {
    fallback: 'blocking',
    paths,
  };
};
