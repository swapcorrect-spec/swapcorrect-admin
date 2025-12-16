import { Box, Flex, Image, Text } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Button, Header, Input } from "~/modules/shared";
import ProfileInfo from "~/modules/shared/widgets/profile_info";
import { Menu, MenuItem } from "~/modules/shared";
import swapitem from "~/assets/images/swap_item.png";

import {
  Book,
  Check,
  ChevronUp,
  Flag,
  OctagonAlert,
  TriangleAlert,
  X,
} from "lucide-react";

export const FlagReportDetails = () => {
  const sampleDetail = {
    listingId: "12-edsefffgg-90",
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
    <PageLayout>
      <Header
        title="Report Details"
        description="Swap report filed by bookworm"
      />
      <Box
        bg="#F7F7F7"
        w="100%"
        p={2}
        border="1px solid #E9E9E9"
        borderRadius={"md"}
        mt={7}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          mb={3}
          justifyContent={"space-between"}
        >
          <Text fontWeight={500}>Reported Entity</Text>
          <Text fontWeight={500} color="#737373">
            May 15, 2025, 02:30 PM
          </Text>
        </Box>

        <ProfileInfo detail={sampleDetail} />
      </Box>
      <Box
        bg="#F7F7F7"
        w="100%"
        p={2}
        border="1px solid #E9E9E9"
        borderRadius={"md"}
        mt={5}
      >
        <Text fontWeight={500} mb={3}>
          Reported Details
        </Text>

        <Box
          bg="#F7F7F7"
          w="100%"
          p={2}
          border="1px solid #E9E9E9"
          borderRadius={"md"}
        >
          <Text color="#737373" mb={1}>
            Reason
          </Text>
          <Text mb={5}>Suspicious behavior, potential scam attempt</Text>
          <Text color="#737373" mb={1}>
            Description
          </Text>
          <Text>
            This user has been sending suspicious messages trying to conduct
            transactions outside the platform. They've asked for direct payment
            methods multiple times.
          </Text>
        </Box>
      </Box>
      <Box
        bg="#F7F7F7"
        w="100%"
        p={2}
        border="1px solid #E9E9E9"
        borderRadius={"md"}
        my={5}
      >
        <Text fontWeight={500} mb={3}>
          Evidence
        </Text>
        <Flex gap={6}>
          <Box h="123px" w="147px">
            <Image
              width="100%"
              height="100%"
              src={swapitem}
              borderRadius="8px"
            />
          </Box>
          <Box h="123px" w="147px">
            <Image
              width="100%"
              height="100%"
              src={swapitem}
              borderRadius="8px"
            />
          </Box>
          <Box h="123px" w="147px">
            <Image
              width="100%"
              height="100%"
              src={swapitem}
              borderRadius="8px"
            />
          </Box>
        </Flex>
      </Box>
      <Box width="full" mb={5}>
        <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
          Admin note (Optional)
        </Text>
        <Input
          type="textarea"
          name="note"
          handleChange={() => console.log("Holla world!")}
          placeholder="Additional note"
          value="note"
        />
      </Box>
      <Box display={"flex"} justifyContent={"end"}>
        <Menu
          trigger={
            <Button bg="#222222" width={"fit-content"}>
              <Text color="#fff">Take Actions</Text> <ChevronUp />
            </Button>
          }
        >
          <Box>
            <MenuItem
              label="Mark resolved"
              icon={<Check size={20} />}
              onClick={() => console.log("Hello world!")}
              value="resolved"
              styleProps={{ color: "#222222" }}
            />
            <MenuItem
              label="Dismiss"
              icon={<X size={20} />}
              onClick={() => console.log("Hello world!")}
              value="dismiss"
              styleProps={{ color: "#222222" }}
            />
            <MenuItem
              label="Warn user"
              icon={<TriangleAlert size={20} />}
              onClick={() => console.log("View")}
              value="warn"
              styleProps={{ color: "#222222" }}
            />
            <MenuItem
              label="Suspend user"
              icon={<OctagonAlert size={20} />}
              onClick={() => console.log("View")}
              value="suspend"
              styleProps={{ color: "#222222" }}
            />
            <MenuItem
              label="Flag Swap"
              icon={<Flag size={20} />}
              onClick={() => console.log("Flag")}
              value="flag"
              styleProps={{ color: "#E42222" }}
            />
          </Box>
        </Menu>
      </Box>
    </PageLayout>
  );
};
