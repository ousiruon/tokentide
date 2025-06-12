import { FaSortDown, FaSortUp } from "react-icons/fa";

const Item1H = ({ percent1h }: { percent1h: number }) => {
  return (
    <>
      <td
        className={`text-left py-8 px-2 md:p-8 h-full ${
          percent1h > 0 ? "text-up-color" : "text-down-color"
        }`}
      >
        <div
          className={`flex flex-row gap-1 justify-center ${
            percent1h > 0 ? "items-center" : "items-start"
          }`}
        >
          <div>{percent1h > 0 ? <FaSortUp /> : <FaSortDown />}</div>
          <div>{percent1h.toFixed(2)}</div>
        </div>
      </td>
    </>
  );
};
export default Item1H;
