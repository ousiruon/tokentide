const Copyright = () => {
  return (
    <>
      <div className="bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark border-y-1 border-text-light dark:border-text-dark">
        <div className="max-w-[1400px] mx-auto flex flex-col">
          <div className="font-bold text-xs p-4">{`© ${new Date().getFullYear()} TokenTide. All Rights Reserved.`}</div>
        </div>
      </div>
    </>
  );
};
export default Copyright;
