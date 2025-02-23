import { AppSidebar } from "@/components/modules/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

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
		<>
			<SidebarProvider>
				<AppSidebar />
				<div className="flex-1 bg-background">{children}</div>
			</SidebarProvider>
		</>
	);
}
