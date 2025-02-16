import {
	authenticatedUserAdapterSchema,
	type AuthenticatedUserAdapter,
} from "@/schemas/adapters/auth/auth.adapter";
import { type LoginUserPayload } from "@/schemas/auth/auth.schema";
import {
	chatifyApi,
	genericRequest,
	useChatifyMutation,
	useChatifyQuery,
} from "./base";
import { CACHE_KEYS } from "./cache";

export const verifySession = async (abortController: AbortController) => {
	return await genericRequest({
		type: "no-authenticated",
		api: chatifyApi,
		method: "GET",
		path: "/auth/validate-session",
		signal: abortController.signal,
	});
};

export const useLoginMutation = () => {
	return useChatifyMutation<LoginUserPayload, AuthenticatedUserAdapter>({
		fetcher: async (payload) =>
			await genericRequest({
				type: "no-authenticated",
				method: "POST",
				api: chatifyApi,
				path: "/auth/login",
				data: payload,
			}),
		validator: (responseData) =>
			authenticatedUserAdapterSchema.safeParse(responseData),
	});
};

export const useGetUser = () => {
	return useChatifyQuery("/auth/me", [CACHE_KEYS.getUser]);
};
