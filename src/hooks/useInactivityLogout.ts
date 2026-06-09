import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Auth } from "~/config/auth";
import { PATHS } from "~/modules/_constants/paths";

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;

const PUBLIC_ROUTES = new Set([PATHS.LOGIN, PATHS.FORGOT_PASSWORD]);

const ACTIVITY_EVENTS = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
] as const;

export const useInactivityLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoggedOutRef = useRef(false);

  const clearInactivityTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const logoutDueToInactivity = useCallback(() => {
    if (hasLoggedOutRef.current) return;

    hasLoggedOutRef.current = true;
    clearInactivityTimer();
    Auth.clearSession();
    queryClient.clear();
    toast.info("You were logged out after 5 minutes of inactivity.");
    navigate(PATHS.LOGIN, { replace: true });
  }, [clearInactivityTimer, navigate, queryClient]);

  const resetInactivityTimer = useCallback(() => {
    if (hasLoggedOutRef.current) return;
    if (!Auth.isAuthenticated() || PUBLIC_ROUTES.has(location.pathname)) {
      clearInactivityTimer();
      return;
    }

    clearInactivityTimer();
    timeoutRef.current = setTimeout(
      logoutDueToInactivity,
      INACTIVITY_TIMEOUT_MS,
    );
  }, [clearInactivityTimer, location.pathname, logoutDueToInactivity]);

  useEffect(() => {
    if (!Auth.isAuthenticated() || PUBLIC_ROUTES.has(location.pathname)) {
      clearInactivityTimer();
      return;
    }

    hasLoggedOutRef.current = false;

    const onActivity = () => resetInactivityTimer();

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, onActivity, { passive: true });
    });

    resetInactivityTimer();

    return () => {
      clearInactivityTimer();
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });
    };
  }, [clearInactivityTimer, location.pathname, resetInactivityTimer]);
};
