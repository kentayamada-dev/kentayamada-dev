import { Footer } from './footer';
import { Header } from './header';
import type { RootTemplateType } from './types';

const RootTemplate: RootTemplateType = (props) => {
  return (
    <>
      <Header authorName={props.authorName} lang={props.lang} year={props.year} />
      {props.children}
      <Footer authorName={props.authorName} lang={props.lang} year={props.year} />
    </>
  );
};

export { RootTemplate };
