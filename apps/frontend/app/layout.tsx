import type { Metadata } from "next";
import { mainFont } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
	title: "Chatify | IA Chatbot",
	description: "Chatify is an AI chatbot that helps you with your prompts, essays, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${mainFont.className} bg-background text-black tracking-tight`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
