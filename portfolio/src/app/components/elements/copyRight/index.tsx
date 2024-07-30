import Link from 'next/link';
import { dictionaries } from '@/constants/i18n';
import type { CopyRightType } from './types';

const CopyRight: CopyRightType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <p className='text-center text-sm text-slate-500'>
      {'© 2024 '}
      <Link className='hover:underline' href='https://github.com/kentayamada-dev' target='_blank'>
        {dict.myName}
      </Link>
    </p>
  );
};

export { CopyRight };
