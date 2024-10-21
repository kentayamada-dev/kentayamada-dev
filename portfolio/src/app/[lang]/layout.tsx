import { RootLayout } from '@/components/layouts/rootLayout';
import { Providers } from '@/components/layouts/rootLayout/providers';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import type { JSXElementType, LayoutGenerateStaticParamsReturn, NextLayoutProps } from '@/types/components';
// eslint-disable-next-line import/no-relative-parent-imports
import '../globals.css';

function generateStaticParams(): LayoutGenerateStaticParamsReturn {
  return arrayOfLocales.map((lang) => {
    return { lang, slug: [] };
  });
}

function Layout(props: NextLayoutProps): JSXElementType {
  const currentYear = new Date().getFullYear();
  const dict = dictionaries[props.params.lang];

  return (
    <html className={fonts} lang={props.params.lang} suppressHydrationWarning>
      <body>
        <Providers>
          <RootLayout authorName={dict.myName} lang={props.params.lang} year={currentYear}>
            {props.children}
          </RootLayout>
        </Providers>
      </body>
    </html>
  );
}

export { Layout as default, generateStaticParams };
