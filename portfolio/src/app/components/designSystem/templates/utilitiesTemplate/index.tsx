import { UtilitiesList } from '@/components/designSystem/molecules';
import type { UtilitiesTemplateType } from './types';

const UtilitiesTemplate: UtilitiesTemplateType = (props) => {
  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{props.title}</h1>
      <UtilitiesList locale={props.locale} utilities={props.utilities} utilitiesHref={props.utilitiesHref} />
    </main>
  );
};

export { UtilitiesTemplate };
