import satori from "satori";

async function loadGoogleFont(font, text, wght) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${wght}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource && resource[1]) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

function hexToRgba(hex) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, 0.1)`;
}

const FONT_NAME = "Open+Sans";
const FONT_BOLD = 700;
const FONT_MEDIUM = 500;
const FONT_STYLE = "normal";

export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);

    const readArticle = "Read Article";
    const date = searchParams.get("date")?.slice(0, 50) ?? "Default Date";
    const title = searchParams.get("title")?.slice(0, 100) ?? "Default Title";
    const subtitle =
      searchParams.get("subtitle")?.slice(0, 200) ?? "Default Subtitle";
    const isDark = searchParams.get("mode") === "dark";

    const accentColor = isDark ? "#0481fb" : "#0969da";
    const textColor = isDark ? "#d1d7e0" : "#1f2328";

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundImage: "linear-gradient(#4184e41a, #4184e41a)",
            padding: "1rem",
            borderRadius: "0.375rem",
            borderColor: "#4184e466",
            borderStyle: "solid",
            borderWidth: "0.0625rem",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  alignItems: "center",
                  columnGap: "0.5rem",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        height: "0.8rem",
                        width: "0.2rem",
                        backgroundColor: accentColor,
                      },
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        fontWeight: FONT_MEDIUM,
                        fontSize: "0.8rem",
                        color: textColor,
                      },
                      children: date,
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontWeight: FONT_BOLD,
                  fontSize: "1.2rem",
                  marginTop: "0.5rem",
                  color: textColor,
                },
                children: title,
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontWeight: FONT_MEDIUM,
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                  color: textColor,
                },
                children: subtitle,
              },
            },
            {
              type: "div",
              props: {
                style: {
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        fontSize: "0.8rem",
                        color: accentColor,
                        fontWeight: FONT_BOLD,
                      },
                      children: readArticle,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        border: `solid ${accentColor}`,
                        borderWidth: "0 2.5px 2.5px 0",
                        padding: "3px",
                        transform: "rotate(-45deg)",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        width: 600,
        height: 150,
        fonts: [
          {
            name: FONT_NAME,
            data: await loadGoogleFont(
              FONT_NAME,
              `${date}${title}${subtitle}${readArticle}`,
              FONT_BOLD
            ),
            weight: FONT_BOLD,
            style: FONT_STYLE,
          },
          {
            name: FONT_NAME,
            data: await loadGoogleFont(
              FONT_NAME,
              `${date}${title}${subtitle}${readArticle}`,
              FONT_MEDIUM
            ),
            weight: FONT_MEDIUM,
            style: FONT_STYLE,
          },
        ],
      }
    );

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  },
};
