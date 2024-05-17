import Link from 'next/link';
import type { JSXElement } from '@/types/components';

export default function Page(): JSXElement {
  return (
    <>
      <article className='prose'>
        <h1>Hello, Dashboard!</h1>
      </article>
      <Link href='/'>Go to Root</Link>
    </>
  );
}
