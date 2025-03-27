import { Noto_Sans_JP, Roboto_Mono } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
});

const robotoMono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto-mono'
});

const fonts = `${notoSansJP.variable} ${robotoMono.variable}`;

export { fonts, notoSansJP };
