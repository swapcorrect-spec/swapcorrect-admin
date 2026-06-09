import { useInactivityLogout } from "~/hooks/useInactivityLogout";

export const SessionManager = () => {
  useInactivityLogout();
  return null;
};
