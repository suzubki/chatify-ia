import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from "@nestjs/common";
import { coreConfig } from "../config/config";
import { CustomLogger } from "../loggers/custom-logger.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new CustomLogger();

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status = exception.getStatus();

		if (status >= 400) {
			this.logger.error(`${exception.stack}`, "HttpExceptionFilter");
		}

		if (coreConfig.env === "development") {
			response.status(status).json({
				message: exception.message,
				statusCode: status,
				path: request.url,
				stackTrace: exception.stack,
			});
		} else {
			response.status(status).json({
				message: exception.message,
				statusCode: status,
			});
		}
	}
}
