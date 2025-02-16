import { coreConfig } from "@/core/config";
import {
	UndefinedInitialDataOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ZodError } from "zod";

export const makeApiUrl = (baseUrl: string, prefix?: string) => {
	return `${baseUrl}${prefix ?? ""}`;
};

export const chatifyServerUrl =
	coreConfig.server.chatify.urls[coreConfig.environment];

export const chatifyApi = axios.create({
	baseURL: makeApiUrl(chatifyServerUrl, coreConfig.server.chatify.prefixes.api),
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

/**
 * Generic request function to make requests to the chatifyApi
 * This function is used to make requests to over all the app
 * @param param0
 * @returns
 */
export const genericRequest = async ({
	type,
	method,
	api,
	path,
	data,
	signal,
}: {
	type: "authenticated" | "no-authenticated";
	api: AxiosInstance;
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	path: string;
	data?: unknown;
	signal?: AbortSignal;
}) => {
	return await api({
		url: path,
		method,
		data: method !== "GET" ? data : undefined,
		params: method === "GET" ? data : undefined,
		signal,
	});
};

/**
 * Custom hook to use a query with the chatifyApi
 * This is a wrapper around the useQuery hook from react-query
 * So we can track successful and failed requests
 *
 * @param url
 * @param queryKey
 * @param options
 * @returns
 */

export const useChatifyQuery = (
	url: string,
	queryKey: PropertyKey[],
	options?: UndefinedInitialDataOptions<AxiosResponse<any, any>>,
) => {
	return useQuery({
		queryKey,
		queryFn: () => chatifyApi.get(url),
		...options,
	});
};

/**
 *  Custom hook to use a mutation with the chatifyApi
 * This is a wrapper around the useMutation hook from react-query
 * So we can track successful and failed requests
 *
 * @param param0 - fetcher: function that will be called to make the request
 * @param param1 - validator: function that will be called to validate the response
 * @returns
 */

export const useChatifyMutation = <
	TData extends Record<string, unknown>,
	TAdaptor,
>({
	fetcher,
	validator,
}: {
	fetcher: (payload: TData) => Promise<AxiosResponse<TAdaptor, any>>;
	validator?: (responseData: unknown) =>
		| {
				success: true;
				data: TAdaptor;
		  }
		| {
				success: false;
				error: ZodError;
		  };
}) => {
	const mutation = useMutation({
		mutationFn: async (data: TData) => await fetcher(data),
		onSuccess: (data) => {
			// Time to adapt the data from backend
			if (validator) {
				const adaptorValidation = validator(data.data);

				if (!adaptorValidation.success) {
					console.error(adaptorValidation.error);
				} else {
					data.data = adaptorValidation.data;
				}
			}
		},
	});

	return mutation;
};
