import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { OctagonAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useSuspendUser, useUnsuspendUser } from "~/hooks/queries/user/user";
import { ConfirmDialog } from "~/modules/shared/ConfirmDialog";
import type { IGetGeneralUserInfoResponseData } from "~/hooks/queries/auth/auth.type";
import {
  formatDateTime,
  getImageSrcWithFallback,
  getStatusStyles,
  isUserSuspended,
} from "~/modules/util";
import type { UsersData } from "~/types/base";
import userFallback from "~/assets/images/user.png";

export type UserSuspendSummary = {
  userId: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  trustScore?: number;
  swaps?: number;
  dateJoined?: string;
  profilePicture?: string;
};

export type UserSuspendMode = "suspend" | "unsuspend";

type UserSuspendConfirmProps = {
  open: boolean;
  mode: UserSuspendMode | null;
  user: UserSuspendSummary | null;
  onClose: () => void;
  onSuccess?: () => void;
};

const UserSummaryCard: React.FC<{ user: UserSuspendSummary }> = ({ user }) => {
  const { borderColor, bg, textColor } = getStatusStyles(
    user.status?.toLowerCase() || "inactive"
  );

  return (
    <Box border="1px solid #E9E9E9" borderRadius="lg" p={4} bg="#FAFAFA">
      <Flex align="center" gap={3} mb={3}>
        <Box
          h="40px"
          w="40px"
          borderRadius="full"
          overflow="hidden"
          flexShrink={0}
        >
          <Image
            src={getImageSrcWithFallback(
              user.profilePicture || "",
              !user.profilePicture,
              userFallback
            )}
            alt={user.name}
            h="100%"
            w="100%"
          />
        </Box>
        <Box minW={0}>
          <Text
            fontSize="md"
            fontWeight={600}
            color="#222222"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {user.name}
          </Text>
          <Text
            fontSize="sm"
            color="#737373"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {user.email || "No email available"}
          </Text>
        </Box>
      </Flex>
      <Flex gap={2} flexWrap="wrap" mb={2}>
        {user.role && (
          <Text
            fontSize="xs"
            color="#222222"
            border="1px solid #E9E9E9"
            py="4px"
            px="10px"
            borderRadius="full"
          >
            {user.role}
          </Text>
        )}
        {user.status && (
          <Text
            fontSize="xs"
            border="1px solid"
            borderColor={borderColor}
            bg={bg}
            color={textColor}
            py="4px"
            px="10px"
            borderRadius="full"
          >
            {user.status}
          </Text>
        )}
      </Flex>
      <Flex gap={4} flexWrap="wrap">
        {user.trustScore != null && (
          <Text fontSize="sm" color="#737373">
            Trust score: {user.trustScore}
          </Text>
        )}
        {user.swaps != null && (
          <Text fontSize="sm" color="#737373">
            Swaps: {user.swaps}
          </Text>
        )}
        {user.dateJoined && (
          <Text fontSize="sm" color="#737373">
            Joined: {formatDateTime(user.dateJoined)}
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export const toUserSuspendSummary = (item: UsersData): UserSuspendSummary => ({
  userId: String(item.id),
  name: item.profile,
  email: item.email || "",
  role: item.role,
  status: item.status,
  trustScore: Number(item.trustScore) || 0,
  swaps: item.swaps,
  dateJoined: item.dateJoined,
  profilePicture: item.profilePicture,
});

export const toUserSuspendSummaryFromGeneralUser = (
  userData: IGetGeneralUserInfoResponseData["result"]
): UserSuspendSummary => {
  const suspended = isUserSuspended({
    isSuspended: userData.isSuspended,
    isSuspendUser: userData.isSuspendUser,
  });

  return {
    userId: userData.id,
    name: `${userData.firstName} ${userData.lastName}`.trim(),
    email: userData.email || "",
    role: userData.userRole?.[0],
    status: suspended ? "Suspended" : "Active",
    trustScore: userData.rating ?? 0,
    swaps: userData.swapCount ?? 0,
    dateJoined: userData.created,
    profilePicture: userData.profilePicture || "",
  };
};

export const UserSuspendConfirm: React.FC<UserSuspendConfirmProps> = ({
  open,
  mode,
  user,
  onClose,
  onSuccess,
}) => {
  const isSuspend = mode === "suspend";

  const { mutate: suspendUser, isPending: isSuspendPending } = useSuspendUser({
    onSuccess: (res: { displayMessage?: string }) => {
      toast.success(res?.displayMessage || "User suspended");
      onClose();
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  const { mutate: unsuspendUser, isPending: isUnsuspendPending } =
    useUnsuspendUser({
      onSuccess: (res: { displayMessage?: string }) => {
        toast.success(res?.displayMessage || "User unsuspended");
        onClose();
        onSuccess?.();
      },
      onError: (msg) => toast.error(msg),
    });

  const isPending = isSuspendPending || isUnsuspendPending;
  const hasEmail = !!user?.email?.trim();

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleConfirm = () => {
    if (!user?.email?.trim() || !mode) return;

    const payload = { email: user.email.trim() };

    if (mode === "suspend") {
      suspendUser(payload);
      return;
    }

    unsuspendUser(payload);
  };

  const dialogConfig = isSuspend
    ? {
        title: "Suspend user?",
        confirmLabel: "Suspend user",
        confirmBg: "#E42222",
        confirmHoverBg: "#c91e1e",
        icon: (
          <Box
            bg="#FFF0EF"
            p={3.5}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <OctagonAlert size={28} color="#E42222" strokeWidth={2} />
          </Box>
        ),
        description:
          "This user will be suspended and unable to access the platform until unsuspended.",
      }
    : {
        title: "Unsuspend user?",
        confirmLabel: "Unsuspend user",
        confirmBg: "#222222",
        confirmHoverBg: "#333333",
        icon: (
          <Box
            bg="#EDFFEA"
            p={3.5}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ShieldCheck size={28} color="#106104" strokeWidth={2} />
          </Box>
        ),
        description:
          "This user will regain access to the platform and their account will be active again.",
      };

  return (
    <ConfirmDialog
      open={open && !!mode && !!user}
      onClose={handleClose}
      title={dialogConfig.title}
      icon={dialogConfig.icon}
      confirmLabel={dialogConfig.confirmLabel}
      confirmBg={dialogConfig.confirmBg}
      confirmHoverBg={dialogConfig.confirmHoverBg}
      onConfirm={handleConfirm}
      isLoading={isPending}
      confirmDisabled={!hasEmail}
    >
      {user && (
        <Flex direction="column" gap={4}>
          <UserSummaryCard user={user} />
          {!hasEmail ? (
            <Text fontSize="sm" color="#E42222">
              This user has no email on record. Suspend/unsuspend cannot be
              completed.
            </Text>
          ) : (
            <Text fontSize="sm" color="#737373" lineHeight="tall">
              {dialogConfig.description}
            </Text>
          )}
        </Flex>
      )}
    </ConfirmDialog>
  );
};
