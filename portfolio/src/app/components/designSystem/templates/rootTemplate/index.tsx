import { Footer } from './footer';
import { Header } from './header';
import type { RootTemplateType } from './types';

const RootTemplate: RootTemplateType = (props) => {
  return (
    <>
      <Header authorName={props.authorName} locale={props.locale} year={props.year} />
      {props.children}
      <Footer authorName={props.authorName} year={props.year} />
    </>
  );
};

export { RootTemplate };
