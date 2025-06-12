import { useState } from "react";

const NewsLetter = () => {
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const subscribeSubmit = () => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const isValidEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    if (emailInput && emailInput.value && isValidEmail(emailInput.value)) {
      emailInput.value = "";
      setSubscribe(true);
    }
  };
  return (
    <>
      <div className="bg-tertiary-light dark:bg-tertiary-dark text-text-light dark:text-text-dark border-y-1 border-text-light dark:border-text-dark">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 px-4 py-8 justify-between">
            <div className="flex flex-col gap-2">
              <div className="font-bold">Stay informed with TokenTide</div>
              <div className="text-sm font-semibold">
                Get real-time updates, market trends, and insights straight to
                your inbox. Subscribe for free!
              </div>
            </div>
            <div className="flex flex-row items-center cursor-pointer w-full md:max-w-[400px] md:px-8">
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event) => {
                  event.currentTarget.value.length >= 1 &&
                    subscribe &&
                    setSubscribe(false);
                }}
                className="w-full outline-0 bg-secondary-light/20 dark:bg-secondary-dark/20 rounded-l text-xs md:text-sm py-2 md:py-3 px-4 text-text-dark"
              />
              <div
                onClick={subscribeSubmit}
                className="text-xs md:text-sm font-bold bg-secondary-light dark:bg-secondary-dark py-2 md:py-3 px-4 rounded-r"
              >
                {subscribe ? "Subscribed!" : "Subscribe"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsLetter;
