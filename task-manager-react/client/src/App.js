import { useState, useEffect } from "react";

function App() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api");
      const data = JSON.stringify(await response.json());
      console.log(data);

      setApiData(data);
    })();
  })

  return (
    <>
      <h1>This is my frontend</h1>
      <div className="data">
        {apiData}
      </div>
    </>
  );
}

export default App;
