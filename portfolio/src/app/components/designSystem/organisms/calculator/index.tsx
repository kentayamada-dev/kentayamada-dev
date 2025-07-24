'use client';

import NumberFlow, { continuous } from '@number-flow/react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, InputWithCombobox } from '@/components/designSystem/atoms';
import { Share } from '@/components/designSystem/molecules';
import { currencies } from '@/constants/currencies';
import { dictionaries } from '@/constants/i18n';
import { isValueInArray } from '@/typeGuards';
import { getCurrencyPairs } from '@/utils';
import { LikeButtonWrapper } from '../likeButtonWrapper';
import type { ComponentPropsWithoutRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { InputWithComboboxProps } from '@/components/designSystem/atoms';
import type { CurrencyPairType, CurrencyType } from '@/constants/currencies/types';
import type { CalculatorInputsType, CalculatorType } from './types';

const ALL_CURRENCY_PAIRS: CurrencyPairType[] = currencies.flatMap((base) => {
  return currencies
    .filter((quote) => {
      return quote !== base;
    })
    .map((quote) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return `${base}/${quote}` as CurrencyPairType;
    });
});

const Calculator: CalculatorType = (props) => {
  const {
    calculator,
    labels: { selectCurrencyLabel, selectCurrencyPairLabel }
  } = dictionaries[props.locale];

  const [currencyPair, setCurrencyPair] = useState<CurrencyPairType>('USD/JPY');
  const { handleSubmit, register } = useForm<CalculatorInputsType>();

  const [profitData, setProfitData] = useState({
    fxProfitInQuoteCurrency: 0,
    stockProfitInQuoteCurrency: 0,
    totalProfitInQuoteCurrency: 0
  });

  const [baseCurrency, quoteCurrency] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return currencyPair.split('/') as [CurrencyType, CurrencyType];
  }, [currencyPair]);

  const currencyPairs = useMemo(() => {
    return getCurrencyPairs(baseCurrency, currencies);
  }, [baseCurrency]);

  const onSubmit: SubmitHandler<CalculatorInputsType> = (data) => {
    const { buyPrice, buyRate, sellPrice, sellRate, shares } = data;
    const totalBuyInQuoteCurrency = buyPrice * buyRate * shares;
    const totalSellInQuoteCurrency = sellPrice * sellRate * shares;
    const hypotheticalSellInQuoteCurrency = sellPrice * shares * buyRate;
    const stockProfitInQuoteCurrency = hypotheticalSellInQuoteCurrency - totalBuyInQuoteCurrency;
    const fxProfitInQuoteCurrency = totalSellInQuoteCurrency - hypotheticalSellInQuoteCurrency;
    const totalProfitInQuoteCurrency = totalSellInQuoteCurrency - totalBuyInQuoteCurrency;

    setProfitData({ fxProfitInQuoteCurrency, stockProfitInQuoteCurrency, totalProfitInQuoteCurrency });
  };

  const handleCurrencyChange: InputWithComboboxProps['handleOptionChange'] = (newCurrency): void => {
    if (isValueInArray(newCurrency, currencies)) {
      setCurrencyPair(newCurrency === 'USD' ? 'USD/JPY' : `${newCurrency}/USD`);
    }
  };

  const handleCurrencyPairChange: InputWithComboboxProps['handleOptionChange'] = (newCurrency): void => {
    if (isValueInArray(newCurrency, ALL_CURRENCY_PAIRS)) {
      setCurrencyPair(newCurrency);
    }
  };

  const handleFormSubmit: ComponentPropsWithoutRef<'form'>['onSubmit'] = (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await handleSubmit(onSubmit)();
    })();
  };

  const items = [
    {
      currency: quoteCurrency,
      label: calculator.stockProfitLoss,
      value: profitData.stockProfitInQuoteCurrency
    },
    {
      currency: quoteCurrency,
      label: calculator.forexProfitLoss,
      value: profitData.fxProfitInQuoteCurrency
    },
    {
      currency: quoteCurrency,
      label: calculator.totalProfitLoss,
      value: profitData.totalProfitInQuoteCurrency
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
      <form className='space-y-7' onSubmit={handleFormSubmit}>
        <InputWithCombobox
          handleOptionChange={handleCurrencyChange}
          inputMode='decimal'
          label={calculator.buyPrice}
          max='1000'
          min='0.00'
          optionValue={baseCurrency}
          options={currencies}
          placeholder='0.00'
          required
          step='0.01'
          title={selectCurrencyLabel}
          type='number'
          {...register('buyPrice')}
        />
        <InputWithCombobox
          handleOptionChange={handleCurrencyChange}
          inputMode='decimal'
          label={calculator.sellPrice}
          max='1000'
          min='0.00'
          optionValue={baseCurrency}
          options={currencies}
          placeholder='0.00'
          required
          step='0.01'
          title={selectCurrencyLabel}
          type='number'
          {...register('sellPrice')}
        />
        <InputWithCombobox
          handleOptionChange={handleCurrencyPairChange}
          inputMode='decimal'
          label={calculator.buyRate}
          max='1000'
          min='0.00'
          optionValue={currencyPair}
          options={currencyPairs}
          placeholder='0.00'
          required
          step='0.01'
          title={selectCurrencyPairLabel}
          type='number'
          {...register('buyRate')}
        />
        <InputWithCombobox
          handleOptionChange={handleCurrencyPairChange}
          inputMode='decimal'
          label={calculator.sellRate}
          max='1000'
          min='0.00'
          optionValue={currencyPair}
          options={currencyPairs}
          placeholder='0.00'
          required
          step='0.01'
          title={selectCurrencyPairLabel}
          type='number'
          {...register('sellRate')}
        />
        <Input
          inputMode='numeric'
          label={calculator.shares}
          max='100000'
          min='0'
          placeholder='0'
          required
          step='1'
          type='number'
          {...register('shares')}
        />
        <button
          className='w-full cursor-pointer rounded-lg bg-blue-500 px-5 py-2.5 text-center font-semibold text-white hover:brightness-95 dark:hover:brightness-110'
          type='submit'
        >
          {calculator.calculate}
        </button>
      </form>
      <dl className='grid grid-cols-1 grid-rows-none gap-5 md:grid-rows-4'>
        {items.map((item) => {
          const { currency, label, value } = item;

          return (
            <div className='bg-primary grid content-center items-center rounded-lg px-4 py-5' key={item.label}>
              <dt className='text-secondary text-base'>{label}</dt>
              <dd className='text-primary mt-1 flex justify-between text-2xl font-semibold'>
                <NumberFlow locales={props.locale} plugins={[continuous]} respectMotionPreference spinTiming={{ duration: 1000 }} value={value} />
                <span>{currency}</span>
              </dd>
            </div>
          );
        })}
        <div className='flex items-end'>
          <div className='flex w-full justify-between gap-0 md:justify-end md:gap-8'>
            <LikeButtonWrapper incrementCountHandler={props.incrementCountHandler} likeCount={props.likeCount} locale={props.locale} />
            <Share locale={props.locale} url={props.url} />
          </div>
        </div>
      </dl>
    </div>
  );
};

export { Calculator };
