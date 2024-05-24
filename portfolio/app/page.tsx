import Link from 'next/link';
import { ThemeSwitchWrapper } from '@/components/theme-switch-wrapper';
import type { JSXElement } from '@/types/components';

export default function Page(): JSXElement {
  return (
    <>
      <ThemeSwitchWrapper />
      <article className='prose'>
        <h1>Hello, Root!</h1>
      </article>
      <Link href='/dashboard'>Go to Dashboard</Link>
    </>
  );
}
