import { TableOfContents } from '../tableOfContents';
import type { DesktopTableOfContentsType } from './types';

const DesktopTableOfContents: DesktopTableOfContentsType = (props) => {
  return (
    <div className='bg-primary w-80 rounded-lg p-5'>
      <div className='text-primary mb-2 px-1 text-lg font-semibold'>{props.title}</div>
      <div className='max-h-[calc(100vh-16rem)] overflow-auto'>
        <TableOfContents articleClassName={props.articleClassName} label={props.title} />
      </div>
    </div>
  );
};

export { DesktopTableOfContents };
