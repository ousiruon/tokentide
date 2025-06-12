import { useDispatch, useSelector } from "react-redux";
import type { Cryptocurrency } from "../../utilities/data";
import type { AppDispatch, RootState } from "../../store/store";
import { setShowBy } from "../../store/Slices/dataSlice";
import { useEffect, useRef } from "react";

const OptionsTopBar = ({ data }: { data: Cryptocurrency[] | [] }) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedOptions } = useSelector((state: RootState) => state.data);
  const firstLoadRef = useRef(true);
  useEffect(() => {
    if (firstLoadRef.current && data.length < 20) {
      dispatch(setShowBy(10));
      firstLoadRef.current = false;
    }
  }, [data.length, dispatch]);

  return (
    <div className="flex justify-end items-end grow-1">
      {data.length >= 5 && (
        <select
          value={selectedOptions.showBy}
          onChange={(e) => dispatch(setShowBy(Number(e.currentTarget.value)))}
          className="px-2 py-1 bg-tertiary-light dark:bg-tertiary-dark rounded outline-0 text-sm font-semibold"
        >
          {[5, 10, 20, 30, 40, 50].map((val) => (
            <option key={val} value={val} disabled={val > data.length}>
              Show {val}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
export default OptionsTopBar;
