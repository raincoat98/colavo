import { Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addItems, addDiscount } from "../../store/cartSlice";

import ItemModal from "./ItemModal";
import DiscountModal from "./DiscountModal";

const CartButtons = () => {
  const dispatch = useDispatch();

  const { items = {}, discounts = {} } = useSelector(
    (state: RootState) => state.colavolab
  );

  const [showItemModal, setShowItemModal] = useState(false);
  const openItemModal = () => setShowItemModal(true);

  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const openDiscountModal = () => setShowDiscountModal(true);

  const handleSubmit = (selectedItems: any) => {
    dispatch(addItems(selectedItems));
  };

  const handleDiscountSubmit = (selectedDiscounts: any) => {
    dispatch(addDiscount(selectedDiscounts));
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
        onClick={openDiscountModal}
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

      <DiscountModal
        discounts={discounts}
        showDiscountModal={showDiscountModal}
        setShowDiscountModal={setShowDiscountModal}
        onSubmit={handleDiscountSubmit}
      />
    </Flex>
  );
};

export default CartButtons;
