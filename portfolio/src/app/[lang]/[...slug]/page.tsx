import { notFound } from 'next/navigation';

function CatchAllPage(): VoidFunction {
  notFound();
}

export { CatchAllPage as default };
