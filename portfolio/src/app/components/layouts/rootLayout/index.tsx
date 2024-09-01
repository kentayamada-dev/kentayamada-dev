import { Footer } from './footer';
import { Header } from './header';
import type { RootLayoutType } from './types';

const RootLayout: RootLayoutType = (props) => {
  return (
    <>
      <Header lang={props.lang} />
      {props.children}
      <Footer lang={props.lang} />
    </>
  );
};

export { RootLayout };
