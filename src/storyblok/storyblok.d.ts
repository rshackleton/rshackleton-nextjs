export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}

export interface ArticleStoryblok {
  title: string;
  thumbnail: AssetStoryblok;
  date: string;
  summary: string;
  body: any;
  categories?: any[];
  _uid: string;
  component: "article";
  [k: string]: any;
}

export interface ArticleSummaryStoryblok {
  article: string;
  _uid: string;
  component: "articleSummary";
  [k: string]: any;
}

export interface ContentBlockStoryblok {
  content?: any;
  _uid: string;
  component: "contentBlock";
  [k: string]: any;
}


export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      linktype?: "story";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface HeroBannerStoryblok {
  title: string;
  content?: string;
  image?: AssetStoryblok;
  cta?: MultilinkStoryblok;
  ctaText?: string;
  _uid: string;
  component: "heroBanner";
  [k: string]: any;
}

export interface MasterStoryblok {
  navigation: any[];
  _uid: string;
  component: "master";
  [k: string]: any;
}


export interface PageStoryblok {
  title: string;
  body?: any[];
  description?: string;
  ogImage?: AssetStoryblok;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface TweetStoryblok {
  tweetId: string;
  _uid: string;
  component: "tweet";
  [k: string]: any;
}
