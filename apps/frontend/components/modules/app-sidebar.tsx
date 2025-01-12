"use client";

import * as React from "react";
import Image from "next/image";
import { Book, Flag, FolderGit2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	const [showFeature, setShowFeature] = React.useState(true);

	return (
		<Sidebar className="bg-black border-r-0">
			<SidebarHeader className="p-4 flex justify-between items-center">
				<Image
					src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8RXbkcux5EtLlB42E5KNc0hW287KaJ.png"
					alt="Logo"
					width={32}
					height={32}
					className="opacity-90"
				/>
				<Button variant="ghost" size="icon" className="text-white opacity-90">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-5"
					>
						<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
						<line x1="9" x2="15" y1="3" y2="3" />
						<line x1="9" x2="15" y1="21" y2="21" />
						<line x1="3" x2="3" y1="9" y2="15" />
						<line x1="21" x2="21" y1="9" y2="15" />
					</svg>
					<span className="sr-only">Toggle Sidebar</span>
				</Button>
			</SidebarHeader>

			<SidebarContent className="px-2">
				<Button
					variant="ghost"
					className="w-full justify-start text-white mb-6 h-12 text-lg hover:bg-white/10"
				>
					New Chat
				</Button>

				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="text-white hover:bg-white/10 gap-4"
						>
							<a href="/library">
								<Book className="size-5" />
								<span>Library</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="text-white hover:bg-white/10 gap-4"
						>
							<a href="/projects">
								<FolderGit2 className="size-5" />
								<span>Projects</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="text-white hover:bg-white/10 gap-4"
						>
							<a href="/feedback">
								<Flag className="size-5" />
								<span>Feedback</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="mt-auto p-4">
				{showFeature && (
					<div className="mb-4 relative rounded bg-white/5 p-4">
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 top-2 text-white/70 hover:text-white hover:bg-transparent"
							onClick={() => setShowFeature(false)}
						>
							<X className="size-4" />
							<span className="sr-only">Close</span>
						</Button>
						<h3 className="text-lg font-medium text-white mb-2">New Feature</h3>
						<p className="text-white/70">
							You can now create environment variables directly from v0
						</p>
					</div>
				)}

				<div className="flex items-center gap-3 p-3 rounded hover:bg-white/5 cursor-pointer group transition-colors">
					<div className="size-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500" />
					<div className="flex-1 min-w-0">
						<div className="truncate text-white text-sm">
							guilleetoledo-gmail...
						</div>
						<div className="text-white/40 text-sm">Free</div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="size-5 text-white/40 group-hover:text-white transition-colors"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
