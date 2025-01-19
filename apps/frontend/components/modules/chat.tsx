"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Code2Icon,
	FileTextIcon,
	ImageIcon,
	LightbulbIcon,
	Pencil,
	Search,
} from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";

export default function Chat() {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [message, setMessage] = useState("");

	const onInputChange = (e: React.ChangeEvent<HTMLDivElement>) => {
		const parsedValue = e.currentTarget.textContent || "";

		setMessage(parsedValue);
		if (textareaRef.current) textareaRef.current.value = parsedValue;
	};

	const onDetectKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
				<Card className="bg-[#2A2B32] relative border-0">
					<div className="relative overflow-hidden">
						<Textarea
							ref={textareaRef}
							placeholder="Envía un mensaje a ChatGPT"
							className="hidden bg-transparent border-0 text-white h-14 pl-4 pr-16 w-full resize-none"
							rows={3}
							aria-hidden={false}
						/>
						<div
							className="bg-transparent rounded-xl min-h-[40px] border-0 text-white p-4 pr-16 ring-none outline-none"
							contentEditable
							onInput={onInputChange}
							onKeyDown={onDetectKey}
						/>
						{message === "" && (
							<span className="block absolute left-4 top-4 text-gray-400">
								Envia un mensaje a Chatify IA...
							</span>
						)}
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
