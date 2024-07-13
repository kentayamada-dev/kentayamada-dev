import Link from 'next/link';
import type { JSXElementType } from '@/types/components';

function Page(): JSXElementType {
  return (
    <>
      <article className='prose'>
        <h2>Hello, Dashboard!</h2>
        <h2>Hello, Dashboard!</h2>
      </article>
      <Link href='/' prefetch>
        Go to Root
      </Link>
    </>
  );
}

export { Page as default };
