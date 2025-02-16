import { sessionStore } from "@/lib/states/session.state"
import { verifySession } from "@/services/api/auth.api"
import { usePathname, useRouter } from "next/navigation"
import { tryit } from "radash"
import { useEffect } from "react"

export const AuthSessionGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { state: sessionState, session, _hasHydrated } = sessionStore()

  /**
   * We are waiting for local storage to hydrate
   */
  if (!_hasHydrated) return null


  /**
   * Starts to check the session state
   */

  // If the session state is unknown, we are still checking the session state
  if (sessionState === "unknown") {
    return <InitialSessionState />
  }

  // If the session state is unauthenticated, we redirect to the login page
  if (sessionState === 'unauthenticated') {
    if (pathname.includes('/login')) return children

    return <UnauthenticatedState />
  }

  // If the session state is authenticated, we show the children
  if (sessionState === 'authenticated') {
    if (!session) return <InitialSessionState />

    return children
  }

  const _exhaustiveCheck: never = sessionState // If we reach this point, we have missed a case
}

const InitialSessionState = () => {
  const { session, login, logout } = sessionStore()
  const router = useRouter()

  useEffect(() => {
    let abortController: AbortController

    if (session) {
      abortController = new AbortController()
      const tryVerifySession = async () => {
        const [err, response] = await tryit(verifySession)(abortController)
        if (err) {
          logout()
          return
        }

        login(response.data)
      }

      tryVerifySession()
    } else {
      logout()
    }

    return () => {
      abortController?.abort()
    }
  }, [router, login, logout, session])

  return <>Checking Session...</>
}

const UnauthenticatedState = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return <>Redirecting to Login...</>
}