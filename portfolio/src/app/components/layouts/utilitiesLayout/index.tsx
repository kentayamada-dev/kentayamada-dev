import { UtilitiesList } from '@/components/elements';
import { dictionaries } from '@/constants/i18n';
import type { UtilitiesLayoutType } from './types';

const UtilitiesLayout: UtilitiesLayoutType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <UtilitiesList
        lang={props.lang}
        title={dict.utilities}
        utilities={props.utilities}
        utilitiesHref={props.utilitiesHref}
      />
    </div>
  );
};

export { UtilitiesLayout };
