import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

import Button from "../../ui/Button";

function DeleteItem({ pizzaID }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaID))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
