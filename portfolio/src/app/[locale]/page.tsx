import type { CareerListProps } from '@/components/designSystem/molecules';
import { HomeTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getAbout, getCareers, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(locale, contentfulType.metadata.kentaYamada);

  return getMetadataObject(
    'profile',
    navigationItems.home.href,
    locale,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt),
    false
  );
};

const Page: ArticlesPageType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, subtitle, title } = await getAbout(locale);
  const aboutDict = dictionaries[locale].about;

  const careers: CareerListProps['careers'] = (await getCareers(locale)).map((career) => {
    return {
      endDate: new Date(career.endDate),
      logo: career.logo,
      organization: career.organization,
      role: career.role,
      startDate: new Date(career.startDate)
    };
  });

  return (
    <HomeTemplate
      careerListTitle={aboutDict.career}
      careers={careers}
      coverImage={{
        title: coverImage.title,
        url: coverImage.url
      }}
      locale={locale}
      title={{
        main: title,
        sub: subtitle
      }}
    />
  );
};

export { Page as default, generateMetadata };
