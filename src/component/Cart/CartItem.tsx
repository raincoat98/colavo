import { useState } from "react";
import {
  Flex,
  Spacer,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import ItemPopover from "./ItemPopover";
import { Item, removeItems } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ data }: any) => {
  const dispatch = useDispatch();

  const [itemCount, setItemCount] = useState<number>(data.count);

  function handleCountChange(value: any) {
    setItemCount(value);
  }
  function onSubmitHandler() {
    // TODO:  Item의 값을 수정해야함 dispatch
  }

  function removeHandler(item: Item) {
    dispatch(removeItems(item));
  }

  return (
    <Flex p={5}>
      <Flex direction="column" textAlign="left">
        <Text fontWeight="semibold">{data.name}</Text>
        <Text fontSize="sm" color="gray">
          {data.price && data.price + "원"}
        </Text>
      </Flex>

      <Spacer />

      <ItemPopover
        title={data.name}
        data={data}
        count={itemCount}
        onSubmit={onSubmitHandler}
        onRemove={removeHandler}
      >
        <NumberInput
          defaultValue={itemCount}
          min={1}
          max={100}
          onChange={handleCountChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </ItemPopover>
    </Flex>
  );
};

export default CartItem;
