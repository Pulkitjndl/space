import { useContext } from "react";

import RocketsContext1 from "../../contexts/RocketsContext1";

const Filter = ({
  filterChangeHandler,
  launchYear,
  launchSuccess,
}) => {
  const { rockets } = useContext(RocketsContext1);

  const currentYear = new Date().getFullYear();

  return (
    <div className="container grid grid-cols-1 gap-6 mx-auto w-1/2 mt-14 xl:grid-cols-2">
      <label className="block">
        <span className="text-gray-700">Launch Duration</span>
        <select
          value={launchYear}
          onChange={(e) => filterChangeHandler("launchYear", e)}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">All</option>
          {[...Array(currentYear - 2001 + 1).keys()]
            .sort((a, b) => b - a)
            .map((item) => {
              const year = item + 2001;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Launch status</span>
        <select
          value={launchSuccess}
          onChange={(e) => filterChangeHandler("launchSuccess", e)}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">All</option>
          <option value={true}>Success</option>
          <option value={false}>Failed</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
