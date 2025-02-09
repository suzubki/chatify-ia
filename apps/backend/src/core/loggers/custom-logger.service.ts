import {
	ConsoleLogger,
	Injectable,
	LoggerService,
	LogLevel,
} from "@nestjs/common";

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
	constructor(context?: string) {
		super();
		this.setLogLevels(["warn", "error", "debug"]);
		this.setContext(context ?? "logger");
	}

	error(message: string, context?: any) {
		super.error(message, context);
	}

	warn(message: string, context?: any) {
		super.warn(message, context);
	}

	debug(message: unknown, context?: unknown): void {
		super.debug(message, context);
	}

	verbose(message: unknown, context?: unknown): void {
		super.verbose(message, context);
	}
}
