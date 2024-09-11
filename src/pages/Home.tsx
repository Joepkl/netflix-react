/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import { decrement, increment } from "@/store/slices/user.ts";
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";

/** Component */
const App = () => {
  const count = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Home</h1>
      <Link to="/page1">Page 1</Link>
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};

export default App;
