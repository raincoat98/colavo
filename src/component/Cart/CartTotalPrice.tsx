import { Box, Text, Spacer, Flex } from "@chakra-ui/react";

const CartTotalPrice = () => {
  return (
    <Flex alignItems="center" p={5}>
      <Box>
        <Text fontSize="sm" color="gray">
          합계
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text>0원</Text>
      </Box>
    </Flex>
  );
};

export default CartTotalPrice;
