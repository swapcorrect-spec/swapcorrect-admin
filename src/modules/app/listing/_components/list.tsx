import { Box, Text, Image } from "@chakra-ui/react";
import { BadgeInfo, Flag, MessageCircleMore, UserRound, X } from "lucide-react";
import { Approve } from "~/assets/images";
import MomentAgo from "~/components/moment-ago";
import { Dialog, Menu, MenuItem } from "~/modules/shared";
import { getStatusStyles } from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import swapitem from "~/assets/images/swap_item.png";
import user from "~/assets/images/user.png";
import SwapDetails from "./swap-details";
import { useMemo, useState } from "react";

interface iList {
  item: SwapDetailsProps;
}

const List: React.FC<iList> = ({ item }) => {
  const [openSwapDetails, setOpenSwapDetails] = useState<boolean>(false);

  const onOpenChange = () => {
    setOpenSwapDetails((prev) => !prev);
  };

  const { borderColor, bg, textColor } = getStatusStyles(
    item.status?.toLowerCase()
  );

  const MENULIST = useMemo(
    () => [
      {
        label: "Swap Details",
        icon: <BadgeInfo size={20} />,
        onClick: () => onOpenChange(),
        value: "details",
        style: { color: "#007AFF" },
      },
      {
        label: "Message Owner",
        icon: <MessageCircleMore size={20} />,
        onClick: () => console.log("Message"),
        value: "message",
        style: { color: "#222222" },
      },
      {
        label: "View Owner’s profile",
        icon: <UserRound size={20} />,
        onClick: () => console.log("View"),
        value: "message",
        style: { color: "#222222" },
      },
      {
        label: "Flag Listing",
        icon: <Flag size={20} />,
        onClick: () => console.log("Flag"),
        value: "message",
        style: { color: "#E42222" },
      },
    ],
    [item]
  );

  const sampleDetail = {
    name: "iPhone 14 Pro",
    condition: "Like New",
    price: 850,
    itemUrl: "https://example.com/images/iphone14pro.png",
    category: "Electronics",
    status: "Pending",
    description: "A barely used iPhone 14 Pro, 256GB, Deep Purple.",
    location: "Lagos, Nigeria",
    dateListed: "May 5, 2025",
    datePosted: "May 5, 2025",
    edited: "May 5, 2025",
    requestedInExchange: [{ name: "Samsung Galaxy S23" }],
    owner: "Wisdom Apavie",
    ownerAvatar: "https://example.com/images/avatar.png",
    rating: 4.8,
    swap: {
      total: 12,
    },
  };

  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px" mb="24px">
        <Box h="100px" w="100px">
          <Image width="100%" height="100%" src={swapitem} borderRadius="8px" />
        </Box>
        <Box>
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="14px">
            {item.name}
          </Text>
          <Box mb="8px" display="flex" gap="25px">
            <Text
              fontSize="13px"
              color="#222222"
              border="1px solid #E9E9E9"
              p="7.5px 9px"
              borderRadius="37.74px"
            >
              {item.category}
            </Text>
            <Box display="flex" alignItems="center" gap="12px">
              <Box h="32px" w="32px" borderRadius={"full"} bg="#CCC1F0">
                <Image width="100%" height="100%" src={user} />
              </Box>
              <Text fontSize="14px" color="#737373" fontWeight={500}>
                {item.owner}
              </Text>
            </Box>
          </Box>
          <Text fontSize="14px" color="#737373">
            <MomentAgo createdAt={item.dateListed} />
          </Text>
        </Box>
        <Box ml="auto">
          <Text
            textAlign="center"
            fontWeight={500}
            fontSize={"13px"}
            borderColor={borderColor}
            bg={bg}
            color={textColor}
            py="5px"
            px="17px"
            borderRadius="37.74px"
          >
            {item.status}
          </Text>
        </Box>
      </Box>

      <Box
        width="100%"
        borderTop="1px solid #EAEAEA"
        p="20px"
        pb="10px"
        display="flex"
        alignItems="center"
      >
        {item.status?.toLowerCase() === "pending" && (
          <Box display="flex" alignItems="center" gap="38px">
            <Box display="flex" alignItems="center" gap="16px">
              <Approve />
              <Text fontSize="14px" color="#68CC58">
                Approve
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="16px">
              <X color="#E42222" size={16} />
              <Text fontSize="14px" color="#E42222">
                Reject
              </Text>
            </Box>
          </Box>
        )}
        <Box ml="auto">
          <Menu>
            <Box>
              {MENULIST.map((item) => (
                <MenuItem
                  key={item.value}
                  icon={item.icon}
                  onClick={item.onClick}
                  value={item.value}
                  label={item.label}
                  styleProps={item.style}
                />
              ))}
            </Box>
          </Menu>
        </Box>
      </Box>
      <Dialog
        open={openSwapDetails}
        onOpenChange={onOpenChange}
        size="lg"
        style={{
          right: 0,
          left: "auto",
          top: 0,
          bottom: 0,
          position: "fixed",
          height: "100vh",

          margin: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-end",
        }}
      >
        <SwapDetails detail={sampleDetail} />
      </Dialog>
    </Box>
  );
};

export default List;
