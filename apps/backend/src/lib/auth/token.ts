import { createId } from "@paralleldrive/cuid2";
import * as jwt from "jsonwebtoken";
import { tryit } from "radash";
import { coreConfig } from "src/core/config/config";
import { z } from "zod";

// Generate a token with the payload data
const generate = <T extends { id: string }>(
	data: T,
	type: "access" | "refresh",
) => {
	const now = Math.floor(Date.now() / 1000);
	const durationInSeconds =
		type === "access"
			? coreConfig.tokens.duration.accessToken.seconds
			: coreConfig.tokens.duration.refreshToken.seconds;

	const payload = {
		sub: data.id,
		aud: coreConfig.webUrl,
		iss: coreConfig.apiUrl,
		jti: createId(),
		iat: now,
		nbf: now,
		exp: now + durationInSeconds,
		extra: { ...data },
	};

	const token = jwt.sign(payload, coreConfig.jwtSecret);

	return token;
};

// Validate the token and return the decoded payload
const validate = (token: string) => {
	return new Promise((res, rej) => {
		return jwt.verify(token, coreConfig.jwtSecret, (err, decoded) => {
			if (err) return rej(err);
			return res(decoded);
		});
	});
};

const decode = async (token: string) => {
	return jwt.decode(token, { complete: true });
};

const schema = z.object({
	sub: z.string(),
	aud: z.string(),
	iss: z.string(),
	jti: z.string(),
	iat: z.number(),
	nbf: z.number(),
	exp: z.number(),
	extra: z.object({}),
});

const parse = (payload: unknown) => {
	return schema.safeParse(payload);
};

const validateAndParse = async (token: string) => {
	const [err, tokenValidated] = await tryit(validate)(token);
	if (err) return { success: false, data: null };

	const { success, data } = parse(tokenValidated);
	if (!success) return { success: false, data: null };

	return { success: true, data };
};

export const token = {
	generate,
	validate,
	decode,
	parse,
	validateAndParse,
	schema,
};
