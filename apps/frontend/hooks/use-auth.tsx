import { sessionStore } from "@/lib/states/session.state"

/**
 * Exports an auth to consume our session
 * We are calling this authentication hook in all our protected routes since we are using our Auth Guard
 * @returns {Object} session
 */
export const useAuth = () => {
  const session = sessionStore(store => store.session)
  if (!session) throw new Error("Session is not available, please ensure the Auth Guard is working")

  return { ...session }
}