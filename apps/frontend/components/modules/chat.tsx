"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Code2Icon,
	FileTextIcon,
	Globe,
	ImageIcon,
	LightbulbIcon,
	Mic,
	Pencil,
	Search,
} from "lucide-react";
import { useState } from "react";

export default function Chat() {
	const [message, setMessage] = useState("");

	const onDetectKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			console.log({ message });
		}
	};

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
							onChange={(e) => setMessage(e.target.value)}
							onKeyDown={onDetectKey}
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
				<div className="flex flex-wrap justify-center gap-4">
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<ImageIcon className="h-4 w-4 text-white" />
						Crea una imagen
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<LightbulbIcon className="h-4 w-4 text-white" />
						Propone ideas
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<Search className="h-4 w-4 text-white" />
						Analiza imágenes
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<Pencil className="h-4 w-4 text-white" />
						Ayúdame a escribir
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<Code2Icon className="h-4 w-4 text-white" />
						Genera código
					</Button>
					<Button
						variant="outline"
						className="bg-transparent text-muted-foreground border-gray-600 hover:bg-gray-800"
					>
						<FileTextIcon className="h-4 w-4 text-white" />
						Resumen un texto
					</Button>
				</div>

				{/* Footer text */}
				<p className="text-center text-sm text-gray-500">
					Cada una de las IA puede cometer errores. Comprueba la información
					importante.
				</p>
			</div>
		</div>
	);
}
