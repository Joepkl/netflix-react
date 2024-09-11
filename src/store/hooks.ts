/** Vendor */
import { useDispatch, useSelector } from "react-redux";

/** Local */
import type { AppDispatch, RootState } from "./store.ts";

/** Typed versions of useDispatch and useSelector */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
