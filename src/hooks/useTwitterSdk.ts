import * as React from 'react';

declare global {
  interface Window {
    twttr: {
      widgets: {
        createTweet: (
          id: string,
          element: HTMLElement,
          params: Record<string, unknown>,
        ) => Promise<void>;
      };
    };
  }
}

const TWITTER_SDK = 'https://platform.twitter.com/widgets.js';

export function useTwitterSdk(): typeof window.twttr | undefined {
  const refScript = React.useRef<HTMLScriptElement>();
  const [sdk, setSdk] = React.useState<typeof window.twttr>();

  React.useEffect(() => {
    if (refScript.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = TWITTER_SDK;
    script.onload = () => {
      setSdk(window.twttr);
    };

    refScript.current = script;

    document.head.appendChild(script);
  }, []);

  return sdk;
}
