import { useState } from "react";
import {
  Flex,
  Spacer,
  VStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

// TODO: 타입 변경
import ItemPopover from "./ItemPopover";

const CartItem = ({ data }: any) => {
  const [itemCount, setItemCount] = useState<number>(data.count);

  function handleCountChange(value: any) {
    setItemCount(value);
  }
  function onSubmitHandler() {
    console.log(itemCount);
    // TODO:  Item의 값을 수정해야함 dispatch
  }

  function removeHandler(count: number) {
    // TODO:  Id 값을 받아와서 삭제 dispatch
    console.log(count);
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
