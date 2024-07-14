/* eslint-disable @cspell/spellchecker */
import localFont from 'next/font/local';

const notoSansJP = localFont({
  display: 'swap',
  src: './src/NotoSansJP-VariableFont.ttf',
  variable: '--font-noto-sans-jp'
});

const robotoMono = localFont({
  display: 'swap',
  src: './src/RobotoMono-VariableFont.ttf',
  variable: '--font-roboto-mono'
});

const fonts = `${notoSansJP.variable} ${robotoMono.variable}`;

export { fonts, notoSansJP };
