import Link from 'next/link';
import type { CopyRightType } from './types';

const CopyRight: CopyRightType = (props) => {
  return (
    <p className='text-secondary text-center text-sm'>
      {`© ${props.copyrightYear} `}
      <Link className='hover:underline' href={props.homepageUrl}>
        {props.author}
      </Link>
    </p>
  );
};

export { CopyRight };
