import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "~/context/auth-context";
import { useLogoutApi } from "~/hooks/queries/auth/auth";
import type { ILogoutResponse } from "~/hooks/queries/auth/auth.type";
import { PATHS } from "~/modules/_constants/paths";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { mutateAsync: logout } = useLogoutApi();

  const openLogoutModal = useCallback(() => setIsModalOpen(true), []);
  const closeLogoutModal = useCallback(() => {
    if (isLoggingOut) return;
    setIsModalOpen(false);
  }, [isLoggingOut]);

  const finishLogout = useCallback(() => {
    clearAuth();
    queryClient.clear();
    setIsModalOpen(false);
    setIsLoggingOut(false);
    navigate(PATHS.LOGIN, { replace: true });
  }, [clearAuth, navigate, queryClient]);

  const confirmLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const response = (await logout()) as ILogoutResponse;
      toast.success(
        response?.result || response?.displayMessage || "Logged out successfully"
      );
      finishLogout();
    } catch {
      toast.error("Failed to log out. Clearing your session anyway.");
      finishLogout();
    }
  }, [finishLogout, isLoggingOut, logout]);

  return {
    isModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  };
};
