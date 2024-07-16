import { fonts } from '@/constants/fonts';
import { Footer } from './footer';
import { Header } from './header';
import { Providers } from './providers';
import type { LayoutType } from './types';

const RootLayout: LayoutType = (props) => {
  return (
    <html className={fonts} lang='en' suppressHydrationWarning>
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
