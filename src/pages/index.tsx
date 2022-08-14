import type { GetStaticProps, NextPage } from 'next';
import type { PageProps } from '~/app';
import Layout, { getLayoutProps } from '~/components/Layout/Layout';
import type { ComponentData } from '~/components/StoryblokComponent';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';
import type { PageStoryblok } from '~/storyblok/storyblok';

type HomePageModel = {
  content: ComponentData[];
  title: string;
};

type HomePageProps = PageProps<HomePageModel>;

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
