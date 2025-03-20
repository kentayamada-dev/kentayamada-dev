import Link from 'next/link';
import { ForksIcon, StarIcon } from '@/components/icons';
import type { ProjectsListType } from './types';

const ProjectsList: ProjectsListType = (props) => {
  return (
    <section>
      <h2 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h2>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {props.projects.map((project) => {
          return (
            <Link className='bg-primary group hover-primary flex h-64 flex-col rounded-lg p-5' href={project.url} key={project.url}>
              <h3 className='text-primary line-clamp-2 text-2xl font-bold'>{project.name}</h3>
              <p className='text-primary mt-2 line-clamp-5 text-sm'>{project.description}</p>
              <div className='mt-auto'>
                <div className='text-secondary flex space-x-5 text-base font-semibold'>
                  <div className='flex items-center space-x-1'>
                    <span className='size-5'>
                      <StarIcon />
                    </span>
                    <div>{project.stargazerCount}</div>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <span className='size-5'>
                      <ForksIcon />
                    </span>
                    <div>{project.forkCount}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export { ProjectsList };
