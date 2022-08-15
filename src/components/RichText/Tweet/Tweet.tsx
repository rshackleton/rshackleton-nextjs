import * as React from 'react';
import type { TweetStoryblok } from '~/storyblok/storyblok';

export type TweetProps = TweetStoryblok;

const Tweet: React.FC<TweetProps> = (props) => {
  // TODO - Show tweet embed
  return (
    <p>
      <a href={props.tweetUrl} target="_blank" rel="noreferrer">
        {props.tweetUrl}
      </a>
    </p>
  );
};

export default Tweet;
