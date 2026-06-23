"use client";

import { Text, Flex, Box, Image } from "@chakra-ui/react";
import { Star } from "~/assets/images";
import { TableComponent } from "~/modules/shared/table";
import type { UsersData } from "~/types/base";
import {
  getStatusStyles,
  formatDateTime,
  getImageSrcWithFallback,
  createImageErrorHandler,
} from "~/modules/util";
import { OctagonAlert, ShieldCheck, UserRound } from "lucide-react";
import { MenuItem, Menu } from "~/modules/shared";
import { useNavigate } from "react-router";
import user from "~/assets/images/user.png";
import { useState } from "react";
import {
  UserSuspendConfirm,
  toUserSuspendSummary,
  type UserSuspendMode,
  type UserSuspendSummary,
} from "./user-suspend-confirm";


interface iProps {
  data?: any;
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

const UsersTable: React.FC<iProps> = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
  loading,
  emptyDescription,
}) => {
  const navigate = useNavigate();
  const [profileImageError, setProfileImageError] = useState(false);
  const [suspendMode, setSuspendMode] = useState<UserSuspendMode | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserSuspendSummary | null>(
    null
  );

  const openSuspendAction = (item: UsersData, mode: UserSuspendMode) => {
    setSelectedUser(toUserSuspendSummary(item));
    setSuspendMode(mode);
  };


  const handleViewProfile = (item: UsersData) => {
    if (item?.id) {
      navigate(`/profile/${item.id}`);
    }
  };

  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    profile: (item: UsersData) => 
      <Flex gap="4px" alignItems="center">

    <Box
    w="fit-content"
    display="flex"
    height="32px"
    width="32px"
    borderRadius="full"
    overflow="hidden"
  >
  <Image
      src={getImageSrcWithFallback(
        item.profilePicture || "",
        profileImageError || !item.profilePicture,
        user
      )}
      alt="Owner Avatar"
      borderRadius="full"
      height="100%"
      width="100%"
      onError={createImageErrorHandler(setProfileImageError)}
    />
  </Box><Text {...textProps}>{item.profile}</Text>
  </Flex>
  ,
    trustScore: (item: UsersData) => (
      <Flex alignItems="center" gap="4px">
        <Text {...textProps}>{item?.trustScore}</Text>
        <Star />
      </Flex>
    ),

    swaps: (item: UsersData) => <Text {...textProps}>{item?.swaps}</Text>,

    status: (item: UsersData) => {
      const { borderColor, bg, textColor } = getStatusStyles(
        item?.status?.toLowerCase()
      );
      return (
        <Text
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width="fit-content"
        >
          {item?.status}
        </Text>
      );
    },

    isSuspended: (item: UsersData) => {
      const suspended = item.isSuspended === true;
      const { borderColor, bg, textColor } = suspended
        ? getStatusStyles("flagged")
        : getStatusStyles("suspended");

      return (
        <Text
          border="1px solid"
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width="fit-content"
          fontWeight={500}
          fontSize="13px"
        >
          {suspended ? "true" : "false"}
        </Text>
      );
    },

    dateJoined: (item: UsersData) => (
      <Text {...textProps}>{formatDateTime(item?.dateJoined)}</Text>
    ),

    role: (item: UsersData) => (
      <Text
        {...textProps}
        py="5px"
        px="17px"
        borderRadius="37.74px"
        border="1px solid #EAEAEA"
        display={"flex"}
        width={"fit-content"}
      >
        {item?.role}
      </Text>
    ),

    action: (item: UsersData) => {
      const suspended = item.isSuspended === true;

      return (
        <Menu>
          <Box>
            <MenuItem
              label="View profile"
              icon={<UserRound size={20} />}
              onClick={() => handleViewProfile(item)}
              value="view"
              styleProps={{ color: "#222222" }}
            />
            {suspended ? (
              <MenuItem
                label="Unsuspend"
                icon={<ShieldCheck size={20} color="#007AFF" />}
                onClick={() => openSuspendAction(item, "unsuspend")}
                value="unsuspend"
                styleProps={{ color: "#007AFF" }}
              />
            ) : (
              <MenuItem
                label="Suspend"
                icon={<OctagonAlert size={20} color="#E42222" />}
                onClick={() => openSuspendAction(item, "suspend")}
                value="suspend"
                styleProps={{ color: "#E42222" }}
              />
            )}
          </Box>
        </Menu>
      );
    },
  };

  const columnOrder: (keyof UsersData)[] = [
    "profile",
    "trustScore",
    "swaps",
    "status",
    "isSuspended",
    "dateJoined",
    "role",
    "action",
  ];

  const columnLabels = {
    profile: "Profile",
    trustScore: "Trust Score",
    swaps: "Swap Completed",
    status: "Status",
    isSuspended: "Suspended",
    dateJoined: "Date Joined",
    role: "User Role",
    action: "",
  };

  return (
    <>
      <TableComponent<UsersData>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={loading}
        emptyDescription={emptyDescription}
      />
      <UserSuspendConfirm
        open={!!suspendMode}
        mode={suspendMode}
        user={selectedUser}
        onClose={() => {
          setSuspendMode(null);
          setSelectedUser(null);
        }}
      />
    </>
  );
};

export default UsersTable;
