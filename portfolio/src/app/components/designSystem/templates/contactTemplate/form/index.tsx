'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import Link from 'next/link';
import Script from 'next/script';
import { useActionState, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, TextArea } from '@/components/designSystem/atoms';
import { ChevronDownIcon } from '@/components/icons';
import { envClient } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { defaultIntlTelCode, intlTelList } from '@/constants/intlTel';
import { getEntries } from '@/utils';
import { createPost, verifyRecaptcha } from './actions';
import type { IntlTelEntryType, IntlTelKeyType } from '@/constants/intlTel/types';
import type { ContactSchemaType, FormStateType, FormType } from './types';

const Form: FormType = (props) => {
  const dict = dictionaries[props.locale];

  const { control, register, watch } = useForm<ContactSchemaType>({
    defaultValues: {
      countryCode: defaultIntlTelCode,
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      phoneNumber: ''
    }
  });

  const actionWithRecaptcha = async (prevState: FormStateType, formData: FormData): Promise<FormStateType> => {
    const token = await new Promise<string>((resolve) => {
      // eslint-disable-next-line no-undef
      grecaptcha.ready(() => {
        // eslint-disable-next-line no-undef
        grecaptcha.execute(envClient.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve);
      });
    });

    const isHuman = await verifyRecaptcha(token);

    if (!isHuman) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        data: Object.fromEntries(formData) as ContactSchemaType,
        errors: {
          fieldErrors: {},
          formErrors: ['Failed reCAPTCHA verification.']
        }
      };
    }

    return createPost(prevState, formData);
  };

  const [state, action, isPending] = useActionState(actionWithRecaptcha, {});

  const countriesData = useMemo<Record<IntlTelKeyType, IntlTelEntryType>>(() => {
    return getEntries(intlTelList)
      .map(([key, value]) => {
        return {
          key,
          ...value,
          label: new Intl.DisplayNames([props.locale], { type: 'region' }).of(key) ?? ''
        };
      })
      .sort((firstCountry, secondCountry) => {
        return firstCountry.label.localeCompare(secondCountry.label);
      })
      .reduce<Record<IntlTelKeyType, IntlTelEntryType>>(
        // eslint-disable-next-line no-restricted-syntax
        (acc, { key, ...rest }) => {
          acc[key] = rest;

          return acc;
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        {} as Record<IntlTelKeyType, IntlTelEntryType>
      );
  }, [props.locale]);

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?trustedtypes=true&render=${envClient.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
      <form action={action} className='flex flex-col space-y-10'>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            autoComplete='given-name'
            defaultValue={state.data?.firstName}
            label={dict.form.firstName}
            placeholder={dict.form.placeHolder.firstName}
            required
            type='text'
            {...register('firstName')}
          />
          <Input
            autoComplete='family-name'
            defaultValue={state.data?.lastName}
            label={dict.form.lastName}
            placeholder={dict.form.placeHolder.lastName}
            required
            type='text'
            {...register('lastName')}
          />
        </div>
        <Input
          autoComplete='email'
          defaultValue={state.data?.email}
          label={dict.form.email}
          placeholder='name@example.com'
          required
          type='email'
          {...register('email')}
        />
        <div className='relative'>
          <label className='text-primary block pb-2 text-base font-medium' htmlFor='phoneNumber'>
            {dict.form.phoneNumber}
          </label>
          <div
            className={`${state.errors?.fieldErrors.phoneNumber ? 'outline-red-600' : 'outline-gray-300 has-[input:focus-within]:outline-blue-500 dark:outline-gray-600'} flex rounded-lg outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2`}
          >
            <div>
              <Controller
                control={control}
                defaultValue={state.data?.countryCode ?? defaultIntlTelCode}
                name='countryCode'
                // eslint-disable-next-line no-restricted-syntax
                render={({ field: { ref, value, ...rest } }) => {
                  return (
                    <Listbox as='div' className='h-full w-full' value={value} {...rest}>
                      <ListboxButton
                        className={`${state.errors?.fieldErrors.phoneNumber && 'focus:outline-red-600'} bg-primary flex h-full w-full items-center justify-center rounded-l-lg rounded-r-none pr-2 pl-3 focus-within:relative hover:cursor-pointer focus:outline-2 focus:-outline-offset-2`}
                        ref={ref}
                      >
                        <div
                          className='mr-2 size-5 bg-contain bg-center bg-no-repeat'
                          style={{ backgroundImage: `url(${countriesData[value].icon})` }}
                        />
                        <div className='text-tertiary size-5'>
                          <ChevronDownIcon />
                        </div>
                      </ListboxButton>
                      <ListboxOptions className='absolute top-20 h-60 w-fit overflow-auto rounded-lg bg-white ring-1 ring-gray-300 dark:bg-slate-800 dark:ring-gray-600'>
                        {getEntries(countriesData).map(([key, { code, icon, label }]) => {
                          return (
                            <ListboxOption
                              className='group relative cursor-pointer px-2 py-3 select-none data-[focus]:bg-slate-100 data-[focus]:text-white data-[focus]:dark:bg-slate-600/30'
                              key={key}
                              value={key}
                            >
                              <div className='flex text-black dark:text-white'>
                                <div className='size-5 bg-contain bg-center bg-no-repeat' style={{ backgroundImage: `url(${icon})` }} />
                                <div className='ml-2'>{label}</div>
                                <div className='text-tertiary ml-3'>{code}</div>
                              </div>
                            </ListboxOption>
                          );
                        })}
                      </ListboxOptions>
                    </Listbox>
                  );
                }}
              />
            </div>
            <input
              autoComplete='tel'
              className='placeholder-primary bg-primary grow p-2.5 text-base text-black focus:outline-hidden dark:text-white'
              defaultValue={state.data?.phoneNumber}
              id='phoneNumber'
              placeholder={countriesData[watch('countryCode')].format}
              required
              type='tel'
              {...register('phoneNumber')}
            />
          </div>
          {state.errors?.fieldErrors.phoneNumber ? <p className='mt-2 flex text-red-600'>{dict.form.phoneNumberError}</p> : null}
        </div>
        <TextArea
          autoComplete='on'
          defaultValue={state.data?.message}
          label={dict.form.message}
          placeholder={dict.form.placeHolder.message}
          required
          rows={4}
          {...register('message')}
        />
        <div className='mb-10'>
          <div className='text-secondary mb-3 text-sm'>
            This site is protected by reCAPTCHA and the Google&nbsp;
            <Link className='text-blue-500' href='https://policies.google.com/privacy'>
              Privacy Policy
            </Link>
            &nbsp;and&nbsp;
            <Link className='text-blue-500' href='https://policies.google.com/terms'>
              Terms of Service
            </Link>
            &nbsp;apply.
          </div>
          <input
            className='w-full cursor-pointer rounded-lg bg-blue-500 px-5 py-2.5 text-center font-semibold text-white disabled:cursor-not-allowed'
            disabled={isPending}
            type='submit'
          />
          {state.errors?.formErrors ? <p className='mt-2 flex justify-center text-red-600'>{dict.form.recaptchaError}</p> : null}
        </div>
      </form>
    </>
  );
};

export { Form };
