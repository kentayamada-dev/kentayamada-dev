'use client';

import { type MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { type FormEventHandler, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Input, InputWithCombobox } from '@/components/elements';
import { currencies } from '@/constants/currencies';
import { dictionaries } from '@/constants/i18n';
import { isValueInArray } from '@/typeGuards';
import { getCurrencyPairs } from '@/utils';
import type { CalculatorInputsType, CalculatorType } from './types';
import type { CurrencyPairType, CurrencyType } from '@/constants/currencies/types';
import type { ChangeEventType } from '@/types/components';

const Calculator: CalculatorType = (props) => {
  const dict = dictionaries[props.lang];
  const [baseCurrency, setBaseCurrency] = useState<CurrencyType>('USD');
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyType>('JPY');
  const [currencyPair, setCurrencyPair] = useState<CurrencyPairType>('USD/JPY');
  const { handleSubmit, register } = useForm<CalculatorInputsType>();
  const currencyPairs = getCurrencyPairs(baseCurrency, currencies);

  const useCustomSpring = (): MotionValue<number> => {
    return useSpring(0, { damping: 20, stiffness: 90 });
  };

  const useCustomTransform = (spring: MotionValue<number>): MotionValue<string> => {
    return useTransform(spring, (current) => {
      return Math.round(current).toLocaleString();
    });
  };

  const allCurrencyPairs = currencies.flatMap((base) => {
    return currencies
      .filter((quote) => {
        return quote !== base;
      })
      .map((quote) => {
        return `${base}/${quote}` as CurrencyPairType;
      });
  });

  const stockProfitSpring = useCustomSpring();
  const stockProfitDisplay = useCustomTransform(stockProfitSpring);

  const forexProfitLossSpring = useCustomSpring();
  const forexProfitDisplay = useCustomTransform(forexProfitLossSpring);

  const totalProfitSpring = useCustomSpring();
  const totalProfitDisplay = useCustomTransform(totalProfitSpring);

  const items = [
    {
      currency: quoteCurrency,
      label: dict.calculator.stockProfitLoss,
      value: stockProfitDisplay
    },
    {
      currency: quoteCurrency,
      label: dict.calculator.forexProfitLoss,
      value: forexProfitDisplay
    },
    {
      currency: quoteCurrency,
      label: dict.calculator.totalProfitLoss,
      value: totalProfitDisplay
    }
  ];

  const onSubmit: SubmitHandler<CalculatorInputsType> = (data) => {
    const buyPrice = Number(data.buyPrice);
    const buyRate = Number(data.buyRate);
    const sellPrice = Number(data.sellPrice);
    const sellRate = Number(data.sellRate);
    const shares = Number(data.shares);

    const totalBuyInQuoteCurrency = buyPrice * buyRate * shares;
    const totalSellInQuoteCurrency = sellPrice * sellRate * shares;
    const hypotheticalSellInQuoteCurrency = sellPrice * shares * buyRate;
    const stockProfitInQuoteCurrency = hypotheticalSellInQuoteCurrency - totalBuyInQuoteCurrency;
    const fxProfitInQuoteCurrency = totalSellInQuoteCurrency - hypotheticalSellInQuoteCurrency;
    const totalProfitInQuoteCurrency = totalSellInQuoteCurrency - totalBuyInQuoteCurrency;

    stockProfitSpring.set(stockProfitInQuoteCurrency);
    forexProfitLossSpring.set(fxProfitInQuoteCurrency);
    totalProfitSpring.set(totalProfitInQuoteCurrency);
  };

  const handleCurrencyChange: ChangeEventType<'select'> = (event): void => {
    const newCurrency = event.target.value;

    if (isValueInArray(newCurrency, currencies)) {
      setBaseCurrency(newCurrency);

      if (newCurrency === 'USD') {
        setQuoteCurrency('JPY');
      } else {
        setQuoteCurrency('USD');
      }
    }
  };

  const handleCurrencyPairChange: ChangeEventType<'select'> = (event) => {
    const newCurrency = event.target.value;
    const [, quote] = newCurrency.split('/');

    if (isValueInArray(quote, currencies)) {
      setQuoteCurrency(quote);
    }

    if (isValueInArray(newCurrency, allCurrencyPairs)) {
      setCurrencyPair(newCurrency);
    }
  };

  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await handleSubmit(onSubmit)();
    })();
  };

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
      <form className='space-y-7' onSubmit={handleFormSubmit}>
        <InputWithCombobox
          id='buyPrice'
          required
          type='number'
          {...register('buyPrice')}
          handleOptionChange={handleCurrencyChange}
          label={dict.calculator.buyPrice}
          max='1000'
          min='0.00'
          optionValue={baseCurrency}
          options={currencies}
          placeholder='0.00'
          step='0.01'
        />
        <InputWithCombobox
          id='sellPrice'
          required
          type='number'
          {...register('sellPrice')}
          handleOptionChange={handleCurrencyChange}
          label={dict.calculator.sellPrice}
          max='1000'
          min='0.00'
          optionValue={baseCurrency}
          options={currencies}
          placeholder='0.00'
          step='0.01'
        />
        <InputWithCombobox
          id='buyRate'
          required
          type='number'
          {...register('buyRate')}
          handleOptionChange={handleCurrencyPairChange}
          label={dict.calculator.buyRate}
          max='1000'
          min='0.00'
          optionValue={currencyPair}
          options={currencyPairs}
          placeholder='0.00'
          step='0.01'
        />
        <InputWithCombobox
          id='sellRate'
          label={dict.calculator.sellRate}
          required
          type='number'
          {...register('sellRate')}
          handleOptionChange={handleCurrencyPairChange}
          max='1000'
          min='0.00'
          optionValue={currencyPair}
          options={currencyPairs}
          placeholder='0.00'
          step='0.01'
        />
        <Input
          id='shares'
          label={dict.calculator.shares}
          required
          type='number'
          {...register('shares')}
          max='100000'
          min='0'
          placeholder='0'
          step='1'
        />
        <input
          className='w-full cursor-pointer rounded-lg bg-sky-500 px-5 py-2.5 text-center font-semibold text-white'
          type='submit'
        />
      </form>
      <dl className='grid grid-cols-1 grid-rows-none gap-5 md:grid-rows-4'>
        {items.map((item) => {
          return (
            <div
              className='grid content-center items-center rounded-lg bg-slate-100 px-4 py-5 dark:bg-slate-800'
              key={item.label}
            >
              <dt className='text-base'>{item.label}</dt>
              <dd className='mt-1 flex justify-between text-2xl font-semibold text-slate-900 dark:text-white'>
                <motion.span>{item.value}</motion.span>
                <span>{item.currency}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export { Calculator };
