import { storyblokEditable } from '@storyblok/js';
import * as React from 'react';
import type { ContentBlockStoryblok } from '~/storyblok/storyblok';
import RichText from '../RichText/RichText';

export type ContentBlockProps = ContentBlockStoryblok;

const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  return (
    <div className="mx-auto max-w-3xl px-4" {...storyblokEditable(props)}>
      <RichText content={props.content} />
    </div>
  );
};

export default ContentBlock;
