import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { Calculator } from './calculator';
import type { UtilityLayoutType } from './types';

const UtilityLayout: UtilityLayoutType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-10 w-full self-center px-5 sm:px-10 md:max-w-4xl'>
      <h1 className='mb-10 text-center text-3xl font-semibold text-slate-900 dark:text-white sm:text-5xl'>
        {props.title}
      </h1>
      <Calculator lang={props.lang} />
      <div className='mt-20 divide-y divide-slate-900/10 bg-slate-100 p-5 dark:divide-slate-300/10 dark:bg-slate-800 sm:p-10'>
        <h2 className='text-2xl font-semibold text-slate-900 dark:text-white sm:text-2xl'>{dict.faq}</h2>
        <dl className='mt-5 divide-y divide-slate-900/10 dark:divide-slate-300/10'>
          {props.faqs.map((faq) => {
            return (
              <Disclosure as='div' key={faq.question}>
                <dt>
                  <DisclosureButton className='group w-full'>
                    <div className='flex w-full items-center justify-between pt-5 text-left group-data-[open]:pb-0 [.group:not([data-open])_&]:pb-5'>
                      <span className='text-lg font-semibold text-slate-900 dark:text-white'>{faq.question}</span>
                      <span className='ml-6 flex h-7 items-center'>
                        <span className='size-6 group-data-[open]:hidden'>
                          <PlusIcon />
                        </span>
                        <span className='size-6 [.group:not([data-open])_&]:hidden'>
                          <MinusIcon />
                        </span>
                      </span>
                    </div>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as='dd' className='mt-2 grid'>
                  <section className='prose max-w-none overflow-auto bg-slate-100 py-5 dark:prose-invert prose-figcaption:max-w-fit prose-figcaption:rounded-t-md prose-figcaption:bg-slate-800 prose-figcaption:p-2 prose-figcaption:text-slate-300 prose-pre:rounded-md prose-pre:rounded-tl-none prose-pre:bg-slate-800 dark:bg-slate-800 prose-figcaption:dark:bg-slate-900 prose-figcaption:dark:text-slate-400 prose-pre:dark:bg-slate-900'>
                    {faq.answer}
                  </section>
                </DisclosurePanel>
              </Disclosure>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export { UtilityLayout };
