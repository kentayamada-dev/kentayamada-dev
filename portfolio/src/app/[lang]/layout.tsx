import { RootLayout } from '@/components/layouts/rootLayout';
import { Providers } from '@/components/layouts/rootLayout/providers';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import type { AsyncJSXElementType, LayoutGenerateStaticParamsReturn, NextLayoutProps } from '@/types/components';
// eslint-disable-next-line import/no-relative-parent-imports
import '../globals.css';

function generateStaticParams(): LayoutGenerateStaticParamsReturn {
  return arrayOfLocales.map((lang) => {
    return { lang, slug: [] };
  });
}

async function Layout(props: NextLayoutProps): AsyncJSXElementType {
  const currentYear = new Date().getFullYear();
  const { lang } = await props.params;
  const dict = dictionaries[lang];

  return (
    <html className={fonts} lang={lang} suppressHydrationWarning>
      <body>
        <Providers>
          <RootLayout authorName={dict.myName} lang={lang} year={currentYear}>
            {props.children}
          </RootLayout>
        </Providers>
      </body>
    </html>
  );
}

export { Layout as default, generateStaticParams };
