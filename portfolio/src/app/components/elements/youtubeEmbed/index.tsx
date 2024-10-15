import type { YoutubeEmbedType } from './types';

const YoutubeEmbed: YoutubeEmbedType = (props) => {
  return (
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      allowFullScreen
      height='400'
      sandbox='allow-same-origin allow-scripts'
      src={`https://www.youtube.com/embed/${props.videoId}`}
      width='100%'
    />
  );
};

export { YoutubeEmbed };
