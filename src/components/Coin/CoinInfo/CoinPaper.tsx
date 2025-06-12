import { FaGlobe } from "react-icons/fa6";

const CoinPaper = ({ data, name }: { data: string; name: string }) => {
  return (
    <div className="w-full flex flex-row justify-between text-sm font-semibold">
      <div className="">Whitepaper</div>
      <a
        className="flex items-center gap-1 text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in"
        href={data}
      >
        <FaGlobe size={10} />
        {name.toLowerCase()}.com
      </a>
    </div>
  );
};

export default CoinPaper;
