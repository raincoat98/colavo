import { Box, Text, Spacer, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CartTotalPrice = () => {
  const currencyCode: string =
    useSelector((state: RootState) => state.colavolab.currency_code) || "KRW";

  const totalPrice: number =
    useSelector((state: RootState) => state.cart.totalPrice) || 0;

  return (
    <Flex alignItems="center" p={5}>
      <Box>
        <Text fontSize="sm" color="gray">
          합계
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text>
          {new Intl.NumberFormat("ko", {
            style: "currency",
            currency: currencyCode,
          }).format(totalPrice)}
        </Text>
      </Box>
    </Flex>
  );
};

export default CartTotalPrice;
