'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import Form from 'next/form';
import { useMemo } from 'react';
// @ts-expect-error type not found
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { Input, StatefulButton, TextArea } from '@/components/designSystem/atoms';
import { ChevronDownIcon } from '@/components/icons';
import { envClient } from '@/constants/env';
import { dictionaries } from '@/constants/i18n';
import { defaultIntlTelCode, intlTelList } from '@/constants/intlTel';
import { getEntries } from '@/utils';
import type { IntlTelEntryType, IntlTelKeyType } from '@/constants/intlTel/types';
import type { ContactFormSchemaType, ContactFormType } from './types';

const ContactForm: ContactFormType = (props) => {
  const {
    form,
    labels: { selectCountryCodeLabel }
  } = dictionaries[props.locale];

  const { control, register, watch } = useForm<ContactFormSchemaType>({
    defaultValues: {
      countryCode: defaultIntlTelCode,
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      phoneNumber: ''
    }
  });

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
    // eslint-disable-next-line react/jsx-handler-names
    <Form action={props.onAction} className='flex flex-col space-y-6'>
      <div className='grid grid-cols-2 gap-4'>
        <Input
          autoComplete='given-name'
          defaultValue={props.state.data?.firstName}
          label={form.firstName}
          placeholder={form.placeHolder.firstName}
          required
          type='text'
          {...register('firstName')}
        />
        <Input
          autoComplete='family-name'
          defaultValue={props.state.data?.lastName}
          label={form.lastName}
          placeholder={form.placeHolder.lastName}
          required
          type='text'
          {...register('lastName')}
        />
      </div>
      <Input
        autoComplete='email'
        defaultValue={props.state.data?.email}
        label={form.email}
        placeholder='name@example.com'
        required
        type='email'
        {...register('email')}
      />
      <div className='relative'>
        <label className='text-primary block pb-2 text-base font-medium' htmlFor='phoneNumber'>
          {`${form.phoneNumber} (${form.optional})`}
        </label>
        <div
          className={`${props.state.errors?.fieldErrors.phoneNumber ? 'outline-red-600' : 'outline-gray-300 has-[input:focus-within]:outline-blue-500 dark:outline-gray-600'} flex overflow-hidden rounded-lg outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2`}
        >
          <div>
            <Controller
              control={control}
              defaultValue={props.state.data?.countryCode ?? defaultIntlTelCode}
              name='countryCode'
              // eslint-disable-next-line no-restricted-syntax
              render={({ field: { ref, value, ...rest } }) => {
                return (
                  <Listbox as='div' className='size-full' value={value} {...rest}>
                    <ListboxButton
                      aria-label={selectCountryCodeLabel}
                      className={`${props.state.errors?.fieldErrors.phoneNumber && 'focus:outline-red-600'} bg-primary flex size-full items-center justify-center rounded-l-lg rounded-r-none pr-2 pl-3 focus-within:relative hover:cursor-pointer focus:outline-2 focus:-outline-offset-2`}
                      ref={ref}
                      title={selectCountryCodeLabel}
                    >
                      <div
                        className='mr-2 size-5 bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${countriesData[value].icon})` }}
                      />
                      <div className='text-tertiary size-5'>
                        <ChevronDownIcon />
                      </div>
                    </ListboxButton>
                    <ListboxOptions
                      aria-label={selectCountryCodeLabel}
                      className='absolute top-20 h-60 w-fit overflow-auto rounded-lg bg-white ring-1 ring-gray-300 dark:bg-slate-800 dark:ring-gray-600'
                    >
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
            defaultValue={props.state.data?.phoneNumber}
            id='phoneNumber'
            placeholder={countriesData[watch('countryCode')].format}
            type='tel'
            {...register('phoneNumber')}
          />
        </div>
        {props.state.errors?.fieldErrors.phoneNumber ? <p className='mt-2 flex text-red-600'>{form.phoneNumberError}</p> : null}
      </div>
      <TextArea
        autoComplete='on'
        defaultValue={props.state.data?.message}
        label={form.message}
        placeholder={form.placeHolder.message}
        required
        rows={4}
        {...register('message')}
      />
      <ReCAPTCHA hl={props.locale} onChange={props.onChangeRc} ref={props.recaptchaRef} sitekey={envClient.NEXT_PUBLIC_RECAPTCHA_SITEKEY} />
      <StatefulButton status={props.status} title={form.submit} />
      {props.isRcError ? <p className='mt-2 flex justify-center text-red-600'>{form.recaptchaError}</p> : null}
    </Form>
  );
};

export { ContactForm };
