import { Richtext } from '@storyblok/js';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout, { getLayoutProps, WithLayout } from '~/components/Layout/Layout';
import RichText from '~/components/RichText/RichText';
import { StoryblokService } from '~/storyblok/service';
import { ArticleStoryblok } from '~/storyblok/storyblok';

type ArticlePageModel = {
  content: Richtext;
  date: string;
  title: string;
};

type ArticlePageProps = WithLayout<{
  model: ArticlePageModel;
}>;

const Article: NextPage<ArticlePageProps> = (props) => {
  const date = new Date(props.model.date);

  return (
    <Layout {...props.layout}>
      <div className="mx-auto px-4 text-center">
        <h1 className="pb-4 font-bold text-2xl">{props.model.title}</h1>
        <div className="pb-8 font-medium text-lg">
          <time dateTime={date.toISOString()}>{formatDate(date)}</time>
        </div>
      </div>

      <RichText className="px-4" content={props.model.content} />
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
  const data = await service.getStory<ArticleStoryblok>(slug);

  const model: ArticlePageModel = {
    content: data.content.body,
    date: data.content.date,
    title: data.content.title,
  };

  return {
    props: { layout, model },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};
