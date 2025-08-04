import { Box, Text, Flex, Image } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Button, Header } from "~/modules/shared";
import ProfileInfo from "~/modules/shared/widgets/profile_info";
import swapitem from "~/assets/images/swap_item.png";
import { ArrowLeft, ArrowRight, Flag, X } from "lucide-react";
import { getStatusStyles } from "~/modules/util";
import { useParams } from "react-router";

export const SwapActivityInfo = () => {
  const { swapId } = useParams();

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
  const { borderColor, bg, textColor } = getStatusStyles("negotiating");

  return (
    <PageLayout>
      <Header
        title="Swap Details"
        description=" Initiated on May 15, 2025, 02:30 PM"
      />
      <Flex mt={8.5} alignItems={"center"} gap={10}>
        <Box
          bg="#F7F7F7"
          w="100%"
          p={2}
          border="1px solid #E9E9E9"
          borderRadius={"md"}
        >
          <Text fontWeight={500} mb={3}>
            Owner
          </Text>

          <ProfileInfo detail={sampleDetail} />
          <Box
            border="1px solid #E9E9E9"
            p={2.5}
            borderRadius={"lg"}
            alignItems="center"
            gap={4}
            bg="#fff"
          >
            <Text fontWeight={500} mb={2.5}>
              Item
            </Text>
            <Flex alignItems={"center"} gap={4}>
              <Box
                display="flex"
                height="61px"
                width="61px"
                borderRadius="full"
              >
                <Image
                  src={swapitem}
                  alt="Owner Avatar"
                  height="100%"
                  width="100%"
                />
              </Box>
              <Text fontWeight={500} mb={2.5}>
                Vintage Camera
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box gap={4} display="flex">
          <ArrowLeft size={40} color="#737373" />
          <ArrowRight size={40} color="#737373" />
        </Box>
        <Box
          bg="#F7F7F7"
          w="100%"
          p={2}
          border="1px solid #E9E9E9"
          borderRadius={"md"}
        >
          <Text fontWeight={500} mb={3}>
            Owner
          </Text>

          <ProfileInfo detail={sampleDetail} />
          <Box
            border="1px solid #E9E9E9"
            p={2.5}
            borderRadius={"lg"}
            alignItems="center"
            gap={4}
            bg="#fff"
          >
            <Text fontWeight={500} mb={2.5}>
              Item
            </Text>
            <Flex alignItems={"center"} gap={4}>
              <Box
                display="flex"
                height="61px"
                width="61px"
                borderRadius="full"
              >
                <Image
                  src={swapitem}
                  alt="Owner Avatar"
                  height="100%"
                  width="100%"
                />
              </Box>
              <Text fontWeight={500} mb={2.5}>
                Vintage Camera
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box
        border="1px solid #E9E9E9"
        p={2.5}
        borderRadius={"lg"}
        alignItems="center"
        gap={4}
        bg="#fff"
        my={8}
      >
        <Text fontWeight={500} mb={2.5}>
          Swap Status
        </Text>
        <Text
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width={"fit-content"}
          mb={2.5}
        >
          Negotiating
        </Text>
        <Box
          alignItems={"center"}
          justifyContent={"space-between"}
          display="flex"
          mb={2}
        >
          <Text fontWeight={500} fontSize={"13px"} color="#737373">
            Initiated on:
          </Text>
          <Text fontWeight={500} fontSize={"13px"} color="#222222">
            May 15, 2025, 02:30 PM
          </Text>
        </Box>
        <Box
          alignItems={"center"}
          justifyContent={"space-between"}
          display="flex"
        >
          <Text fontWeight={500} fontSize={"13px"} color="#737373">
            Last Activity
          </Text>
          <Text fontWeight={500} fontSize={"13px"} color="#222222">
            May 17, 2025, 09:45 AM
          </Text>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={5} justifyContent={"end"}>
        <Button bg="#F6F6F6" width={"fit-content"}>
          <X color="#1C274C" />
          <Text fontSize="14px" color="#737373">
            Close
          </Text>
        </Button>
        <Button bg="#FFF0EF" width={"fit-content"}>
          <Flag color="#E42222" size={16} />
          <Text fontSize="14px" color="#E42222">
            Flag Users
          </Text>
        </Button>
      </Box>
    </PageLayout>
  );
};
