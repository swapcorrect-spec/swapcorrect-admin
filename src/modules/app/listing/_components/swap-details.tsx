import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  ChevronLeft,
  CircleQuestionMark,
  Tag,
  Dot,
  CircleArrowRight,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { Approve, Star } from "~/assets/images";
import { getStatusStyles } from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import swapitem from "~/assets/images/swap_item.png";
import user from "~/assets/images/user.png";
import { Button, Input } from "~/modules/shared";
interface iSwapDetails {
  detail: SwapDetailsProps;
}

const SwapDetails: React.FC<iSwapDetails> = ({ detail }) => {
  const { borderColor, bg, textColor } = getStatusStyles(
    detail.status?.toLowerCase()
  );

  return (
    <Box>
      <Flex gap={1} alignItems="center" mb={6}>
        <ChevronLeft size={14} color="#737373" />
        <Text fontSize="xl" fontWeight="medium" color="#222222">
          {detail.name}
        </Text>
        <Text fontSize="xl" fontWeight="medium" color="#007AFF" ml="auto">
          ${detail.price} Est.
        </Text>
      </Flex>
      <Image height={412} width={586} borderRadius={"lg"} src={swapitem} />
      <Box my={8} display="flex" gap={4} alignItems="center">
        <Tag size={16} />
        <Text
          textAlign="center"
          fontWeight={500}
          fontSize={"13px"}
          border={"1px solid #E9E9E9"}
          color={"#222222"}
          py="5px"
          px="17px"
          borderRadius="37.74px"
        >
          {detail.category}
        </Text>
        <Text
          textAlign="center"
          fontWeight={500}
          fontSize={"13px"}
          borderColor={borderColor}
          border="1px solid"
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
        >
          {detail.status}
        </Text>
      </Box>
      <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
        Description
      </Text>
      <Text fontSize="14px" color="#737373" mb={6}>
        {detail.description}
      </Text>
      <Flex
        border="1px solid #E9E9E9"
        py="22px"
        px="45px"
        borderRadius={3}
        mb={6}
      >
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Condition
          </Text>
          <Text fontSize="14px" color="#737373">
            {detail.condition}
          </Text>
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Location
          </Text>
          <Text fontSize="14px" color="#737373">
            {detail.location}
          </Text>
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Date Listed
          </Text>
          <Text fontSize="14px" color="#737373">
            {detail.dateListed}
          </Text>
        </Box>
      </Flex>
      <Box bg="#F7F7F7" p={2} mb={6}>
        <Text fontSize="13px" fontWeight="500" mb={3}>
          Requested in Exchange
        </Text>
        <Flex gap={4} flexDirection="column">
          {detail.requestedInExchange.map((item: any, index: number) => (
            <Text
              color="#737373"
              fontSize="12px"
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <CircleQuestionMark size={14} color="#222222" />
              {item.name}
            </Text>
          ))}
        </Flex>
      </Box>
      <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
        Owner
      </Text>

      <Flex
        border="1px solid #E9E9E9"
        py="21px"
        px="12px"
        borderRadius={"lg"}
        mb={6}
        alignItems="center"
        gap={4}
      >
        <Box
          w="fit-content"
          display="flex"
          height="62px"
          width="62px"
          borderRadius="full"
        >
          <Image
            src={user}
            alt="Owner Avatar"
            borderRadius="full"
            height="100%"
            width="100%"
          />
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="12px">
            {detail.owner}
          </Text>
          <Text
            fontSize="14px"
            color="#737373"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {detail.rating} <Star /> <Dot size={"4px"} />
            {detail.swap.total} swaps
          </Text>
        </Box>
        <Link to="">
          <Text
            w="fit-content"
            textAlign="center"
            fontWeight={500}
            fontSize={"13px"}
            border={"1px solid #E9E9E9"}
            color={"#222222"}
            py="5px"
            px="17px"
            borderRadius="37.74px"
            display="flex"
            alignItems="center"
            gap={2}
            whiteSpace="nowrap"
          >
            View Profile
            <CircleArrowRight size={24} color="#ffffff" fill="#222222" />
          </Text>
        </Link>
      </Flex>
      <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
        Listing Timeline
      </Text>
      <Flex flexDirection="column" gap={6}>
        <Box display="flex" gap={4}>
          <Check color="#68CC58" size={14} />
          <Box>
            <Text fontSize="16px" color="#222222" fontWeight="500" mb="6px">
              Posted
            </Text>
            <Text fontSize="14px" color="#737373">
              {detail.datePosted}
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap={4}>
          <Check color="#68CC58" size={14} />
          <Box>
            <Text fontSize="16px" color="#222222" fontWeight="500" mb="6px">
              Edited
            </Text>
            <Text fontSize="14px" color="#737373">
              {detail.edited}
            </Text>
          </Box>
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
        {detail.status?.toLowerCase() === "pending" && (
          <Box display="flex" alignItems="center" gap="24px" width="full">
            <Button rounded="2xl" bg="#222222" width="50%">
              <Check />
              <Text fontSize="14px" color="#ffffff" ml={2}>
                Approve
              </Text>
            </Button>
            <Button rounded="2xl" bg="#FFF0EF" width="50%">
              <X color="#E42222" size={16} />
              <Text fontSize="14px" color="#E42222">
                Reject
              </Text>
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default SwapDetails;
