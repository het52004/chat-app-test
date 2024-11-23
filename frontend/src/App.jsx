import { useState } from "react";
import "./App.css";
import { axiosInstance } from "./lib/axios";

function App() {
  const [uniqueName, setUname] = useState();
  const [password, setPassword] = useState();
  async function handleSubmit() {
    const res = await axiosInstance.post("/api/auth/login", {
      uniqueName,
      password,
    });
    console.log(res);
  }
  return (
    <>
      <input
        type="text"
        name=""
        id=""
        placeholder="uname"
        onChange={(e) => setUname(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>submit</button>
    </>
  );
}

export default App;
