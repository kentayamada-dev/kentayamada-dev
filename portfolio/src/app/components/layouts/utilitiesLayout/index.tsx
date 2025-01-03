import { UtilitiesList } from '@/components/elements';
import { dictionaries } from '@/constants/i18n';
import type { UtilitiesLayoutType } from './types';

const UtilitiesLayout: UtilitiesLayoutType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-10 sm:max-w-6xl'>
      <UtilitiesList
        lang={props.lang}
        title={dict.articles.latest}
        utilities={props.utilities}
        utilitiesHref={props.utilitiesHref}
      />
    </div>
  );
};

export { UtilitiesLayout };
