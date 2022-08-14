import type { SbBlokKeyDataTypes } from '@storyblok/js';
import * as React from 'react';
import type { StoryblokComponent as StoryblokComponentType } from 'storyblok-js-client';
import HeroBanner from './HeroBanner/HeroBanner';

export type ComponentName = 'heroBanner';

export type ComponentData = StoryblokComponentType<ComponentName> & {
  [index: string]: SbBlokKeyDataTypes;
};

const components: Record<ComponentName, React.FC<any>> = {
  heroBanner: HeroBanner,
};

export type StoryblokComponentProps = {
  data: ComponentData;
};

const StoryblokComponent: React.FC<StoryblokComponentProps> = (props) => {
  const component = props.data.component;

  if (typeof component !== 'string') {
    return <pre>Invalid value for component.</pre>;
  }

  if (!(component in components)) {
    return <pre>No React component found for component type - {component}</pre>;
  }

  const Component = components[component];

  return React.createElement(Component, props.data as any);
};

export default StoryblokComponent;
