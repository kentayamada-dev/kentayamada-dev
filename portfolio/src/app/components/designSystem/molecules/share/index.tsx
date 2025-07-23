import Link from 'next/link';
import { CopyToClipboardButton } from '@/components/designSystem/atoms';
import { FbIcon, XIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import type { ShareType } from './types';

const Share: ShareType = (props) => {
  const { shareFbLabel, shareXLabel, urlCopyLabel } = dictionaries[props.locale].labels;

  return (
    <div className='bg-primary flex gap-5 rounded-lg p-3 text-white'>
      <CopyToClipboardButton label={urlCopyLabel} url={props.url} />
      <Link aria-label={shareXLabel} href={`https://twitter.com/intent/tweet?url=${props.url}`} title={shareXLabel}>
        <div className='link-primary hover-tertiary size-10 rounded-lg p-1'>
          <XIcon />
        </div>
      </Link>
      <Link aria-label={shareFbLabel} href={`https://www.facebook.com/sharer/sharer.php?u=${props.url}`} title={shareFbLabel}>
        <div className='link-primary hover-tertiary size-10 rounded-lg p-1'>
          <FbIcon />
        </div>
      </Link>
    </div>
  );
};

export { Share };
