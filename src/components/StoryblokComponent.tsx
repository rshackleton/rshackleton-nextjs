import * as React from 'react';
import type {
  ContentBlockStoryblok,
  HeroBannerStoryblok,
} from '~/storyblok/storyblok';
import ContentBlock from './ContentBlock/ContentBlock';
import HeroBanner from './HeroBanner/HeroBanner';

// Union of all supported component types.
export type ComponentUnion = ContentBlockStoryblok | HeroBannerStoryblok;

// Union of all supported component type names.
export type ComponentName = Pick<ComponentUnion, 'component'>['component'];

// Utility to convert each T in union to React.FC<T>.
type UnionToProps<TUnion> = TUnion extends TUnion ? React.FC<TUnion> : never;

// Map of component name to component type.
type ComponentMap = Record<ComponentName, UnionToProps<ComponentUnion>>;

const components: ComponentMap = {
  contentBlock: ContentBlock,
  heroBanner: HeroBanner,
};

export type StoryblokComponentProps = {
  data: ComponentUnion;
};

const StoryblokComponent: React.FC<StoryblokComponentProps> = (props) => {
  const component = props.data.component;

  if (typeof component !== 'string') {
    return <pre>Invalid value for component.</pre>;
  }

  if (!(component in components)) {
    return <pre>No React component found for component type - {component}</pre>;
  }

  const Component = components[component] as React.FC<ComponentUnion>;

  return <Component {...props.data} />;
};

export default StoryblokComponent;
