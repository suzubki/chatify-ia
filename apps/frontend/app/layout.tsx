import { AppSidebar } from "@/components/modules/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const calibre = localFont({
	src: [
		{
			path: "/fonts/TestCalibre-Thin.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "/fonts/TestCalibre-Thinit.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "/fonts/TestCalibre-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "/fonts/TestCalibre-Regularit.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "/fonts/TestCalibre-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "/fonts/TestCalibre-Mediumit.otf",
			weight: "500",
			style: "italic",
		},
		{
			path: "/fonts/TestCalibre-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "/fonts/TestCalibre-Semiboldit.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "/fonts/TestCalibre-Bold.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-calibre",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${calibre.className} bg-gray-950 dark`}>
				<SidebarProvider>
					<AppSidebar />
					<div className="flex-1 bg-background">{children}</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
