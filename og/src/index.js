import satori from "satori";

async function loadGoogleFont(font, text) {
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
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

export default {
	async fetch(request, env, ctx) {

		const { searchParams } = new URL(request.url);

		const readArticle = "Read Article";
		const date = searchParams.get("date")?.slice(0, 50) ?? "Default Date";
		const title = searchParams.get("title")?.slice(0, 100) ?? "Default Title";
		const subtitle =
			searchParams.get("subtitle")?.slice(0, 200) ?? "Default Subtitle";
		const background = hexToRgba(
			searchParams.get("background")?.slice(0, 50) ?? "0080FF"
		);

		const svg = await satori(
			{
				type: "div",
				props: {
					style: {
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						background: background,
						padding: "1rem",
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
												backgroundColor: "blue",
											},
										},
									},
									{
										type: "div",
										props: {
											style: {
												fontSize: "0.8rem",
												fontWeight: "normal",
												color: "#314158",
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
									fontSize: "1.2rem",
									fontWeight: "bold",
									marginTop: "0.5rem",
									color: "#1d293d",
								},
								children: title,
							},
						},
						{
							type: "div",
							props: {
								style: {
									fontSize: "0.8rem",
									fontWeight: "normal",
									marginTop: "0.5rem",
									color: "#314158",
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
												color: "blue",
												fontWeight: "bold",
											},
											children: "Read Article",
										},
									},
									{
										type: "div",
										props: {
											style: {
												border: "solid blue",
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
						name: "Open+Sans",
						data: await loadGoogleFont(
							"Open+Sans",
							`${date}${title}${subtitle}${readArticle}`
						),
						style: "normal",
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
