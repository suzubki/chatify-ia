import type { Response } from "express";

const setResponseCookie = async (
	res: Response,
	{ name, token, duration }: { name: string; token: string; duration: number },
) => {
	res.cookie(name, token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		expires: new Date(Date.now() + duration),
	});
};

const clearResponseCookie = async (res: Response, name: string) => {
	res.cookie(name, undefined, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		expires: new Date(Date.now()),
	});
};

export const session = {
	setResponseCookie,
	clearResponseCookie,
};
