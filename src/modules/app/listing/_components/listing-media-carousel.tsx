import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ListingMedia } from "~/hooks/queries/listing/listing.type";
import {
  createImageErrorHandler,
  getImageSrcWithFallback,
} from "~/modules/util";
import swapitem from "~/assets/images/swap_item.png";

interface ListingMediaCarouselProps {
  media: ListingMedia[];
  itemName?: string;
}

const NavButton: React.FC<{
  onClick: () => void;
  ariaLabel: string;
  side: "left" | "right";
  children: React.ReactNode;
}> = ({ onClick, ariaLabel, side, children }) => (
  <Box
    as="button"
    aria-label={ariaLabel}
    onClick={onClick}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    {...(side === "left" ? { left: "12px" } : { right: "12px" })}
    zIndex={2}
    display="flex"
    alignItems="center"
    justifyContent="center"
    w="36px"
    h="36px"
    borderRadius="full"
    bg="white"
    border="1px solid #EAEAEA"
    boxShadow="0 2px 8px rgba(0,0,0,0.08)"
    cursor="pointer"
    _hover={{ bg: "#F7F7F7" }}
  >
    {children}
  </Box>
);

export const ListingMediaCarousel: React.FC<ListingMediaCarouselProps> = ({
  media,
  itemName = "Listing item",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const items = media.filter((item) => item?.url);

  useEffect(() => {
    setActiveIndex(0);
    setImageErrors({});
  }, [media]);

  if (items.length === 0) {
    return (
      <Box
        height={412}
        width="full"
        maxW="586px"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid #EAEAEA"
        mb={4}
      >
        <Image
          height={412}
          width="100%"
          objectFit="cover"
          src={swapitem}
          alt={itemName}
        />
      </Box>
    );
  }

  const current = items[activeIndex];
  const hasMultiple = items.length > 1;
  const isVideo = current.mediaType === "Video";
  const isDocument = current.mediaType === "Document";
  const mediaUrl = current.url || "";

  const goTo = (index: number) => {
    if (index < 0) {
      setActiveIndex(items.length - 1);
      return;
    }
    if (index >= items.length) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(index);
  };

  const handleImageError = (index: number) =>
    createImageErrorHandler(() => {
      setImageErrors((prev) => ({ ...prev, [index]: true }));
    });

  return (
    <Box width="full" maxW="586px" mb={4}>
      <Box
        position="relative"
        height={412}
        width="full"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid #EAEAEA"
      >
        {isVideo ? (
          <Box
            as="video"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            {...({
              src: mediaUrl || swapitem,
              controls: true,
              muted: false,
              key: activeIndex,
            } as any)}
          />
        ) : isDocument ? (
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            bg="#F4F4F4"
          >
            <Text fontSize="sm" color="#737373">
              Document
            </Text>
          </Flex>
        ) : (
          <Image
            height={412}
            width="100%"
            objectFit="cover"
            src={getImageSrcWithFallback(
              mediaUrl,
              imageErrors[activeIndex] || !mediaUrl,
              swapitem
            )}
            alt={`${itemName} - ${activeIndex + 1}`}
            onError={handleImageError(activeIndex)}
          />
        )}

        {hasMultiple && (
          <>
            <NavButton
              side="left"
              ariaLabel="Previous media"
              onClick={() => goTo(activeIndex - 1)}
            >
              <ChevronLeft size={20} color="#222222" />
            </NavButton>
            <NavButton
              side="right"
              ariaLabel="Next media"
              onClick={() => goTo(activeIndex + 1)}
            >
              <ChevronRight size={20} color="#222222" />
            </NavButton>
            <Box
              position="absolute"
              bottom="12px"
              right="12px"
              bg="rgba(0,0,0,0.55)"
              color="white"
              fontSize="12px"
              fontWeight={500}
              px="10px"
              py="4px"
              borderRadius="full"
            >
              {activeIndex + 1} / {items.length}
            </Box>
          </>
        )}
      </Box>

      {hasMultiple && (
        <Flex gap={2} mt={3} overflowX="auto" pb={1}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const thumbIsVideo = item.mediaType === "Video";
            const thumbIsDocument = item.mediaType === "Document";

            return (
              <Box
                key={`${item.url}-${index}`}
                as="button"
                flexShrink={0}
                w="72px"
                h="72px"
                borderRadius="md"
                overflow="hidden"
                border="2px solid"
                borderColor={isActive ? "#007AFF" : "#EAEAEA"}
                opacity={isActive ? 1 : 0.75}
                cursor="pointer"
                onClick={() => setActiveIndex(index)}
                bg="#F4F4F4"
              >
                {thumbIsVideo ? (
                  <Flex w="100%" h="100%" align="center" justify="center">
                    <Text fontSize="10px" color="#737373">
                      Video
                    </Text>
                  </Flex>
                ) : thumbIsDocument ? (
                  <Flex w="100%" h="100%" align="center" justify="center">
                    <Text fontSize="10px" color="#737373">
                      Doc
                    </Text>
                  </Flex>
                ) : (
                  <Image
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    src={getImageSrcWithFallback(
                      item.url,
                      imageErrors[index] || false,
                      swapitem
                    )}
                    alt={`${itemName} thumbnail ${index + 1}`}
                    onError={handleImageError(index)}
                  />
                )}
              </Box>
            );
          })}
        </Flex>
      )}
    </Box>
  );
};
