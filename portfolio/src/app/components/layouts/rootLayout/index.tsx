import { Footer } from './footer';
import { Header } from './header';
import type { RootLayoutType } from './types';

const RootLayout: RootLayoutType = (props) => {
  return (
    <>
      <Header authorName={props.authorName} lang={props.lang} year={props.year} />
      {props.children}
      <Footer authorName={props.authorName} lang={props.lang} year={props.year} />
    </>
  );
};

export { RootLayout };
