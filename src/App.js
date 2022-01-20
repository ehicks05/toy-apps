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

  if (isError) return <div>Error...</div>;
  if (isLoading || rawData.length === 0 || !UIDs) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-xl m-auto flex flex-col gap-4 p-4">
      <Chart data={data} counties={rawData.counties} UIDs={UIDs} />
      <CountySelector counties={rawData.counties} />
      <Table data={data} counties={rawData.counties} UIDs={UIDs} />
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
