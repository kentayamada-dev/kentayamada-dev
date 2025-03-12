import { Providers, RootTemplate } from '@/components/templates';
import { fonts } from '@/constants/fonts';
import { arrayOfLocales, dictionaries } from '@/constants/i18n';
import type { AsyncJSXElementType, LayoutGenerateStaticParamsReturn, NextLayoutProps } from '@/types/components';
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
          <RootTemplate authorName={dict.myName} lang={lang} year={currentYear}>
            {props.children}
          </RootTemplate>
        </Providers>
      </body>
    </html>
  );
}

export { Layout as default, generateStaticParams };
