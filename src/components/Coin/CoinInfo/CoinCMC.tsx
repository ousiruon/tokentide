const CoinCMC = ({ data }: { data: number }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 py-4 rounded border-1 border-text-light dark:border-text-dark">
        <div className="font-semibold text-sm">CMC rank</div>
        <div className="font-semibold flex flex-row items-center gap-1">
          <div className="text-sm">{data}</div>
        </div>
      </div>
    </>
  );
};
export default CoinCMC;
