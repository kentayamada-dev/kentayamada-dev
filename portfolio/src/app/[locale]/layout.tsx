import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers, RootTemplate } from '@/components/designSystem/templates';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import type { LayoutGenerateStaticParamsType, LayoutPageType } from '@/types/components';
/* eslint-disable import/no-unresolved, import/order */
import 'katex/dist/katex.min.css';
import 'scroll-hint/css/scroll-hint.css';
import '../globals.css';
/* eslint-enable import/no-unresolved, import/order */

const generateStaticParams: LayoutGenerateStaticParamsType = () => {
  return arrayOfLocales.map((locale) => {
    return { locale, slug: [] };
  });
};

const Layout: LayoutPageType = async (props) => {
  const currentYear = new Date().getFullYear();
  const { locale } = await props.params;
  const { myName } = dictionaries[locale];
  const homepageUrl = `/${locale}`;

  return (
    <html className={fonts} lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <RootTemplate author={myName} copyrightYear={currentYear} homepageUrl={homepageUrl} locale={locale}>
            {props.children}
          </RootTemplate>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export { Layout as default, generateStaticParams };
