export interface QuoteData {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
}

export interface ChartDataPoint {
  timestamp: string;
  price: number;
  market_cap: number;
  volume_24h: number;
}

interface TimeFrameData {
  daily: ChartDataPoint[];
  weekly: ChartDataPoint[];
  monthly: ChartDataPoint[];
}

export interface ChartData {
  [currency: string]: TimeFrameData;
}

export interface Description {
  introduction: string;
  paragraph: { title: string; content: string }[];
}

export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  last_updated: string;
  logo: string;
  description: Description;
  tags: string[];
  date_added: string;
  website: string;
  twitter: string;
  reddit: string;
  technical_doc: string;
  explorer: string;
  quote: {
    [currency: string]: QuoteData;
  };
  chart_data: ChartData;
  exchanges: string[];
}

export interface ExchangeShowProps {
  symbol: string;
  percentage: string;
}

export const formatNumber = (num: number): string => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  } else if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  } else {
    return `${num.toFixed(2)}`;
  }
};
export const calculateAverage = (array: number[]) => {
  const sum = array.reduce((acc: number, val: number) => acc + val, 0);
  const average = sum / array.length;
  return Number(average.toFixed(2));
};
export const formatCurrency = (value: string) => {
  return value === "USD"
    ? "$"
    : value === "EUR"
    ? "€"
    : value === "CAD"
    ? "CA$"
    : "";
};
export const formatNumberWithCommas = (number: number) => {
  return number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
