import React from "react";
import ReactDOM from "react-dom";
import useSWR, { SWRConfig } from "@zeit/swr";
import fetch from "isomorphic-unfetch";

import "./styles.css";

async function fetch2(...args) {
  const resource = 0;
  const res = await fetch(...args);
  return await res.json();
}
function Profile() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users/",
    fetch2
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log("Found to do", data);
  return (
    <div>
      {data.map(todo => {
        return <p>{todo.name}</p>;
      })}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SWRConfig value={{ refreshInterval: 1000 }}>
        <Profile />
      </SWRConfig>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
