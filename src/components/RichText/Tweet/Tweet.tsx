import * as React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { useTweetEmbed } from '~/hooks/useTweetEmbed';
import type { TweetStoryblok } from '~/storyblok/storyblok';

export type TweetProps = TweetStoryblok;

const Tweet: React.FC<TweetProps> = (props) => {
  const { ref, status } = useTweetEmbed<HTMLDivElement>(props.tweetId);

  return (
    <div className="flex flex-col items-center">
      {status === 'pending' && (
        <div className="text-primary-700">
          <PuffLoader color="currentColor" size={48} />
        </div>
      )}
      <div
        ref={ref}
        className="twitter-tweet-wrapper"
        data-loaded={status === 'fulfilled'}
      />
    </div>
  );
};

export default Tweet;
