import { FaSortDown, FaSortUp } from "react-icons/fa";

const Item7D = ({ percent7d }: { percent7d: number }) => {
  return (
    <>
      <td
        className={`text-left py-8 px-2 md:p-8 h-full ${
          percent7d > 0 ? "text-up-color" : "text-down-color"
        }`}
      >
        <div
          className={`flex flex-row gap-1 justify-center ${
            percent7d > 0 ? "items-center" : "items-start"
          }`}
        >
          <div>{percent7d > 0 ? <FaSortUp /> : <FaSortDown />}</div>
          <div>{percent7d.toFixed(2)}</div>
        </div>
      </td>
    </>
  );
};
export default Item7D;
