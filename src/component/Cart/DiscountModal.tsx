import { useState, useEffect } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  Flex,
  Box,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { contentBackground, fontColor } from "../../util/colors";
import { ColavolabDiscount } from "../../store/colavolabSlice";
import { Discount } from "../../store/cartSlice";
interface DiscountModalProps {
  discounts: ColavolabDiscount;
  showDiscountModal: boolean;
  setShowDiscountModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: Function;
}

function DiscountModal(props: DiscountModalProps) {
  const { discounts, showDiscountModal, setShowDiscountModal, onSubmit } =
    props;

  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  const font = useColorModeValue(fontColor.light, fontColor.dark);

  useEffect(() => {
    if (!showDiscountModal) setSelectedDiscounts([]);
  }, [showDiscountModal]);

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
    <>
      <Modal
        isOpen={showDiscountModal}
        onClose={() => {
          setShowDiscountModal(false);
          setSelectedDiscounts([]);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          maxHeight="70vh"
          flexDirection="column"
          position="relative"
        >
          <ModalHeader
            position="absolute"
            top="0"
            width="100%"
            bg="white"
            color="black"
            boxShadow="0 1px 2px -2px gray"
          >
            시술메뉴
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="scroll" paddingTop="50px" paddingBottom="104px">
            {discounts &&
              Object.entries(discounts).map(([key, discount]) => {
                const updatedDiscount: Discount = { ...discount, id: key };

                return (
                  <Flex
                    key={key}
                    bg={
                      selectedDiscounts
                        .map((d: Discount) => d.id)
                        .includes(updatedDiscount.id)
                        ? "purple.200"
                        : bgColor
                    }
                    color={
                      selectedDiscounts
                        .map((d: Discount) => d.id)
                        .includes(updatedDiscount.id)
                        ? "gray.700"
                        : font
                    }
                    onClick={() => isChecked(updatedDiscount)}
                    alignItems="center"
                    cursor="pointer"
                    p={5}
                  >
                    <Box>
                      <Text fontWeight="semibold">{discount.name}</Text>
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        color="pink.400"
                      >
                        {Math.round(discount.rate * 100)}%
                      </Text>
                    </Box>
                    <Spacer />
                    <Box>
                      <CheckIcon
                        color="purple.800"
                        boxSize="6"
                        visibility={
                          selectedDiscounts
                            .map((d: Discount) => d.id)
                            .includes(updatedDiscount.id)
                            ? "visible"
                            : "hidden"
                        }
                      />
                    </Box>
                  </Flex>
                );
              })}
          </ModalBody>
          <ModalFooter
            position="absolute"
            bottom="0"
            width="100%"
            background="#9885f0"
          >
            <VStack width="100%">
              <Text color="white">서비스를 선택하세요(여러 개 선택 가능)</Text>
              <Button
                width="100%"
                color="white"
                background={"#ad9ef1"}
                onClick={() => {
                  onSubmit(selectedDiscounts);
                  setShowDiscountModal(false);
                  setSelectedDiscounts([]);
                }}
              >
                완료
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DiscountModal;
