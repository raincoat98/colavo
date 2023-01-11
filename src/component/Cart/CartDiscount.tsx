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
import { Discount } from "../../store/cartSlice";

const CartDiscount = ({ data }: any) => {
  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  const font = useColorModeValue(fontColor.light, fontColor.dark);

  const itemNames =
    data.items &&
    data.items
      .map((item: any) => {
        console.log(item);
        return `${item.name}${item.count > 1 ? `x${item.count}` : ""}`;
      })
      .join(", ");

  const totalPrice: number = data.items.reduce(
    (total: number, item: { price: number }) => total + item.price,
    0
  );

  function getDiscountedPrice(
    original: number,
    discountPercentage: number
  ): number {
    const discount = original * (discountPercentage / 10);
    return discount * -1;
  }

  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const isChecked = (discount: Discount) => {
    const discountIds = selectedDiscounts.map((i: Discount) => i.id);
    if (discountIds.includes(discount.id)) {
      setSelectedDiscounts(
        selectedDiscounts.filter((i: Discount) => i.id !== discount.id)
      );
    } else {
      setSelectedDiscounts([...selectedDiscounts, discount]);
    }
  };

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
          {getDiscountedPrice(totalPrice, data.rate)} ({data.rate})
        </Text>
      </Flex>

      <Spacer />

      <ItemPopover title={data.name} count={data.count}>
        {data.items &&
          data.items.map((item: any, index: number) => (
            <Flex
              key={item.id || index}
              bg={selectedDiscounts.includes(item) ? "purple.100" : bgColor}
              color={selectedDiscounts.includes(item) ? "gray.700" : font}
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
                    selectedDiscounts.includes(item) ? "visible" : "hidden"
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
