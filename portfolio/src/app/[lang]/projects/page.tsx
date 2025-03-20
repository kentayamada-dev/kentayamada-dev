import { notFound } from 'next/navigation';
import { ProjectsTemplate } from '@/components/templates';
import { contentfulType } from '@/constants/contentful';
import { navigationItems } from '@/constants/navigation';
import { getMetadata, getProjects } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { lang } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(lang, contentfulType.metadata.projects, notFound);

  return getMetadataObject(
    'website',
    navigationItems.projects.href,
    lang,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt)
  );
};

const Page: ArticlesPageType = async (props) => {
  const { lang } = await props.params;
  const projects = await getProjects();

  return <ProjectsTemplate lang={lang} projects={projects} />;
};

export { Page as default, generateMetadata };
