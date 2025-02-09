import { AuthModule } from "@/auth/auth.module";
import { UserModule } from "@/user/user.module";
import { DrizzlePostgresModule } from "@knaadh/nestjs-drizzle-postgres";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CustomLoggerModule } from "./core/loggers/custom-logger.module";
import { HttpLoggerMiddleware } from "./core/middlewares/http.middleware";
import { dbConfig } from "./database";
import * as schema from "./database/schema";

@Module({
	imports: [
		DrizzlePostgresModule.register({
			tag: dbConfig.connectionTag,
			postgres: {
				url: dbConfig.databaseUrl,
			},
			config: { schema, logger: true },
		}),
		CustomLoggerModule,
		UserModule,
		AuthModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggerMiddleware).forRoutes("*");
	}
}
