import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
const AUTH_TOKEN = "Bearer token";

const baseUrl = "https://api.ntsatest.mobitill.com";

const sampleGet = async () => {
  axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  const fileUrl = baseUrl + "/limiter-certificates";
  console.log(fileUrl);
  const response = await axios.get(fileUrl, {
    responseType: "blob",
    params: {
      certificate_url: "limiter-certificates/file-1653304869333.pdf"
    }
  });
  const blob = new Blob([response.data], {
    type: response.headers["content-type"]
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileUrl;
  link.setAttribute("download", "cert_test-1653289276933.pdf");
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
};
const samplePost = async () => {
  const result = await axios.post(baseUrl + "/posts", {
    sampleData: "nabezap"
  });
  console.log(result);
};
const sampleDelete = async () => {
  const result = await axios.delete(baseUrl + "/posts/4");
  console.log(result);
};

function App() {
  return (
    <div className="App">
      <button onClick={sampleGet}>Download</button>
      <button onClick={samplePost}>POST</button>
      <button onClick={sampleDelete}>DELETE</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
