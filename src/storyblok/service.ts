import type {
  StoriesParams,
  StoryblokClient,
  StoryData,
  StoryParams,
} from '@storyblok/js';
import { apiPlugin, storyblokInit } from '@storyblok/js';
import { AxiosError } from 'axios';
import type { StoryblokComponent } from 'storyblok-js-client';
import invariant from 'tiny-invariant';

type StoryType = StoryblokComponent<string> & { [index: string]: any };

export class StoryblokService {
  private api: StoryblokClient;
  private preview: boolean;
  private verbose: boolean;

  constructor(preview = false) {
    this.preview = preview; // from next.js preview mode
    this.verbose = process.env.LOG_VERBOSE === 'true';

    const { storyblokApi } = storyblokInit({
      accessToken: this.preview
        ? process.env.STORYBLOK_ACCESS_TOKEN_PREVIEW
        : process.env.STORYBLOK_ACCESS_TOKEN_PUBLIC,
      bridge: false,
      use: [apiPlugin],
    });

    invariant(storyblokApi, `Could not create StoryblokClient instance.`);

    this.log('### creating StoryblokService instance\n');
    this.log('this.preview', this.preview);
    this.log('cacheVersions', storyblokApi.cacheVersions());
    this.log('\n### end creating StoryblokService instance\n');

    storyblokApi.client.interceptors.request.use(
      (config) => {
        this.log(
          'axios',
          config.method,
          config.baseURL,
          config.url,
          JSON.stringify(config.params),
        );
        return config;
      },
      (error) => {
        this.log('axios', error);
        return error;
      },
    );

    this.api = storyblokApi;
  }

  async get<T>(slug: string, params: any = {}): Promise<T> {
    try {
      this.log('### calling StoryblokService.get\n');
      this.log('slug', slug);
      this.log('this.preview', this.preview);

      const result = await this.api.get(slug, {
        version: this.preview ? 'draft' : 'published',
        ...params,
      });

      // this.log(JSON.stringify(result));
      this.log('\n### end calling StoryblokService.get\n');

      return result.data as T;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Response('Not Found', { status: 404 });
      }

      throw new Response('Error', { status: 500 });
    }
  }

  async getStory<T extends StoryType>(
    slug: string,
    params: StoryParams = {},
  ): Promise<StoryData<T>> {
    try {
      this.log('### calling StoryblokService.getStory\n');
      this.log('slug', slug);
      this.log('this.preview', this.preview);

      const result = await this.api.getStory(slug, {
        version: this.preview ? 'draft' : 'published',
        ...params,
      });

      // this.log(JSON.stringify(result));
      this.log('\n### end calling StoryblokService.getStory\n');

      return result.data.story as StoryData<T>;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Response('Not Found', { status: 404 });
      }

      throw new Response('Error', { status: 500 });
    }
  }

  async getStories<T extends StoryType>(
    params: StoriesParams = {},
  ): Promise<StoryData<T>[]> {
    this.log('### calling StoryblokService.getStories\n');
    this.log('this.preview', this.preview);

    const result = await this.api.getStories({
      version: this.preview ? 'draft' : 'published',
      ...params,
    });

    // this.log(JSON.stringify(result));
    this.log('\n### end calling StoryblokService.getStories\n');

    return result.data.stories as StoryData<T>[];
  }

  getUrl(data: StoryData<StoryType>): string {
    const slug = data.full_slug.endsWith('/')
      ? data.full_slug.substring(0, data.full_slug.length - 1)
      : data.full_slug;

    return `/${slug}`;
  }

  private log(...args: any[]) {
    if (this.verbose) {
      console.log(...args);
    }
  }
}
