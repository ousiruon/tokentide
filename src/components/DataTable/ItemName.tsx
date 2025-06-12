const ItemName = ({
  name,
  symbol,
  img,
}: {
  name: string;
  symbol: string;
  img: string;
}) => {
  return (
    <>
      <td className="text-left px-4 py-2 md:p-8 h-full font-semibold">
        <div className="flex flex-row gap-2 items-start w-full">
          <div className="flex flex-row items-center gap-2">
            <img
              src={img}
              className="w-[20px] md:w-[30px] aspect-square drop-shadow-md drop-shadow-tertiary-light/20 dark:drop-shadow-tertiary-dark/20 
"
              alt={name + " logo"}
              loading="lazy"
            />
            {name}
            <div className="font-normal text-xs">{symbol}</div>
          </div>
        </div>
      </td>
    </>
  );
};
export default ItemName;
