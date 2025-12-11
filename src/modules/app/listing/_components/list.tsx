import { Box, Text, Image } from "@chakra-ui/react";
import { BadgeInfo, Flag, MessageCircleMore, UserRound, X } from "lucide-react";
import { Approve } from "~/assets/images";
import MomentAgo from "~/components/moment-ago";
import { Dialog, Menu, MenuItem } from "~/modules/shared";
import { getStatusStyles, createImageErrorHandler, getImageSrcWithFallback } from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import swapitem from "~/assets/images/swap_item.png";
import user from "~/assets/images/user.png";
import ListingDetails from "./listing-details";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface iList {
  item: SwapDetailsProps;
}

const List: React.FC<iList> = ({ item }) => {
  const navigate = useNavigate();
  const [openSwapDetails, setOpenSwapDetails] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);
  const [ownerImageError, setOwnerImageError] = useState(false);

  const onOpenChange = () => {
    setOpenSwapDetails((prev) => !prev);
  };

  const handleViewOwnerProfile = () => {
    if (item.ownerId) {
      navigate(`/profile/${item.ownerId}`);
    }
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
      // {
      //   label: "Message Owner",
      //   icon: <MessageCircleMore size={20} />,
      //   onClick: () => {},
      //   value: "message",
      //   style: { color: "#222222" },
      // },
      {
        label: "View Owner's profile",
        icon: <UserRound size={20} />,
        onClick: () => handleViewOwnerProfile(),
        value: "view",
        style: { color: "#222222" },
      },
      {
        label: "Flag Listing",
        icon: <Flag size={20} />,
        onClick: () => {},
        value: "flag",
        style: { color: "#E42222" },
      },
    ],
    [item]
  );


  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px" mb="24px">
        <Box h="100px" w="100px" position="relative" borderRadius="8px" overflow="hidden" flexShrink={0}>
          {item.isVideo ? (
            <Box
              as="video"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              {...({ src: item.itemUrl || swapitem, controls: false, muted: true } as any)}
            />
          ) : item.mediaType === "Document" ? (
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="#F4F4F4"
              borderRadius="8px"
              border="1px solid #EAEAEA"
            >
              <Text fontSize="10px" color="#737373" textAlign="center" px={2}>
                Document
              </Text>
            </Box>
          ) : (
            <Image
              width="100%"
              height="100%"
              src={getImageSrcWithFallback(item.itemUrl || "", imageError || !item.itemUrl, swapitem)}
              borderRadius="8px"
              alt={item.name}
              onError={createImageErrorHandler(setImageError)}
            />
          )}
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
              <Box h="32px" w="32px" borderRadius={"full"} bg="#CCC1F0" overflow="hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={getImageSrcWithFallback(item.ownerAvatar || "", ownerImageError || !item.ownerAvatar, user)}
                  alt={item.owner}
                  onError={createImageErrorHandler(setOwnerImageError)}
                />
              </Box>
              <Text fontSize="14px" color="#737373" fontWeight={500}>
                {item.owner}
              </Text>
            </Box>
          </Box>
          <Text fontSize="14px" color="#737373">
            {item.dateListed ? (
              <MomentAgo createdAt={item.dateListed} />
            ) : (
              "Date not available"
            )}
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
        <ListingDetails listingId={item.listingId || ""} />
      </Dialog>
    </Box>
  );
};

export default List;
