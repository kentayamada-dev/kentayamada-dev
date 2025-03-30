import { Footer } from './footer';
import { Header } from './header';
import type { RootTemplateType } from './types';

const RootTemplate: RootTemplateType = (props) => {
  return (
    <>
      <Header author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} locale={props.locale} />
      {props.children}
      <Footer author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} />
    </>
  );
};

export { RootTemplate };
