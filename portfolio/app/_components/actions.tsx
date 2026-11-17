import Image from "next/image";
import type { JSX } from "react";

const text = {
  deployNow: "Deploy Now",
  documentation: "Documentation",
};

export const Actions = (): JSX.Element => (
  <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
    <a
      className="flex items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors block-12 inline-full hover:bg-[#383838] md:inline-39.5 dark:hover:bg-[#ccc]"
      href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="block-3.5 inline-4 dark:invert"
        src="/vercel.svg"
        alt="Vercel logomark"
        width={16}
        height={14}
      />
      {text.deployNow}
    </a>
    <a
      className="flex items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors block-12 inline-full hover:border-transparent hover:bg-black/4 md:inline-39.5 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text.documentation}
    </a>
  </div>
);
