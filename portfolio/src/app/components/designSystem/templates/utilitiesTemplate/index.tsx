import { UtilitiesList } from '@/components/designSystem/molecules';
import type { UtilitiesTemplateType } from './types';

const UtilitiesTemplate: UtilitiesTemplateType = (props) => {
  return (
    <main className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <h1 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h1>
      <UtilitiesList locale={props.locale} utilities={props.utilities} utilitiesHref={props.utilitiesHref} />
    </main>
  );
};

export { UtilitiesTemplate };
