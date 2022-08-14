import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { PageProps } from '~/app';
import Layout, { getLayoutProps } from '~/components/Layout/Layout';
import type { ComponentUnion } from '~/components/StoryblokComponent';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';
import type { PageStoryblok } from '~/storyblok/storyblok';

type ContentPageModel = {
  content: ComponentUnion[];
  title: string;
};

type ContentPageProps = PageProps<ContentPageModel>;

const Content: NextPage<ContentPageProps> = (props) => {
  return (
    <Layout {...props.layout}>
      {props.model.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </Layout>
  );
};

export default Content;

export const getStaticProps: GetStaticProps<ContentPageProps> = async (
  context,
) => {
  if (!context.params?.slug) {
    return {
      notFound: true,
    };
  }

  const layout = await getLayoutProps(context);

  const service = new StoryblokService(context.preview);
  const slug = context.params.slug as string;
  const data = await service.getStory<PageStoryblok>(slug);

  const model: ContentPageModel = {
    content: data.content.body ?? [],
    title: data.content.title,
  };

  return {
    props: {
      layout,
      model,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new StoryblokService();

  const items = await service.getStories<PageStoryblok>({
    excluding_slugs: 'articles/,home',
    filter_query: {
      component: { in: 'page' },
    },
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
