// apps/web/api/hooks/useInitSession.ts
import { useCurrentUser } from "./useCurrentUser"

export const useInitSession = () => {
  useCurrentUser()
}
