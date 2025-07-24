import { Box, Text } from "@chakra-ui/react";
import { Approve, HorizontalDots, Reject } from "~/assets/images";
import MomentAgo from "~/components/moment-ago";
import { getStatusStyles } from "~/modules/util";

interface iList {
  title: string;
  date: string;
  gadget: string;
  owner: string;
  status: string;
}

const List: React.FC<iList> = ({ title, date, gadget, owner, status }) => {
  const { borderColor, bg, textColor } = getStatusStyles(status?.toLowerCase());

  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px" mb="24px">
        <Box h="100px" w="100px" borderRadius="8px"></Box>
        <Box>
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            {title}
          </Text>
          <Box mb="12px" display="flex" gap="25px">
            <Text
              fontSize="13px"
              color="#222222"
              border="1px solid #E9E9E9"
              p="7.5px 9px"
              borderRadius="37.74px"
            >
              {gadget}
            </Text>
            <Box display="flex" alignItems="center" gap="12px">
              <Box h="32px" w="32px" borderRadius={"full"} bg="#CCC1F0"></Box>
              <Text fontSize="14px" color="#737373" fontWeight={500}>
                {owner}
              </Text>
            </Box>
          </Box>
          <Text fontSize="14px" color="#737373">
            <MomentAgo createdAt={date} />
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
            {status}
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
        {status === "pending" && (
          <Box display="flex" alignItems="center" gap="38px">
            <Box display="flex" alignItems="center" gap="16px">
              <Approve />
              <Text fontSize="14px" color="#68CC58">
                Approve
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="16px">
              <Reject />
              <Text fontSize="14px" color="#E42222">
                Reject
              </Text>
            </Box>
          </Box>
        )}
        <Box ml="auto">
          <HorizontalDots />
        </Box>
      </Box>
    </Box>
  );
};

export default List;
