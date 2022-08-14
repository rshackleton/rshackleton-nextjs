import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import type { PageProps } from '~/app';
import Layout, { getLayoutProps } from '~/components/Layout/Layout';
import type { ComponentUnion } from '~/components/StoryblokComponent';
import StoryblokComponent from '~/components/StoryblokComponent';
import { StoryblokService } from '~/storyblok/service';
import type { ArticleStoryblok, PageStoryblok } from '~/storyblok/storyblok';

type ArticleModel = {
  id: string;
  date: string;
  summary: string;
  title: string;
  url: string;
};

type ArticlesPageModel = {
  content: ComponentUnion[];
  items: ArticleModel[];
  title: string;
};

type ArticlesPageProps = PageProps<ArticlesPageModel>;

const Articles: NextPage<ArticlesPageProps> = (props) => {
  return (
    <Layout {...props.layout}>
      {props.model.items.map((item) => (
        <article key={item.id}>
          <Link href={item.url}>
            <a>
              <h2>{item.title}</h2>
            </a>
          </Link>
        </article>
      ))}
      {props.model.content.map((data) => (
        <StoryblokComponent key={data._uid} data={data} />
      ))}
    </Layout>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps<ArticlesPageProps> = async (
  context,
) => {
  const layout = await getLayoutProps(context);

  const service = new StoryblokService(context.preview);
  const data = await service.getStory<PageStoryblok>('articles');

  const itemData = await service.getStories<ArticleStoryblok>({
    is_startpage: 0,
    sort_by: 'content.date:desc',
    starts_with: 'articles/',
  });

  const model: ArticlesPageModel = {
    content: data.content.body ?? [],
    items: itemData.map((item) => ({
      id: item.content._uid,
      date: item.content.date,
      summary: item.content.summary,
      title: item.content.title,
      url: `/${item.full_slug}`,
    })),
    title: data.content.title,
  };

  return {
    props: { layout, model },
  };
};
