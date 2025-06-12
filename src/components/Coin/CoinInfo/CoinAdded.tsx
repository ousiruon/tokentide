const CoinAdded = ({ data }: { data: string }) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between text-sm font-semibold">
        <div className="">Date added</div>
        <div className="text-xs">
          {new Date(data).toISOString().slice(0, 10)}
        </div>
      </div>
    </>
  );
};
export default CoinAdded;
