import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

const CartButtons = () => {
  return (
    <Flex gap={1} p={5}>
      <Button colorScheme="gray" width="100%">
        <SmallAddIcon />
        <Text>시술</Text>
      </Button>
      <Spacer />
      <Button colorScheme="pink" width="100%">
        <SmallAddIcon />
        <Text>할인</Text>
      </Button>
    </Flex>
  );
};

export default CartButtons;
