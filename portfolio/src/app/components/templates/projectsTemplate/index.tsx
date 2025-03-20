import { ProjectsList } from '@/components/molecules';
import { dictionaries } from '@/constants/i18n';
import type { ProjectsTemplateType } from './types';

const ProjectsTemplate: ProjectsTemplateType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <ProjectsList lang={props.lang} projects={props.projects} title={dict.projects} />
    </div>
  );
};

export { ProjectsTemplate };
