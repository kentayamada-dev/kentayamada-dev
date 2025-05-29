import { ProjectsTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getProjects } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
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
    navigationItems(locale).projects.href,
    locale,
    metadata.description,
    metadata.title,
    { alt: metadata.coverImage.title, url: metadata.coverImage.url },
    new Date(metadata.sys.publishedAt),
    new Date(metadata.sys.firstPublishedAt)
  );
};

const Page: PageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].projects;

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

  return <ProjectsTemplate locale={locale} projects={projects} title={title} />;
};

export { Page as default, generateMetadata };
