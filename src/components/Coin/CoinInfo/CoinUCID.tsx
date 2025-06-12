import { FaCopy } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { useState, useEffect } from "react";

const CoinUCID = ({ data }: { data: string }) => {
  const [textCopied, setTextCopied] = useState<boolean>(false);
  useEffect(() => {
    if (textCopied) {
      setTimeout(() => setTextCopied(false), 2000);
    }
  }, [textCopied]);
  return (
    <>
      <div
        className={`fixed top-10 left-[50%] translate-x-[-50%] py-1 px-4 rounded-lg bg-text-light dark:bg-text-dark text-bg-light dark:text-bg-dark font-semibold flex items-center gap-2 z-10 ${
          textCopied ? "block" : "hidden"
        }`}
      >
        <div className="rounded-full bg-up-color p-1">
          <IoMdCheckmark size={12} />
        </div>
        Copied!
      </div>
      <div className="w-full flex flex-row justify-between text-sm font-semibold">
        <div className="">UCID</div>
        <div
          onClick={() => {
            navigator.clipboard.writeText(data);
            setTextCopied(true);
          }}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in cursor-pointer"
        >
          {data.slice(0, 3) + "..."}
          <div>
            <FaCopy size={10} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinUCID;
