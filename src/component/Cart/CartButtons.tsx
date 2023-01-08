import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

const CartButtons = () => {
  return (
    <Flex gap={1} p={5}>
      <Button
        bg={"gray.50"}
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        width="100%"
      >
        <SmallAddIcon />
        <Text>시술</Text>
      </Button>
      <Spacer />
      <Button
        bg={"pink.50"}
        _hover={{ bg: "pink.100" }}
        color="pink.400"
        width="100%"
      >
        <SmallAddIcon />
        <Text>할인</Text>
      </Button>
    </Flex>
  );
};

export default CartButtons;
