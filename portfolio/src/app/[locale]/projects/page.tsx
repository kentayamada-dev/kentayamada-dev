import type { ProjectsListProps } from '@/components/designSystem/molecules';
import { ProjectsTemplate } from '@/components/designSystem/templates';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getProjects } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { locale } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(locale, contentfulType.metadata.projects);

  return getMetadataObject(
    'website',
    navigationItems.projects.href,
    locale,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlesPageType = async (props) => {
  const { locale } = await props.params;
  const title = dictionaries[locale].projects;

  const projects: ProjectsListProps['projects'] = (await getProjects()).map((project) => {
    return {
      createdAt: new Date(project.createdAt),
      description: project.description,
      forkCount: Number(project.forkCount),
      name: project.name,
      stargazerCount: Number(project.stargazerCount),
      updatedAt: new Date(project.updatedAt),
      url: project.url
    };
  });

  return <ProjectsTemplate locale={locale} projects={projects} title={title} />;
};

export { Page as default, generateMetadata };
