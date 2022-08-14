import type { GetStaticProps, NextPage } from 'next';
import Layout, { getLayoutProps, WithLayout } from '~/components/Layout/Layout';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';
import { PageStoryblok } from '~/storyblok/storyblok';

type HomePageModel = {
  content: any[];
  title: string;
};

type HomePageProps = WithLayout<{ model: HomePageModel }>;

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <Layout {...props.layout}>
      {props.model.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context,
) => {
  const layout = await getLayoutProps(context);

  const service = new StoryblokService(context.preview);
  const pageData = await service.getStory<PageStoryblok>('home');

  const model: HomePageModel = {
    content: pageData.content.body ?? [],
    title: pageData.content.title,
  };

  return {
    props: {
      layout,
      model,
    },
  };
};
