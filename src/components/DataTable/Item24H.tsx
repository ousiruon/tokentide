import { FaSortDown, FaSortUp } from "react-icons/fa";

const Item24H = ({ percent24h }: { percent24h: number }) => {
  return (
    <>
      <td
        className={`text-left py-8 px-2 md:p-8 h-full ${
          percent24h > 0 ? "text-up-color" : "text-down-color"
        }`}
      >
        <div
          className={`flex flex-row gap-1 justify-center ${
            percent24h > 0 ? "items-center" : "items-start"
          }`}
        >
          <div>{percent24h > 0 ? <FaSortUp /> : <FaSortDown />}</div>
          <div>{percent24h.toFixed(2)}</div>
        </div>
      </td>
    </>
  );
};
export default Item24H;
