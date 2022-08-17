import type { GetStaticProps, NextPage } from 'next';
import type { PageProps } from '~/app';
import ArticleList from '~/components/ArticleList/ArticleList';
import type { ArticleListItemModel } from '~/components/ArticleList/ArticleListItem';
import type { ComponentUnion } from '~/components/Blocks/StoryblokComponent';
import StoryblokComponent from '~/components/Blocks/StoryblokComponent';
import Layout, { getLayoutProps } from '~/components/Layout/Layout';
import { StoryblokService } from '~/storyblok/service';
import type {
  ArticleExternalStoryblok,
  ArticleStoryblok,
  PageStoryblok,
} from '~/storyblok/storyblok';

type ArticlesPageModel = {
  content: ComponentUnion[];
  items: ArticleListItemModel[];
  title: string;
};

type ArticlesPageProps = PageProps<ArticlesPageModel>;

const Articles: NextPage<ArticlesPageProps> = (props) => {
  return (
    <Layout {...props.layout}>
      <ArticleList items={props.model.items} />
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

  const articles = await getArticles();

  const model: ArticlesPageModel = {
    content: data.content.body ?? [],
    items: articles,
    title: data.content.title,
  };

  return {
    props: { layout, model },
  };

  async function getArticles(): Promise<ArticleListItemModel[]> {
    const service = new StoryblokService(context.preview);

    const data = await service.getStories<
      ArticleStoryblok | ArticleExternalStoryblok
    >({
      is_startpage: 0,
      sort_by: 'content.date:desc',
      starts_with: 'articles/',
    });

    const items: ArticleListItemModel[] = data.map((item) => {
      const isExternal = item.content.component === 'articleExternal';

      return {
        id: item.content._uid,
        date: item.content.date,
        summary: item.content.summary,
        target: isExternal ? '_blank' : '_self',
        title: item.content.title,
        url: isExternal ? item.content.url : `/${item.full_slug}`,
      };
    });

    return items;
  }
};
