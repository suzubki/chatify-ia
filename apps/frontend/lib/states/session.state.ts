import { LOCAL_STORAGE } from "@/core/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthSessionState = "unknown" | "authenticated" | "unauthenticated";
type UserSession = {
	id: string;
	email: string;
	name: string;
};

export interface AuthSessionStore {
	_hasHydrated: boolean;
	state: AuthSessionState;
	session: UserSession | null;

	login: (session: UserSession) => void;
	logout: () => void;
	_setHasHydrated: (state: boolean) => void;
}

export const sessionStore = create<AuthSessionStore>()(
	persist(
		(set) => ({
			_hasHydrated: false,
			state: "unknown",
			session: null,

			login: (session: UserSession) => {
				set({
					state: "authenticated",
					session,
				});
			},
			logout: () => {
				set({
					state: "unauthenticated",
					session: null,
				});
			},
			_setHasHydrated: (state: boolean) =>
				set({
					_hasHydrated: state,
				}),
		}),
		{
			name: LOCAL_STORAGE.SESSION,
			onRehydrateStorage: (state) => {
				return () => state._setHasHydrated(true);
			},
		},
	),
);
