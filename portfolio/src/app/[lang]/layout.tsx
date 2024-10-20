import { RootLayout } from '@/components/layouts/rootLayout';
import { Providers } from '@/components/layouts/rootLayout/providers';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import type { Metadata } from 'next';
import type { JSXElementType, LayoutGenerateStaticParamsReturn, NextLayoutProps, PageProps } from '@/types/components';
// eslint-disable-next-line import/no-relative-parent-imports
import '../globals.css';

function generateMetadata(props: PageProps): Metadata {
  const dict = dictionaries[props.params.lang];

  return {
    description: dict.nav.loadingDescription,
    title: dict.nav.loading
  };
}

function generateStaticParams(): LayoutGenerateStaticParamsReturn {
  return arrayOfLocales.map((lang) => {
    return { lang, slug: [] };
  });
}

function Layout(props: NextLayoutProps): JSXElementType {
  return (
    <html className={fonts} lang={props.params.lang} suppressHydrationWarning>
      <body>
        <Providers>
          <RootLayout lang={props.params.lang}>{props.children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}

export { Layout as default, generateMetadata, generateStaticParams };
