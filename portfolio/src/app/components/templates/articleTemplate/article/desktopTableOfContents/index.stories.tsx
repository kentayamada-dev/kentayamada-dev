import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { DesktopTableOfContents } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const articleClassName = 'article';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    articleClassName,
    lang: defaultLocale
  },
  component: DesktopTableOfContents,
  decorators: [
    (Story): JSXElementType => {
      return (
        <>
          <section className={`${articleClassName} hidden`}>
            <h2 id='wonders-of-nature'>The Wonders of Nature</h2>
            <h2 id='serenity-of-forests'>Exploring the Serenity of Forests</h2>
            <h3 id='rustling-leaves'>The Sound of Rustling Leaves</h3>
            <h4 id='natural-symphony'>A Natural Symphony</h4>
            <p>
              Walking through a forest, one is surrounded by the calming sound of rustling leaves. This natural music has a soothing effect, reducing
              stress and promoting relaxation.
            </p>
            <h3 id='flora-and-fauna'>The Diversity of Flora and Fauna</h3>
            <h4 id='world-of-life'>A World of Life</h4>
            <p>
              Forests are home to an incredible variety of plant and animal species. Each step through the undergrowth reveals a new and fascinating
              life form, from vibrant flowers to elusive creatures.
            </p>
            <h2 id='majesty-of-mountains'>The Majesty of Mountains</h2>
            <h3 id='peaks-touch-sky'>The Peaks that Touch the Sky</h3>
            <h4 id='giants-of-earth'>Giants of the Earth</h4>
            <p>
              Mountains stand tall and proud, their peaks often shrouded in mist. These natural giants inspire awe and are often seen as symbols of
              strength and endurance.
            </p>
            <h3 id='challenge-of-climb'>The Challenge of the Climb</h3>
            <h4 id='test-of-endurance'>A Test of Endurance</h4>
            <p>
              Climbing a mountain is a test of physical and mental strength. The journey to the summit is fraught with challenges, but the reward is
              the breathtaking view from the top.
            </p>
            <h2 id='tranquility-of-oceans'>The Tranquility of Oceans</h2>
            <h3 id='endless-horizon'>The Endless Horizon</h3>
            <h4 id='vast-and-infinite'>Vast and Infinite</h4>
            <p>
              The ocean stretches out to the horizon, offering a sense of infinity. The vast expanse of water is both calming and humbling, reminding
              us of the immense scale of nature.
            </p>
            <h3 id='rhythm-of-waves'>The Rhythm of the Waves</h3>
            <h4 id='soothing-melody'>A Soothing Melody</h4>
            <p>
              The gentle ebb and flow of the waves create a rhythmic sound that lulls the mind into a peaceful state. Watching the waves crash onto
              the shore can be a meditative experience.
            </p>
            <h2 id='conclusion'>Conclusion: The Beauty of the Natural World</h2>
            <p>
              Nature offers endless wonders, from the serenity of forests to the majesty of mountains and the tranquility of oceans. Each element of
              nature provides a unique experience that connects us to the earth and ourselves.
            </p>
          </section>
          <div className='bg-primary w-80'>
            <Story />
          </div>
        </>
      );
    }
  ]
} satisfies Meta<typeof DesktopTableOfContents>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
