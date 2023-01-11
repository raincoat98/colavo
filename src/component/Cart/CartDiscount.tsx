import { useState } from "react";
import {
  Flex,
  Spacer,
  HStack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import ItemPopover from "./ItemPopover";
import { contentBackground, fontColor } from "../../util/colors";
import {
  Discount,
  Item,
  removeDiscount,
  updateDiscount,
} from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const CartDiscount = ({ data }: any) => {
  const dispatch = useDispatch();
  const items: Item[] =
    useSelector((state: RootState) => state.cart.items) || [];

  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  const font = useColorModeValue(fontColor.light, fontColor.dark);

  const itemNames =
    data.items &&
    data.items
      .map((item: any) => {
        return `${item.name}${item.count > 1 ? `x${item.count}` : ""}`;
      })
      .join(", ");

  const totalItemPrice =
    data.items.reduce(
      (acc: number, item: Item) =>
        acc + (item.price * item.count * data.rate) / 100,
      0
    ) * -1;

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const isChecked = (item: Item) => {
    const itemIds = selectedItems.map((i: Item) => i.id);
    if (itemIds.includes(item.id)) {
      setSelectedItems(selectedItems.filter((i: Item) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  function onRemoveDiscountHandler(discount: Discount) {
    dispatch(removeDiscount(discount));
  }

  function onSubmitDiscountHandler(discount: Discount) {
    dispatch(updateDiscount({ discount, item: selectedItems }));
  }

  return (
    <Flex p={5}>
      <Flex direction="column" textAlign="left">
        <Text fontWeight="semibold">{data.name}</Text>
        <HStack spacing={1}>
          <Text fontSize="sm" color="gray">
            {itemNames}
          </Text>
        </HStack>
        <Text fontSize="md" fontWeight="semibold" color="pink.400">
          {totalItemPrice}원 ({data.rate})
        </Text>
      </Flex>

      <Spacer />

      <ItemPopover
        title={data.name}
        data={data}
        count={data.count}
        onRemove={onRemoveDiscountHandler}
        onSubmit={onSubmitDiscountHandler}
      >
        {items &&
          items.map((item: any, index: number) => (
            <Flex
              key={item.id || index}
              bg={selectedItems.includes(item) ? "purple.100" : bgColor}
              color={selectedItems.includes(item) ? "gray.700" : font}
              onClick={() => isChecked(item)}
              alignItems="center"
              cursor="pointer"
              p={5}
            >
              <Flex direction="column" textAlign="left">
                <Text fontWeight="semibold">
                  {item.name}
                  {item.count > 1 ? `x${item.count}` : ""}
                </Text>
                <Text fontWeight="sm">{item.price * item.count}원</Text>
              </Flex>
              <Spacer />
              <Box>
                <CheckIcon
                  color="purple.800"
                  boxSize="6"
                  visibility={
                    selectedItems.includes(item) ? "visible" : "hidden"
                  }
                />
              </Box>
            </Flex>
          ))}
      </ItemPopover>
    </Flex>
  );
};

export default CartDiscount;
