import type { PreHeader } from "./BeforeHeader";

const BeforeHeaderPC = ({ content }: { content: PreHeader []}) => {
  return (
    <>
      {content.map((item, index) => (
        <div key={index} className="items-center gap-1 hidden md:flex">
          <div className="font-semibold">{item.title}:</div>
          <div className="text-secondary-light dark:text-bg-dark font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </>
  );
};
export default BeforeHeaderPC;
