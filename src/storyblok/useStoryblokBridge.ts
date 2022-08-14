import * as React from 'react';

export const USE_STORYBLOK_BRIDGE =
  typeof window !== 'undefined' && window.location !== window.parent.location;

export function useStoryblokBridge() {
  const ref = React.useRef<HTMLScriptElement>();

  React.useEffect(() => {
    if (!USE_STORYBLOK_BRIDGE) {
      return;
    }

    if (ref.current) {
      return;
    }

    // Load Storyblok bridge
    const script = document.createElement('script');
    script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';

    script.onload = () => {
      const instance = new window.StoryblokBridge();
      instance.on(['published', 'change'], () => {
        window.location.reload();
      });
    };

    ref.current = script;

    document.head.appendChild(script);
  }, []);
}
