import DataTable from "../DataTable/DataTable";

const Home = () => {
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        <DataTable />
      </div>
    </>
  );
};
export default Home;
