import { UtilitiesList } from '@/components/molecules';
import { dictionaries } from '@/constants/i18n';
import type { UtilitiesTemplateType } from './types';

const UtilitiesTemplate: UtilitiesTemplateType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <UtilitiesList lang={props.lang} title={dict.utilities} utilities={props.utilities} utilitiesHref={props.utilitiesHref} />
    </div>
  );
};

export { UtilitiesTemplate };
