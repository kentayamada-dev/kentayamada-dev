import { Footer } from './footer';
import { Header } from './header';
import type { RootTemplateType } from './types';

const RootTemplate: RootTemplateType = (props) => {
  return (
    <>
      <Header authorName={props.authorName} href={props.href} locale={props.locale} year={props.year} />
      {props.children}
      <Footer authorName={props.authorName} href={props.href} year={props.year} />
    </>
  );
};

export { RootTemplate };
