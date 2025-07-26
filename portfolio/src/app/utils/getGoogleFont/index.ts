const getGoogleFont = async (url: string): Promise<ArrayBuffer> => {
  const css = await (await fetch(url)).text();
  // eslint-disable-next-line @stylistic/wrap-regex
  const resource = /src: url\((?<url>.+)\) format\('(?<format>opentype|truetype)'\)/u.exec(css);
  const response = await fetch(resource?.[1] ?? '');

  return response.arrayBuffer();
};

export { getGoogleFont };
