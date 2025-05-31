import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { Providers, RootTemplate } from '@/components/designSystem/templates';
import { envClient } from '@/constants/env';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import type { LayoutGenerateStaticParamsType, LayoutPageType } from '@/types/components';
// eslint-disable-next-line import/no-unresolved
import 'katex/dist/katex.min.css';
import 'scroll-hint/css/scroll-hint.css';
import '../globals.css';

const generateStaticParams: LayoutGenerateStaticParamsType = () => {
  return arrayOfLocales.map((locale) => {
    return { locale, slug: [] };
  });
};

const Layout: LayoutPageType = async (props) => {
  const currentYear = new Date().getFullYear();
  const { locale } = await props.params;
  const { myName } = dictionaries[locale];

  return (
    <html className={fonts} lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <RootTemplate author={myName} copyrightYear={currentYear} homepageUrl={navigationItems(locale).home.href} locale={locale}>
            {props.children}
          </RootTemplate>
        </Providers>
        <Analytics />
        <SpeedInsights />
        <Script src={`https://www.google.com/recaptcha/api.js?trustedtypes=true&render=${envClient.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
      </body>
    </html>
  );
};

export { Layout as default, generateStaticParams };
