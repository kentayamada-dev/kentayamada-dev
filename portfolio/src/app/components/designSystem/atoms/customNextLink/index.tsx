import Link from 'next/link';
import type { CustomNextLinkType } from './types';

const CustomNextLink: CustomNextLinkType = (props) => {
  return <Link prefetch={false} {...props} />;
};

export { CustomNextLink };
