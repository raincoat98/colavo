import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Item } from "../../store/cartSlice";
import CartItem from "./CartItem";

const CartList = () => {
  const items: Item[] =
    useSelector((state: RootState) => state.cart.items) || [];

  const itemList = items.map(item => (
    <CartItem data={item} key={item.id}></CartItem>
  ));

  return <>{itemList}</>;
};

export default CartList;
