import Link from 'next/link';
import { ClockHistoryIcon, ClockIcon, ForksIcon, StarIcon } from '@/components/icons';
import { getDateString } from '@/utils';
import type { ProjectsListType } from './types';

const ProjectsList: ProjectsListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-8 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.projects.map((project) => {
        const { createdAt, description, forkCount, name, stargazerCount, updatedAt, url } = project;

        return (
          <Link className='bg-primary hover-primary flex min-h-72 flex-col rounded-lg p-5' href={url} key={name}>
            <h2 className='text-primary text-2xl font-bold'>{name}</h2>
            <p className='text-secondary mt-2 text-base'>{description}</p>
            <div className='mt-auto pt-5'>
              <div className='text-secondary flex justify-between text-base font-semibold'>
                <div className='flex gap-x-3'>
                  <div className='flex items-center gap-x-1'>
                    <span className='size-5'>
                      <StarIcon />
                    </span>
                    <span className='text-secondary text-sm'>{stargazerCount}</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <span className='size-5'>
                      <ForksIcon />
                    </span>
                    <span className='text-secondary text-sm'>{forkCount}</span>
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-x-1'>
                    <span className='size-4'>
                      <ClockHistoryIcon />
                    </span>
                    <time className='text-secondary text-sm' dateTime={updatedAt.toISOString()} itemProp='dateModified'>
                      {getDateString(updatedAt, props.locale)}
                    </time>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <span className='size-4'>
                      <ClockIcon />
                    </span>
                    <time className='text-secondary text-sm' dateTime={createdAt.toISOString()} itemProp='datePublished'>
                      {getDateString(createdAt, props.locale)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { ProjectsList };
