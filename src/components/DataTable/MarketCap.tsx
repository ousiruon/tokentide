import { formatCurrency, formatNumber } from "../../utilities/data";

const MarketCap = ({
  marketCap,
  selectedCurrency,
}: {
  marketCap: number;
  selectedCurrency: string;
}) => {
  return (
    <>
      <td className="py-8 px-2 md:p-8 text-right">
        <div className="flex flex-row gap-1 items-center justify-end w-full">
          <div className="text-sm">{formatCurrency(selectedCurrency)}</div>
          <div>{formatNumber(marketCap)}</div>
        </div>
      </td>
    </>
  );
};
export default MarketCap;
