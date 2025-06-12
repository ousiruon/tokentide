import { formatCurrency } from "../../utilities/data";

const ItemPrice = ({
  price,
  selectedCurrency,
}: {
  price: number;
  selectedCurrency: string;
}) => {
  return (
    <>
      <td className="text-left py-8 px-2 md:p-8 h-full flex flex-row gap-1 items-center">
        <div className="text-sm">{formatCurrency(selectedCurrency)}</div>
        {price.toFixed(2)}
      </td>
    </>
  );
};
export default ItemPrice;
