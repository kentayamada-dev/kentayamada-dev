import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@/components/icons';
import { Calculator } from './calculator';
import type { UtilityTemplateType } from './types';

const UtilityTemplate: UtilityTemplateType = (props) => {
  return (
    <main className='w-full self-center px-5 py-10 sm:px-10 sm:py-20 md:max-w-4xl'>
      <h1 className='text-primary mb-10 text-center text-3xl font-semibold sm:text-4xl'>{props.title}</h1>
      <Calculator locale={props.locale} />
      <div className='bg-primary mt-20 divide-y divide-slate-900/10 rounded-lg p-5 sm:p-10 dark:divide-slate-300/10'>
        <h2 className='text-primary pb-5 text-2xl font-semibold sm:text-2xl'>{props.faqLabel}</h2>
        <dl className='divide-y divide-slate-900/10 dark:divide-slate-300/10'>
          {props.faqs.map((faq) => {
            const { answer, question } = faq;

            return (
              <Disclosure as='div' key={question}>
                <dt>
                  <DisclosureButton className='group w-full hover:cursor-pointer'>
                    <div className='flex w-full items-center justify-between pt-5 text-left group-data-[open]:pb-0 [.group:not([data-open])_&]:pb-5'>
                      <span className='text-primary text-base font-semibold sm:text-lg'>{question}</span>
                      <span className='ml-6 flex h-7 items-center group-hover:text-slate-600 group-hover:dark:text-slate-300'>
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
                  <section className='bg-primary prose dark:prose-invert prose-figcaption:max-w-fit prose-figcaption:rounded-t-lg prose-figcaption:bg-slate-800 prose-figcaption:p-2 prose-figcaption:text-slate-300 prose-pre:rounded-lg prose-pre:rounded-tl-none prose-pre:bg-slate-800 prose-figcaption:dark:bg-slate-900 prose-figcaption:dark:text-slate-400 prose-pre:dark:bg-slate-900 max-w-none overflow-auto py-5'>
                    {answer}
                  </section>
                </DisclosurePanel>
              </Disclosure>
            );
          })}
        </dl>
      </div>
    </main>
  );
};

export { UtilityTemplate };
