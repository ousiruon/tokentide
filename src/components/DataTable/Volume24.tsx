import { formatCurrency, formatNumber } from "../../utilities/data";

const Volume24 = ({
  volume24,
  selectedCurrency,
}: {
  volume24: number;
  selectedCurrency: string;
}) => {
  return (
    <>
      <td className="py-8 px-2 md:p-8 text-right">
        <div className="flex flex-row gap-1 items-center justify-end w-full">
          <div className="text-sm">{formatCurrency(selectedCurrency)}</div>
          <div>{formatNumber(volume24)}</div>
        </div>
      </td>
    </>
  );
};
export default Volume24;
