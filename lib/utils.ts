/* This is utilities file containing different methods to use across the project. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

// Utility function that helps combining tailwindcss classname smartly.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ex: 18.8 => 18.80, 123.000 => 123
export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : int;
};

// Convert text to slug. Ex: Casio Classic Silver Tone => casio-classic-silver-tone
export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

// Ex: 34.32 => $34.32, 34.035 => $34.04
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});
export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

// Ex: 1099255 => 1,099,255
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};

// Ex: 5.435 => 5.44
export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

// Ex: 852399241224471298558190
export const generateId = () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");

// Format error related to database actions (order.actions,user.actions, etc.) so it will be easier to read.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return `${error.errors[field].path}: ${errorMessage}`; // field: errorMessage
    });
    return fieldErrors.join(". ");
  } else if (error.name === "ValidationError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return errorMessage;
    });
    return fieldErrors.join(". ");
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    return `${duplicateField} already exists`;
  } else {
    // return 'Something went wrong. please try again'
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
};
// Plus date to that number. Ex: today is 14 april (2025-04-14T03:37:04.911Z) => 17 april (2025-04-17T03:37:04.911Z)
export const calculateFutureDate = (days: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
};

// Minus date to that number. Ex: today is 14 april (2025-04-14T03:37:04.911Z) => 11 april (2025-04-11T03:37:04.911Z)
export const calculatePastDate = (days: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - days);
  return currentDate;
};

// Ex: getMonthName("2025-04-14T03:37:04.911Z") => April (ongoing), getMonthName("2025-07-14T03:37:04.911Z") => July
export const getMonthName = (yearAndMonth: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [year, monthNumber] = yearAndMonth.split("-");
  const date = new Date();
  date.setMonth(parseInt(monthNumber) - 1);
  return new Date().getMonth() === parseInt(monthNumber) - 1
    ? `${date.toLocaleString("default", { month: "long" })} (ongoing)`
    : date.toLocaleString("default", { month: "long" });
};

// Ex: at 11:12 AM => { hours: 12, minutes: 48 }
export const timeUntilMidnight = (): { hours: number; minutes: number } => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Set to 12:00 AM (next day)

  const diff = midnight.getTime() - now.getTime(); // Difference in milliseconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

// Format date to be readable from Date object by using dateTime, dateOnly, timeOnly variable that provided here.
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    // weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Ex: 225425bhasfui223532f43efwdsad2ey6u212r => ..6u212r
export const formatId = (id: string) => {
  return `..${id.substring(id.length - 6)}`;
};

// Modifying url in a clean way for pagination.
export const formUrlQuery = ({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

// Return url in a clean way, using with href.
export const getFilterUrl = ({
  params,
  category,
  tag,
  sort,
  price,
  rating,
  page,
}: {
  params: {
    q?: string;
    category?: string;
    tag?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  };
  tag?: string;
  category?: string;
  sort?: string;
  price?: string;
  rating?: string;
  page?: string;
}) => {
  const newParams = { ...params };
  if (category) newParams.category = category;
  if (tag) newParams.tag = toSlug(tag);
  if (price) newParams.price = price;
  if (rating) newParams.rating = rating;
  if (page) newParams.page = page;
  if (sort) newParams.sort = sort;
  return `/search?${new URLSearchParams(newParams).toString()}`;
};
