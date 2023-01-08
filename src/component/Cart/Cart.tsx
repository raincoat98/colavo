import * as React from "react";
import { VStack, Button, Container, Divider } from "@chakra-ui/react";
import CartTotalPrice from "./CartTotalPrice";
import CartList from "./CartList";
import CartUserInfo from "./CartUerInfo";
import CartButtons from "./CartButtons";

const Cart = () => {
  return (
    <Container>
      <CartUserInfo />
      <CartButtons />
      <Divider />
      <CartList />
      <CartTotalPrice />
      <VStack p={5}>
        <Button colorScheme="purple" width="100%">
          다음
        </Button>
      </VStack>
    </Container>
  );
};

export default Cart;
