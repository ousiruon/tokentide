import { FaReddit, FaSquareXTwitter } from "react-icons/fa6";

const CoinSocials = ({
  reddit,
  twitter,
}: {
  reddit: string;
  twitter: string;
}) => {
  return (
    <div className="w-full flex flex-row justify-between text-sm font-semibold">
      <div className="">Socials</div>
      <div className="flex flex-row gap-2">
        <a
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in"
          href={twitter}
        >
          <FaSquareXTwitter size={14} />
        </a>
        <a
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in"
          href={reddit}
        >
          <FaReddit size={14} />
        </a>
      </div>
    </div>
  );
};

export default CoinSocials;
