import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { Footer, Header } from '@/components/designSystem/organisms';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { arrayOfThemes, defaultTheme } from '@/constants/themes';
import { ProgressProvider } from '@/lib/bprogress';
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
        <ThemeProvider attribute='class' defaultTheme={defaultTheme} disableTransitionOnChange themes={arrayOfThemes}>
          <ProgressProvider>
            <Header author={myName} copyrightYear={currentYear} homepageUrl={navigationItems(locale).home.href} locale={locale} />
            {props.children}
            <Footer author={myName} copyrightYear={currentYear} homepageUrl={navigationItems(locale).home.href} />
          </ProgressProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export { Layout as default, generateStaticParams };
