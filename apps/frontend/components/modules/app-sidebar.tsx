"use client";

import { EditIcon, PanelLeftClose, PlusIcon, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "@/components/ui/sidebar";
import type { Prompt } from "@chatify/types";
import { useState } from "react";
import { Stack } from "../ui/stack";
import { generateId } from "@/lib/unique";
import { Split } from "../ui/split";

export function AppSidebar() {
	const [prompts, setPrompts] = useState<Prompt[]>([]);
	const [showFeature, setShowFeature] = useState(true);

	const addPrompt = () => {
		const newPrompt: Prompt = {
			id: generateId(),
			aiAgent: "claude",
			message: "Hola, ¿",
			deleted: false,

			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "sdwe",
			updatedBy: "",
			deletedAt: null,
			deletedBy: null,
		};

		setPrompts((prev) => [...prev, newPrompt]);
	};

	return (
		<Sidebar className="bg-black border-r-0">
			<SidebarHeader className="p-4 flex justify-between ">
				<Split className="w-full justify-between">
					<Button variant="ghost" size="icon" className="text-white opacity-90">
						<PanelLeftClose className="size-5" />
						<span className="sr-only">Toggle Sidebar</span>
					</Button>
					<Split className="gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="text-white opacity-90"
						>
							<Search className="size-5" />
							<span className="sr-only">Search prompt</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white opacity-90"
						>
							<EditIcon className="size-5" />
							<span className="sr-only">Toggle Sidebar</span>
						</Button>
					</Split>
				</Split>
				<h1 className="text-white font-semibold text-2xl tracking-tight">
					Chatify - IA
				</h1>
			</SidebarHeader>

			<SidebarContent className="px-2 text-white gap-4">
				<Button
					variant="outline"
					className="py-5 justify-start text-base"
					onClick={() => addPrompt()}
				>
					<PlusIcon className="w-5 h-5" /> New Chat
				</Button>
				<Stack className="gap-1">
					{prompts.map((prompt) => (
						<div
							key={prompt.id}
							className="text-lg hover:bg-white/5 px-4 py-2 rounded-lg cursor-pointer"
						>
							<p>Estoe es un prompt</p>
						</div>
					))}
				</Stack>
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
						<div className="truncate text-white ">guilleetoledo-gmail...</div>
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
