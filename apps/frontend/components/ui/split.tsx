import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const Split: React.FC<Props> = ({ children, className, ...props }) => {
	return (
		<div className={cn("flex flex-row items-center", className)} {...props}>
			{children}
		</div>
	);
};
