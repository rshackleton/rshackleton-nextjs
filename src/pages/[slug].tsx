import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout, { getLayoutProps, WithLayout } from '~/components/Layout/Layout';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';
import { PageStoryblok } from '~/storyblok/storyblok';

type ContentPageModel = {
  content: any[];
  title: string;
};

type ContentPageProps = WithLayout<{ model: ContentPageModel }>;

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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};
