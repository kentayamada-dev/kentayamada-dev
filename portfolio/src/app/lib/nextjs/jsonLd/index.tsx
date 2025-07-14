import type { JsonLdType } from './types';

const JsonLd: JsonLdType = (props) => {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(props.jsonLd).replace(/</gu, '\\u003c')
      }}
      type='application/ld+json'
    />
  );
};

export { JsonLd };
