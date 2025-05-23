import { Form } from './form';
import type { ContactTemplateType } from './types';

const ContactTemplate: ContactTemplateType = (props) => {
  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='md:pr-20'>
          <h1 className='text-primary text-4xl font-semibold tracking-tight sm:text-5xl'>{props.title}</h1>
          <p className='text-secondary mt-5 text-base/7 sm:mt-10 sm:text-lg/8'>{props.subtitle}</p>
        </div>
        <div className='mt-16 md:mt-0'>
          <Form locale={props.locale} />
        </div>
      </div>
    </main>
  );
};

export { ContactTemplate };
