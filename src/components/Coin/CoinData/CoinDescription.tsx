import type { Description } from "../../../utilities/data";

const CoinDescription = ({ description }: { description: Description }) => {
  return (
    <>
      <div className="flex flex-col gap-4 text-justify">
        <div>{description.introduction}</div>
        {description.paragraph.map((singleParagraph, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="font-bold text-lg dark:text-tertiary-dark">
              {singleParagraph.title}
            </div>
            <div>{singleParagraph.content}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CoinDescription;
