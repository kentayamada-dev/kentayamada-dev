import { z } from 'zod';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { getStorybookImageUrl } from '@/utils';
import { ArticleLayout } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const envSchema = z.object({
  STORYBOOK_ENV: z.enum(['development', 'production'])
});

const envClientSchema = envSchema.parse({
  STORYBOOK_ENV: process.env['STORYBOOK_ENV']
});

const storybookEnv = envClientSchema.STORYBOOK_ENV;

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales }, publishedAt: { control: 'date' } },
  args: {
    articles: [
      {
        coverImage: {
          title: 'Cover Image Title 1',
          url: getStorybookImageUrl(storybookEnv, 'image1.jpg')
        },
        slug: 'slug-1',
        sys: {
          publishedAt: '2024-08-26T21:50:14.930Z'
        },
        title: 'Title 1'
      },
      {
        coverImage: {
          title: 'Cover Image Title 2',
          url: getStorybookImageUrl(storybookEnv, 'image2.jpg')
        },
        slug: 'slug-2',
        sys: {
          publishedAt: '2024-07-25T21:50:14.930Z'
        },
        title: 'Title 2'
      },
      {
        coverImage: {
          title: 'Cover Image Title 3',
          url: getStorybookImageUrl(storybookEnv, 'image3.jpg')
        },
        slug: 'slug-3',
        sys: {
          publishedAt: '2023-08-26T21:50:14.930Z'
        },
        title: 'Title 3'
      },
      {
        coverImage: {
          title: 'Cover Image Title 4',
          url: getStorybookImageUrl(storybookEnv, 'image4.jpg')
        },
        slug: 'slug-4',
        sys: {
          publishedAt: '2022-08-26T21:50:14.930Z'
        },
        title: 'Title 4'
      }
    ],
    articlesHref: '/articles',
    content: (
      <section>
        <h2 id='wonders-of-nature'>The Wonders of Nature</h2>
        <h2 id='serenity-of-forests'>Exploring the Serenity of Forests</h2>
        <h3 id='rustling-leaves'>The Sound of Rustling Leaves</h3>
        <h4 id='natural-symphony'>A Natural Symphony</h4>
        <p>
          Walking through a forest, one is surrounded by the calming sound of rustling leaves. This natural music has a
          soothing effect, reducing stress and promoting relaxation.
        </p>
        <h3 id='flora-and-fauna'>The Diversity of Flora and Fauna</h3>
        <h4 id='world-of-life'>A World of Life</h4>
        <p>
          Forests are home to an incredible variety of plant and animal species. Each step through the undergrowth
          reveals a new and fascinating life form, from vibrant flowers to elusive creatures.
        </p>
        <h2 id='majesty-of-mountains'>The Majesty of Mountains</h2>
        <h3 id='peaks-touch-sky'>The Peaks that Touch the Sky</h3>
        <h4 id='giants-of-earth'>Giants of the Earth</h4>
        <p>
          Mountains stand tall and proud, their peaks often shrouded in mist. These natural giants inspire awe and are
          often seen as symbols of strength and endurance.
        </p>
        <h3 id='challenge-of-climb'>The Challenge of the Climb</h3>
        <h4 id='test-of-endurance'>A Test of Endurance</h4>
        <p>
          Climbing a mountain is a test of physical and mental strength. The journey to the summit is fraught with
          challenges, but the reward is the breathtaking view from the top.
        </p>
        <h2 id='tranquility-of-oceans'>The Tranquility of Oceans</h2>
        <h3 id='endless-horizon'>The Endless Horizon</h3>
        <h4 id='vast-and-infinite'>Vast and Infinite</h4>
        <p>
          The ocean stretches out to the horizon, offering a sense of infinity. The vast expanse of water is both
          calming and humbling, reminding us of the immense scale of nature.
        </p>
        <h3 id='rhythm-of-waves'>The Rhythm of the Waves</h3>
        <h4 id='soothing-melody'>A Soothing Melody</h4>
        <p>
          The gentle ebb and flow of the waves create a rhythmic sound that lulls the mind into a peaceful state.
          Watching the waves crash onto the shore can be a meditative experience.
        </p>
        <h2 id='conclusion'>Conclusion: The Beauty of the Natural World</h2>
        <p>
          Nature offers endless wonders, from the serenity of forests to the majesty of mountains and the tranquility of
          oceans. Each element of nature provides a unique experience that connects us to the earth and ourselves.
        </p>
      </section>
    ),
    lang: defaultLocale,
    publishedAt: new Date(),
    title: 'Title'
  },
  component: ArticleLayout,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Layouts/Article Layout'
} satisfies Meta<typeof ArticleLayout>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
