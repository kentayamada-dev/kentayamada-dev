import Image from 'next/image';
import type { CustomImageType } from './types';

const CustomImage: CustomImageType = (props) => {
  return (
    <div className='relative size-full'>
      <Image
        alt={props.alt}
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
        fill
        placeholder='blur'
        priority={props.priority ?? false}
        quality={100}
        sizes={props.sizes}
        src={props.src}
        style={props.style}
      />
    </div>
  );
};

export { CustomImage };
