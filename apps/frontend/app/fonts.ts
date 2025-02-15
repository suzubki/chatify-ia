import localFont from "next/font/local";

export const calibreFont = localFont({
	src: [
		{
			path: "./fonts/TestCalibre-Thin.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/TestCalibre-Thinit.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "./fonts/TestCalibre-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/TestCalibre-Regularit.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/TestCalibre-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/TestCalibre-Mediumit.otf",
			weight: "500",
			style: "italic",
		},
		{
			path: "./fonts/TestCalibre-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/TestCalibre-Semiboldit.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "./fonts/TestCalibre-Bold.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-calibre",
});
