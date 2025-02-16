import { cn } from "@/lib/utils";
import React from "react";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const defaultClassName = 'text-sm text-red-500 font-regular leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'

const ErrorMessage = React.forwardRef<HTMLSpanElement, ErrorMessageProps>(({ className, children }, ref) => (
  <span ref={ref} role="alert" className={cn(defaultClassName, className)}>{children}</span>
))
ErrorMessage.displayName = "ErrorMessage"

export { ErrorMessage };
