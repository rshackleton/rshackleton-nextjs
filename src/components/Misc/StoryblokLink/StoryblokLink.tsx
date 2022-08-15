import Link from 'next/link';
import * as React from 'react';
import type { MultilinkStoryblok } from '~/storyblok/storyblok';

export type StoryblokLinkProps = {
  children: React.ReactNode;
  className?: string;
  link: MultilinkStoryblok;
};

const StoryblokLink: React.FC<StoryblokLinkProps> = ({
  children,
  link,
  ...otherProps
}) => {
  switch (link.linktype) {
    case 'story':
      return (
        <Link href={sanitiseSlug(link.cached_url ?? '')}>
          <a {...otherProps}>{children}</a>
        </Link>
      );

    case 'asset':
      return (
        <a
          href={link.cached_url}
          rel="noreferrer"
          target="_blank"
          {...otherProps}
        >
          {children}
        </a>
      );

    case 'url':
      return (
        <a
          href={link.cached_url}
          rel="noreferrer"
          target="_blank"
          {...otherProps}
        >
          {children}
        </a>
      );

    case 'email':
      return (
        <a href={`mailto:${link.cached_url}`} {...otherProps}>
          {children}
        </a>
      );

    default:
      return <span {...otherProps}>{children}</span>;
  }

  function sanitiseSlug(input: string): string {
    const slug = input.endsWith('/')
      ? input.substring(0, input.length - 1)
      : input;

    return `/${slug}`;
  }
};

export default StoryblokLink;
