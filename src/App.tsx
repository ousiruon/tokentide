import { useDispatch, useSelector } from "react-redux";
import BeforeHeader from "./components/Header/BeforeHeader";
import Header from "./components/Header/Header";
import { toggleSearch, toggleSettings } from "./store/Slices/settingsSlice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import News from "./components/News/News";
import Exchanges from "./components/Exchanges/Exchanges";
import Latest from "./components/Crypto/Latest";
import GainersAndLosers from "./components/Crypto/GainersAndLosers";
import Login from "./components/Login/Login";
import WatchList from "./components/WatchList/WatchList";
import Trending from "./components/Crypto/Trending";
import { getData } from "./store/Slices/dataSlice";
import {
  getExchangeData,
  setExtendedExchangeData,
  type Exchange,
} from "./store/Slices/exchangesData";
import { calculateAverage } from "./utilities/data";
import Coin from "./components/Coin/Coin";
import { getCategories, setCategories } from "./store/Slices/categoriesData";
import ExchangeShow from "./components/Exchange/ExchangeShow";
import CategoryShow from "./components/Categories/CategoryShow";
import Footer from "./components/Footer/Footer";
import { getNews } from "./store/Slices/newsSlice";
import SingleNews from "./components/News/SingleNews";
const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { openedSettings, openedSearch } = useSelector(
    (state: RootState) => state.userSettings
  );
  const { data } = useSelector((state: RootState) => state.data);
  const { allExchanges } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const { allCategories } = useSelector(
    (state: RootState) => state.categoriesData
  );
  const { newsData } = useSelector((state: RootState) => state.newsData);
  const { currency } = useSelector((state: RootState) => state.userSettings);
  useEffect(() => {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const settingsElement = document.getElementById("settingsMenu");
      const settingsBtn = document.getElementById("settingsBtn");
      const searchElement = document.getElementById("searchResults");
      const searchBtn = document.getElementById("searchBtn");
      if (
        settingsBtn &&
        (target === settingsBtn || settingsBtn.contains(target))
      ) {
        openedSettings
          ? dispatch(toggleSettings(false))
          : dispatch(toggleSettings(true));
      } else if (
        settingsBtn &&
        settingsElement &&
        !settingsBtn.contains(target) &&
        !settingsElement.contains(target)
      ) {
        openedSettings && dispatch(toggleSettings(false));
      }
      if (searchBtn && (target === searchBtn || searchBtn.contains(target))) {
        openedSearch
          ? dispatch(toggleSearch(false))
          : dispatch(toggleSearch(true));
      } else if (
        searchBtn &&
        searchElement &&
        !searchBtn.contains(target) &&
        !searchElement.contains(target)
      ) {
        openedSearch && dispatch(toggleSearch(false));
      }
    });
  }, [dispatch, openedSettings, openedSearch]);
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getData());
    } else {
      if (allExchanges.length > 0) {
        const enrichedExchanges = allExchanges.map(
          (singleExchange: Exchange) => {
            let totalCoins = 0;
            const allOneHourAverage: number[] = [];
            const allTwentyFourHourAverage: number[] = [];
            const allSevenDaysAverage: number[] = [];
            let marketCapTotal: number = 0;
            let allVolume24H: number = 0;
            data.forEach((singleData) => {
              const exists = singleData.exchanges.find(
                (exchange) => exchange === singleExchange.name
              );
              if (exists) {
                totalCoins++;
                allOneHourAverage.push(
                  singleData.quote[currency].percent_change_1h
                );
                allTwentyFourHourAverage.push(
                  singleData.quote[currency].percent_change_24h
                );
                allSevenDaysAverage.push(
                  singleData.quote[currency].percent_change_7d
                );
                marketCapTotal += singleData.quote[currency].market_cap;
                allVolume24H += singleData.quote[currency].volume_24h;
              }
            });
            const oneHourAverage = calculateAverage(allOneHourAverage);
            const twentyFourHourAverage = calculateAverage(
              allTwentyFourHourAverage
            );
            const sevenDaysAverage = calculateAverage(allSevenDaysAverage);
            const volume24H = allVolume24H;
            return {
              ...singleExchange,
              totalCoins,
              oneHourAverage,
              twentyFourHourAverage,
              sevenDaysAverage,
              marketCapTotal: marketCapTotal,
              volume24H,
            };
          }
        );
        dispatch(setExtendedExchangeData(enrichedExchanges));
      } else {
        dispatch(getExchangeData());
      }
      if (allCategories.length > 0) {
        const categoryData = allCategories.map((cat) => {
          let totalCoins: number = 0;
          const oneHour: number[] = [];
          const twentyFourHour: number[] = [];
          const sevenDays: number[] = [];
          let volume24: number = 0;
          let marketCapTotal: number = 0;
          data.forEach((singleData) => {
            singleData.tags.map((tag) => {
              if (tag === cat.name) {
                totalCoins++;
                oneHour.push(singleData.quote[currency].percent_change_1h);
                twentyFourHour.push(
                  singleData.quote[currency].percent_change_24h
                );
                sevenDays.push(singleData.quote[currency].percent_change_7d);
                marketCapTotal += singleData.quote[currency].market_cap;
                volume24 += singleData.quote[currency].volume_24h;
              }
            });
          });
          return {
            ...cat,
            totalCoins,
            oneHourAverage: calculateAverage(oneHour),
            twentyFourHourAverage: calculateAverage(twentyFourHour),
            sevenDaysAverage: calculateAverage(sevenDays),
            marketCapTotal,
            volume24H: volume24,
          };
        });
        dispatch(setCategories(categoryData));
      } else {
        dispatch(getCategories());
      }
    }
    if (newsData.length === 0) {
      dispatch(getNews());
    }
  }, [allExchanges, allCategories, data, currency, dispatch]);
  return (
    <>
      <BrowserRouter>
        <div className="font-display">
          <BeforeHeader />
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/latest-listings" element={<Latest />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/gainers-and-losers" element={<GainersAndLosers />} />
            <Route path="/watchList" element={<WatchList />} />
            <Route path="/coin/:coinId" element={<Coin />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/exchange/:exchangeId" element={<ExchangeShow />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryShow />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/article/:newsId" element={<SingleNews />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
