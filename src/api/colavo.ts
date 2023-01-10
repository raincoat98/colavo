import { Item, Discount } from "../store/cartSlice";
import axios from "axios";

const API_URL =
  "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData";

export interface Colavolab {
  items: { [key: string]: Item };
  discounts: { [key: string]: Discount };
  currency_code: string;
}

export async function fetchColavolab() {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
