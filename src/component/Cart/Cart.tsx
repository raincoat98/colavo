import { useEffect } from "react";
import { VStack, Button, Container, Divider } from "@chakra-ui/react";
import CartTotalPrice from "./CartTotalPrice";
import CartList from "./CartList";
import CartUserInfo from "./CartUerInfo";
import CartButtons from "./CartButtons";
import { useDispatch } from "react-redux";
import { fetchColavolab } from "../../api/colavo";
import { fetchColavolabData } from "../../store/colavolabSlice";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchColavolab();
        dispatch(fetchColavolabData(data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container>
      <CartUserInfo />
      <CartButtons />
      <Divider />
      <CartList />
      <CartTotalPrice />
      <VStack p={5}>
        <Button
          bg={"purple.400"}
          _hover={{ bg: "purple.500" }}
          color="white"
          width="100%"
        >
          다음
        </Button>
      </VStack>
    </Container>
  );
};

export default Cart;
