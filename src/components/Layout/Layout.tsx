import { StoryData } from '@storyblok/js';
import { GetStaticPropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { StoryblokService } from '~/storyblok/service';
import { MasterStoryblok, PageStoryblok } from '~/storyblok/storyblok';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { NavigationItem } from '../Navigation/Navigation';

export type LayoutProps = {
  navigation: NavigationItem[];
  children: React.ReactNode;
};

export type WithLayout<TProps> = TProps & {
  layout: Omit<LayoutProps, 'children'>;
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div id="root" className="site-container">
      <Header items={props.navigation} />
      <main id="main">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

export const getLayoutProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
): Promise<Omit<LayoutProps, 'children'>> => {
  const service = new StoryblokService(context.preview);

  const layoutData = await service.getStory<MasterStoryblok>('global/master', {
    resolve_relations: 'master.navigation',
  });

  const navigationData = layoutData.content
    .navigation as StoryData<PageStoryblok>[];

  const navigation: NavigationItem[] = navigationData.map((item) => ({
    id: item.uuid,
    title: item.content.title,
    url: service.getUrl(item),
  }));

  return { navigation };
};
