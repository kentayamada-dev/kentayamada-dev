import { CustomNextLink } from '../customNextLink';
import type { CopyRightType } from './types';

const CopyRight: CopyRightType = (props) => {
  return (
    <p className='text-secondary text-center text-sm'>
      {`© ${props.copyrightYear} `}
      <CustomNextLink className='hover:underline' href={props.homepageUrl}>
        {props.author}
      </CustomNextLink>
    </p>
  );
};

export { CopyRight };
