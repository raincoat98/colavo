import {
  Flex,
  Spacer,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverFooter,
  PopoverBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { contentBackground } from "../../util/colors";

const ItemPopover = ({
  title,
  data,
  count,
  children,
  onSubmit,
  onRemove,
}: any) => {
  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button
          bg={"gray.50"}
          _hover={{ bg: "gray.100" }}
          color="gray.500"
          rounded="20"
        >
          <Text>{count > 0 ? count : "수정"}</Text>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Text as="b">{title}</Text>
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
          <PopoverFooter gap={5}>
            <Flex gap={1}>
              <Button
                bg={bgColor}
                _hover={{ bg: "pink.100" }}
                color="pink.400"
                width="100%"
                onClick={() => onRemove(data)}
              >
                삭제
              </Button>
              <Spacer />

              <Button
                bg={bgColor}
                _hover={{ bg: "gray.100" }}
                color="gray.400"
                width="100%"
                onClick={() => onSubmit(data)}
              >
                완료
              </Button>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default ItemPopover;
