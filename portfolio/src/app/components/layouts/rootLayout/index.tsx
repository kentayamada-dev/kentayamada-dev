import { fonts } from '@/constants/fonts';
import { Footer } from './footer';
import { Header } from './header';
import { Providers } from './providers';
import type { RootLayoutType } from './types';

const RootLayout: RootLayoutType = (props) => {
  return (
    <html className={fonts} lang={props.params.lang} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {props.children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export { RootLayout };
