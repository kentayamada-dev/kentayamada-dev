const getYouTubeVideoId = (url: string): string => {
  const regex =
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)(?<temp1>[a-zA-Z0-9_-]{11})(?:&[a-zA-Z0-9=_-]*)?/u;

  const match = regex.exec(url);

  return match?.[1] ?? '';
};

export { getYouTubeVideoId };
