import { notFound } from 'next/navigation';

function CatchAllPage(): void {
  notFound();
}

export { CatchAllPage as default };
