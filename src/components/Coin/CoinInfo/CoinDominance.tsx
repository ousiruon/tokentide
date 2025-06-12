import type { QuoteData } from "../../../utilities/data";

const CoinDominance = ({ data }: { data: QuoteData }) => {
  return (
    <div className="w-full flex flex-col gap-4 text-sm font-semibold">
      <div className="w-full flex text-base items-center justify-center">
        Dominance
      </div>
      <div className="relative w-full mb-4 border-1 border-text-light dark:border-text-dark">
        <div className="absolute top-1 left-0">0</div>
        <div className="absolute top-1 right-0">100</div>
        <div
          className={`absolute top-0 translate-y-[-50%] w-1 h-2 border-up-color border-l-2 z-2`}
          style={{
            left: `${data.market_cap_dominance.toFixed(2)}%`,
          }}
        ></div>
        <div
          className={`absolute translate-y-[-50%] top-0 left-0 translate-x-[-2%] h-1 z-2 bg-up-color`}
          style={{
            width: `${data.market_cap_dominance.toFixed(2)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CoinDominance;
