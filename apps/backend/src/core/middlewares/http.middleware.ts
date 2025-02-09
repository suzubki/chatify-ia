import type { NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import { CustomLogger } from "../loggers/custom-logger.service";

export class HttpLoggerMiddleware implements NestMiddleware {
	private readonly logger = new CustomLogger();

	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl, body, query, params } = req;
		const start = Date.now();

		this.logger.debug(
			`[REQUEST] [${method}] ${originalUrl} - Body: ${JSON.stringify(
				body,
			)} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(params)}`,
			"HttpMiddleware",
		);

		res.on("finish", () => {
			const { statusCode } = res;
			const duration = Date.now() - start;

			if (statusCode >= 400) {
				this.logger.debug(
					`❌ [RESPONSE] [${method}] ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
					"HttpMiddleware",
				);
			} else {
				this.logger.debug(
					`✅ [RESPONSE] [${method}] ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
					"HttpMiddleware",
				);
			}
		});

		next();
	}
}
