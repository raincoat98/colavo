import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Discount, Item } from "../../store/cartSlice";
import CartDiscount from "./CartDiscount";
import CartItem from "./CartItem";

const CartList = () => {
  const items: Item[] =
    useSelector((state: RootState) => state.cart.items) || [];

  const discount: Discount[] =
    useSelector((state: RootState) => state.cart.discounts) || [];

  const itemList = items.map(item => (
    <CartItem data={item} key={item.id}></CartItem>
  ));

  console.log(discount);

  const discountList = discount.map(discount => (
    <CartDiscount data={discount} key={discount.id}></CartDiscount>
  ));

  return (
    <>
      {itemList}
      {discountList}
    </>
  );
};

export default CartList;
