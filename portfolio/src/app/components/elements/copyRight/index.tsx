import Link from 'next/link';
import type { CopyRightType } from './types';

const CopyRight: CopyRightType = (props) => {
  return (
    <p className='text-secondary text-center text-sm'>
      {`© ${props.year} `}
      <Link className='hover:underline' href='https://github.com/kentayamada-dev' target='_blank'>
        {props.authorName}
      </Link>
    </p>
  );
};

export { CopyRight };
