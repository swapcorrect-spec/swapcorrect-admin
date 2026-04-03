import { Flex, Button, IconButton, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import type { IPaginationProps } from "~/types/base";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <Flex alignItems="center" justifyContent="end" gap="6">
      {/* Previous Button */}
      <IconButton
        aria-label="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        bg="transparent"
        borderColor="#D5D7DA"
        _hover={{ bg: "#F8F8F8" }}
        py={3}
        px={"18px"}
      >
        <ArrowLeft size={16} />
        Previous
      </IconButton>

      {/* Page Numbers */}
      <Flex align="center" gap="1">
        {pageNumbers.map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === null ? (
              <Text px="2" py="1" color="#717680" fontSize="14px">
                ...
              </Text>
            ) : (
              <Button
                onClick={() => onPageChange(pageNumber)}
                color={currentPage === pageNumber ? "#007AFF" : "#717680"}
                variant="outline"
                w="10"
                h="10"
                rounded="md"
                borderColor="transparent"
                bg={currentPage === pageNumber ? "#F8F8F8" : "transparent"}
                boxShadow={currentPage === pageNumber ? "sm" : "none"}
                _hover={{ bg: "#F8F8F8" }}
              >
                {pageNumber}
              </Button>
            )}
          </React.Fragment>
        ))}
      </Flex>

      {/* Next Button */}
      <IconButton
        aria-label="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        bg="transparent"
        borderColor="#D5D7DA"
        _hover={{ bg: "#F8F8F8" }}
        py={3}
        px={"18px"}
      >
        Next
        <ArrowRight size={16} />
      </IconButton>
    </Flex>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | null)[] {
  const maxVisiblePages = 5;
  const pageNumbers: (number | null)[] = [];

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pageNumbers.push(1);

  if (currentPage <= 3) {
    pageNumbers.push(2, 3, 4, null, totalPages);
  } else if (currentPage >= totalPages - 2) {
    pageNumbers.push(
      null,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pageNumbers.push(
      null,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      null,
      totalPages
    );
  }

  return pageNumbers;
}
