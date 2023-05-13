import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useLocalStorageValue } from "@react-hookz/web/esm"; // esm
import { queryOptions } from "./constants";
import { getData, processData } from "./utils";
import Table from "./Table";
import Chart from "./Chart";
import CountySelector from "./CountySelector";

function App() {
  const {
    isLoading,
    isError,
    data: rawData,
  } = useQuery("usData", () => getData(), queryOptions);

  const [UIDs] = useLocalStorageValue("UIDs", ["84034019"], {
    storeDefaultValue: true,
  });

  const data = useMemo(() => {
    return rawData && UIDs ? processData(rawData, UIDs) : [];
  }, [rawData, UIDs]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full p-4 bg-neutral-700 text-neutral-200">
        On March 10, 2023, the Johns Hopkins Coronavirus Resource Center ceased
        its collecting and reporting of global COVID-19 data. For more info, see{" "}
        <a
          className="underline"
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          here
        </a>
        .
      </div>

      {isError && <div>Error...</div>}

      {(isLoading || rawData?.mergedData?.length === 0 || !UIDs) && (
        <div>Loading...</div>
      )}

      {rawData?.mergedData?.length > 0 && Object.entries(data) !== 0 && (
        <div className="max-w-screen-xl w-full m-auto flex flex-col gap-4 p-4">
          <Chart data={data} counties={rawData.counties} UIDs={UIDs} />
          <CountySelector counties={rawData.counties} />
          <Table data={data} counties={rawData.counties} UIDs={UIDs} />
        </div>
      )}
      <div className="flex-grow"></div>
      <footer className="p-1">
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          JHU CSSE COVID-19 Data
        </a>
      </footer>
    </div>
  );
}

export default App;
