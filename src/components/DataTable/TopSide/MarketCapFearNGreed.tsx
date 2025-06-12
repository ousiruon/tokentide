import FearAndGreed from "./FearAndGreed";
import MarketCapData from "./MarketCapData";

const MarketCapFearNGreed = () => {
  return (
    <>
      <div className="flex md:flex-col flex-row gap-4 w-full md:w-auto">
        <div className="flex flex-col gap-6 p-2 md:p-6 w-full grow-1 bg-secondary-light dark:bg-secondary-dark rounded">
          <FearAndGreed />
        </div>
        <div className="flex flex-col items-center justify-start gap-6 p-2 md:p-6 w-full grow-1 bg-secondary-light dark:bg-secondary-dark rounded">
          <MarketCapData />
        </div>
      </div>
    </>
  );
};
export default MarketCapFearNGreed;
