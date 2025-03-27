import { ProjectsList } from '@/components/designSystem/molecules';
import type { ProjectsTemplateType } from './types';

const ProjectsTemplate: ProjectsTemplateType = (props) => {
  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <h1 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h1>
      <ProjectsList locale={props.locale} projects={props.projects} />
    </div>
  );
};

export { ProjectsTemplate };
