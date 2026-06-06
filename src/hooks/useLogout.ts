import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "~/config/auth";
import { PATHS } from "~/modules/_constants/paths";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const openLogoutModal = useCallback(() => setIsModalOpen(true), []);
  const closeLogoutModal = useCallback(() => setIsModalOpen(false), []);

  const confirmLogout = useCallback(() => {
    setIsLoggingOut(true);
    Auth.clearSession();
    queryClient.clear();
    setIsModalOpen(false);
    setIsLoggingOut(false);
    navigate(PATHS.LOGIN, { replace: true });
  }, [navigate, queryClient]);

  return {
    isModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  };
};
