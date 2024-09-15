/** Vendor */
import { Link } from "react-router-dom";

/** Local */
import { decrement, increment } from "@/store/slices/user.ts";
import { useAppSelector, useAppDispatch } from "@/store/hooks.ts";

/** Component */
const TestPage = () => {
  const count = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  /** Markup */
  return (
    <div>
      <h1>Page 2</h1>
      <Link to="/">Home page</Link>
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

export { TestPage };
