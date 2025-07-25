const getGoogleFont = async (font: string, text: string, weight: number): Promise<ArrayBuffer> => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  // eslint-disable-next-line @stylistic/wrap-regex
  const resource = /src: url\((?<url>.+)\) format\('(?<format>opentype|truetype)'\)/u.exec(css);
  const response = await fetch(resource?.[1] ?? '');

  return response.arrayBuffer();
};

export { getGoogleFont };
