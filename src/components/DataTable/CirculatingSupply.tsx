import { formatNumber } from "../../utilities/data";

const CirculatingSupply = ({
  circulatingSupply,
  symbol,
}: {
  circulatingSupply: number;
  symbol: string;
}) => {
  return (
    <>
      <td className="py-8 px-2 md:p-8 text-right flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-center justify-end w-full">
          <div className="font-semibold font-sm">
            {formatNumber(circulatingSupply)}
          </div>
          <div className="text-xs">{symbol}</div>
        </div>
      </td>
    </>
  );
};
export default CirculatingSupply;
