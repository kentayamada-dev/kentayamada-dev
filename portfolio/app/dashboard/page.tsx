import Link from 'next/link';
import type { JSXElement } from '@/types/components';

export default function Page(): JSXElement {
  return (
    <>
      <article className='prose'>
        <h2>Hello, Dashboard!</h2>
        <h2>Hello, Dashboard!</h2>
      </article>
      <Link href='/'>Go to Root</Link>
    </>
  );
}
