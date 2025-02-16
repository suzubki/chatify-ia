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
