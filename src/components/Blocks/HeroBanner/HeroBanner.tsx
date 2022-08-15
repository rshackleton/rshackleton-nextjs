import { storyblokEditable } from '@storyblok/js';
import * as React from 'react';
import StoryblokLink from '~/components/Misc/StoryblokLink/StoryblokLink';
import type { HeroBannerStoryblok } from '~/storyblok/storyblok';

export type HeroBannerProps = HeroBannerStoryblok;

const HeroBanner: React.FC<HeroBannerProps> = (props) => {
  return (
    <div
      className="relative grid place-content-center place-items-center overflow-hidden py-[8vw] text-black"
      {...storyblokEditable(props)}
    >
      <div className="relative mx-auto w-full max-w-screen-2xl px-4 text-center">
        <h1 className="pb-5 font-bold text-5xl">{props.title}</h1>
        {props.content && (
          <p className="mx-auto max-w-prose pb-8 text-lg">{props.content}</p>
        )}
        {props.cta && (
          <StoryblokLink
            className="inline-block scale-100 rounded bg-primary-500 py-3 px-5 font-bold text-white subpixel-antialiased transition will-change-transform text-base hover:scale-110 hover:bg-primary-400"
            link={props.cta}
          >
            {props.ctaText}
          </StoryblokLink>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
