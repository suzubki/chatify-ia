import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { coreConfig } from "./core/config/config";
import { HttpExceptionFilter } from "./core/filters/http-exception.filter";
import { CustomLogger } from "./core/loggers/custom-logger.service";

const port = coreConfig.port ?? 4000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: coreConfig.webUrl,
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
		allowedHeaders: [
			"Content-Type",
			"Accept",
			"Authorization",
			"X-Requested-With",
			"Origin",
		],
	});
	app.use(cookieParser());
	app.useLogger(new CustomLogger());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.setGlobalPrefix("/api/v1");

	await app.listen(port);

	Logger.debug(
		`Starting application on PORT ${port}, URL ${await app.getUrl()}`,
		"Bootstrap",
	);
}
bootstrap();
