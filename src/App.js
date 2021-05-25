import "./App.css";
import { useQuery } from "react-query";

import { usConfirmed, queryOptions } from "./constants";
import { getData } from "./utils";

function App() {
  const { isLoading, isError, data, error } = useQuery(
    "usConfirmed",
    () => getData(usConfirmed),
    queryOptions
  );

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ul>
            {data
              .filter((row) => row.Province_State === "New Jersey")
              .map((row) => (
                <li key={row.Combined_Key}>{JSON.stringify(row)}</li>
              ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
