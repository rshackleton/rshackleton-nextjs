import type { LayoutProps } from './components/Layout/Layout';

export type WithLayout<TProps> = TProps & {
  layout: Omit<LayoutProps, 'children'>;
};

export type PageProps<TModel> = WithLayout<{ model: TModel }>;
