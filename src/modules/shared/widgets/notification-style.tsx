import type { ReactNode } from "react";
import {
  Caution,
  Flag as FlagSvg,
  NewChat,
  NewSwap,
  OfferAccepted,
  OfferDeclined,
} from "~/assets/images";
import { Bell, Scale, Settings, User, Wallet } from "lucide-react";

type NotificationStyle = {
  bgColor: string;
  icon: ReactNode;
};

export const getNotificationStyle = (type?: string): NotificationStyle => {
  const normalized = type?.trim().toLowerCase() ?? "";

  switch (normalized) {
    case "swap":
      return { bgColor: "#EAF4FF", icon: <NewSwap /> };
    case "chat":
      return { bgColor: "#F3F0FF", icon: <NewChat /> };
    case "payment":
      return { bgColor: "#EEFFEB", icon: <OfferAccepted /> };
    case "withdrawal":
      return {
        bgColor: "#FFF4E8",
        icon: <Wallet size={18} color="#C45E00" />,
      };
    case "account":
      return { bgColor: "#FFFAEA", icon: <User size={18} color="#BB7E05" /> };
    case "security":
      return { bgColor: "#FFEFEF", icon: <Caution /> };
    case "system":
      return {
        bgColor: "#F3F3F3",
        icon: <Settings size={18} color="#5C5C5C" />,
      };
    case "dispute":
      return { bgColor: "#FFEFEF", icon: <Scale size={18} color="#E42222" /> };
    case "report":
      return { bgColor: "#FFF0EF", icon: <FlagSvg /> };
    default:
      return {
        bgColor: "#F7F7F7",
        icon: <Bell size={18} color="#737373" />,
      };
  }
};
