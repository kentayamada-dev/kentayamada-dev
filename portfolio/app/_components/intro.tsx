import type { JSX } from "react";

const text = {
  center: "center.",
  file: "file.",
  fileName: "page.tsx",
  getStarted: "To get started, edit the",
  headOver: "Looking for a starting point or more instructions? Head over to",
  learning: "Learning",
  orThe: "or the",
  templates: "Templates",
};

export const Intro = (): JSX.Element => (
  <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-start">
    <h1 className="text-3xl/10 font-semibold tracking-tight text-black max-inline-xs dark:text-zinc-50">
      {text.getStarted}{" "}
      <code className="rounded-sm bg-black/6 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/8">
        {text.fileName}
      </code>{" "}
      {text.file}
    </h1>
    <p className="text-lg/8 text-zinc-600 max-inline-md dark:text-zinc-400">
      {text.headOver}{" "}
      <a
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        className="font-medium text-zinc-950 dark:text-zinc-50"
      >
        {text.templates}
      </a>{" "}
      {text.orThe}{" "}
      <a
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        className="font-medium text-zinc-950 dark:text-zinc-50"
      >
        {text.learning}
      </a>{" "}
      {text.center}
    </p>
  </div>
);
