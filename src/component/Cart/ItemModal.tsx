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
import { contentBackground, fontColor, subFontColor } from "../../util/colors";
import { ColavolabItem } from "../../store/colavolabSlice";

interface ItemModalProps {
  items: ColavolabItem;
  showItemModal: boolean;
  setShowItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: Function;
}

function ItemModal(props: ItemModalProps) {
  const { items, showItemModal, setShowItemModal, onSubmit } = props;

  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  const font = useColorModeValue(fontColor.light, fontColor.dark);
  const subFont = useColorModeValue(subFontColor.light, fontColor.dark);

  useEffect(() => {
    if (!showItemModal) setSelectedItems([]);
  }, [showItemModal]);

  const [selectedItems, setSelectedItems] = useState<ColavolabItem[]>([]);

  const isChecked = (item: ColavolabItem) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i: ColavolabItem) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      <Modal
        isOpen={showItemModal}
        onClose={() => {
          setShowItemModal(false);
          setSelectedItems([]);
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
            {items &&
              Object.entries(items).map(([key, item]) => (
                <Flex
                  key={key}
                  bgColor={bgColor}
                  bg={selectedItems.includes(item) ? "purple.200" : bgColor}
                  color={selectedItems.includes(item) ? "gray.700" : font}
                  onClick={() => isChecked(item)}
                  alignItems="center"
                  cursor="pointer"
                  p={5}
                >
                  <Box>
                    <Text fontWeight="semibold">{item.name}</Text>
                    <Text
                      fontSize="sm"
                      color={
                        selectedItems.includes(item) ? "gray.700" : subFont
                      }
                    >
                      {item.price && item.price + "원"}
                    </Text>
                  </Box>
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
                  onSubmit(selectedItems);
                  setShowItemModal(false);
                  setSelectedItems([]);
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

export default ItemModal;
