import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { coreConfig } from "../config/config";

const environment = coreConfig.env;

export class SchemaValidationPipe implements PipeTransform {
	constructor(private schema: ZodSchema) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		try {
			const parsedValue = this.schema.parse(value);

			return parsedValue;
		} catch (error) {
			if (error instanceof ZodError) {
				if (environment === "development") {
					throw new BadRequestException("Validation failed from schema", {
						cause: error,
					});
				}

				throw new BadRequestException("Validation failed from schema");
			}

			throw new BadRequestException("Validation failed");
		}
	}
}
