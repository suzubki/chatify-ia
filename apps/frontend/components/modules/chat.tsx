"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Mic,
	ImageIcon,
	Globe,
	LightbulbIcon,
	Search,
	Pencil,
	MoreHorizontal,
} from "lucide-react";

export default function Chat() {
	return (
		<div className="min-h-screen bg-[#1E1F20] flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-3xl space-y-8">
				{/* Main heading */}
				<h1 className="text-2xl text-white text-center">
					¿Con qué puedo ayudarte?
				</h1>

				{/* Input area */}
				<Card className="bg-[#2A2B32] border-0">
					<div className="relative">
						<Input
							placeholder="Envía un mensaje a ChatGPT"
							className="bg-transparent border-0 text-white h-14 pl-4 pr-12"
						/>
						<div className="absolute right-0 top-0 h-full flex items-center gap-2 pr-4">
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
							>
								<Mic className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
							>
								<ImageIcon className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-400 hover:text-white"
							>
								<Globe className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</Card>

				{/* Action buttons */}
				<div className="flex flex-wrap justify-center gap-2">
					<Button
						variant="outline"
						className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
					>
						<ImageIcon className="mr-2 h-4 w-4" />
						Crea una imagen
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
					>
						<LightbulbIcon className="mr-2 h-4 w-4" />
						Propone ideas
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
					>
						<Search className="mr-2 h-4 w-4" />
						Analiza imágenes
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
					>
						<Pencil className="mr-2 h-4 w-4" />
						Ayúdame a escribir
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-gray-300 border-gray-600 hover:bg-gray-800"
					>
						<MoreHorizontal className="mr-2 h-4 w-4" />
						Más
					</Button>
				</div>

				{/* Footer text */}
				<p className="text-center text-sm text-gray-500">
					ChatGPT puede cometer errores. Comprueba la información importante.
				</p>
			</div>
		</div>
	);
}
