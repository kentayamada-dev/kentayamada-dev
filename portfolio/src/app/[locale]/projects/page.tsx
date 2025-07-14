import { ProjectsList } from '@/components/designSystem/molecules';
import { contentfulType } from '@/constants/contentful';
import { envServer } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getProjects } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { JsonLd } from '@/lib/nextjs/jsonLd';
import { throwColoredError } from '@/utils';
import type { ProjectsListProps } from '@/components/designSystem/molecules';
import type { GenerateMetadataType, PageType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const metadata = await getMetadata(locale, contentfulType.metadata.projects);

  if (metadata === null) {
    return throwColoredError(`metadata <${contentfulType.metadata.projects}> is empty`, 'red');
  }

  return getMetadataObject(
    'website',
    {
      current: navigationItems(locale).projects.href,
      en: navigationItems('en').projects.href,
      ja: navigationItems('ja').projects.href
    },
    locale,
    metadata.description,
    metadata.title,
    metadata.coverImage.url,
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].projects;
  const { home: homeLabel, projects: projectsLabel } = dictionaries[locale].navigation;

  const projects: ProjectsListProps['projects'] = (await getProjects())
    .map((project) => {
      return {
        createdAt: new Date(project.createdAt),
        description: project.description,
        forkCount: Number(project.forkCount),
        name: project.name,
        stargazerCount: Number(project.stargazerCount),
        updatedAt: new Date(project.updatedAt),
        url: project.url
      };
    })
    .sort((projectA, projectB) => {
      return projectB.stargazerCount - projectA.stargazerCount;
    });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'item': `${envServer.SITE_URL}${navigationItems(locale).home.href}`,
        'name': homeLabel,
        'position': 1
      },
      {
        '@type': 'ListItem',
        'name': projectsLabel,
        'position': 2
      }
    ]
  };

  return (
    <>
      <JsonLd jsonLd={jsonLd} />
      <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
        <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{title}</h1>
        <ProjectsList locale={locale} projects={projects} />
      </main>
    </>
  );
};

export { Page as default, generateMetadata };
