import type { YoutubeEmbedType } from './types';

const YoutubeEmbed: YoutubeEmbedType = (props) => {
  return (
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
      height='400'
      referrerPolicy='strict-origin-when-cross-origin'
      src={`https://www.youtube-nocookie.com/embed/${props.videoId}`}
      width='100%'
    />
  );
};

export { YoutubeEmbed };
