import type { Richtext } from '@storyblok/js';
import * as React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import ArticleSummary from './ArticleSummary/ArticleSummary';
import Tweet from './Tweet/Tweet';

export type RichTextProps = {
  className?: string;
  content: Richtext;
};

type BlokResolver = (props: Record<string, unknown>) => JSX.Element | null;

const RichText: React.FC<RichTextProps> = (props) => {
  return (
    <div className="rich-text">
      {render(props.content, {
        blokResolvers: {
          articleSummary: ArticleSummary as BlokResolver,
          tweet: Tweet as BlokResolver,
        },
      })}
    </div>
  );
};

export default RichText;
