import type { Richtext } from '@storyblok/js';
import * as React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export type RichTextProps = {
  className?: string;
  content: Richtext;
};

const RichText: React.FC<RichTextProps> = (props) => {
  return (
    <div
      className={`${props.className} prose prose-xl mx-auto max-w-3xl text-left`.trim()}
    >
      {render(props.content)}
    </div>
  );
};

export default RichText;
