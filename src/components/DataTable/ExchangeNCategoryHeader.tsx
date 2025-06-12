const ExchangeHeader = () => {
  return (
    <>
      <thead>
        <tr className="border-b border-text-light/30 dark:border-text-dark/30 text-sm md:text-base">
          <th className="text-left px-4 py-2 md:p-8 cursor-pointer">Name</th>
          <th className="text-left px-4 py-2 md:p-8 cursor-pointer">Total cryptocoins</th>
          <th className="text-center px-4 py-2 md:p-8 cursor-pointer">1H avg</th>
          <th className="text-center px-4 py-2 md:p-8 cursor-pointer">24H avg</th>
          <th className="text-center px-4 py-2 md:p-8 cursor-pointer">7D avg</th>
          <th className="text-right px-4 py-2 md:p-8 cursor-pointer">Total market cap</th>
          <th className="text-right px-2 md:px-4 py-2 md:p-8 cursor-pointer">Volume(24h)</th>
        </tr>
      </thead>
    </>
  );
};
export default ExchangeHeader;
