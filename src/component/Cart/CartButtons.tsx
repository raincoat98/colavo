import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

import ItemModal from "./ItemModal";
import { addItems } from "../../store/cartSlice";

const CartButtons = () => {
  const dispatch = useDispatch();

  const { items = {} } = useSelector((state: RootState) => state.colavolab);

  const [showItemModal, setShowItemModal] = useState(false);
  const openItemModal = () => setShowItemModal(true);

  const handleSubmit = (selectedItems: any) => {
    dispatch(addItems(selectedItems));
  };

  return (
    <Flex gap={1} p={5}>
      <Button
        bg={"gray.50"}
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        width="100%"
        onClick={openItemModal}
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

      <ItemModal
        items={items}
        showItemModal={showItemModal}
        setShowItemModal={setShowItemModal}
        onSubmit={handleSubmit}
      ></ItemModal>
    </Flex>
  );
};

export default CartButtons;
