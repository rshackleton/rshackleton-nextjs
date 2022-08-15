import * as React from 'react';
import { useTwitterSdk } from './useTwitterSdk';

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

type UseTweetEmbedReturn<T> = {
  ref: React.RefObject<T>;
  status: FetchStatus;
};

export function useTweetEmbed<T extends HTMLElement>(
  tweetId: string,
): UseTweetEmbedReturn<T> {
  const sdk = useTwitterSdk();
  const ref = React.useRef<T>(null);
  const [status, setStatus] = React.useState<FetchStatus>('pending');

  React.useEffect(() => {
    if (!sdk) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return setStatus('rejected');
    }

    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const params = {
      conversation: 'none',
      dnt: true,
      lang: 'en',
      theme,
    };

    window.twttr.widgets.createTweet(tweetId, element, params).then(() => {
      setStatus('fulfilled');
    });

    return () => {
      if (element) {
        element.childNodes.forEach((n) => element.removeChild(n));
      }
    };
  }, [sdk, tweetId]);

  return { ref, status };
}
