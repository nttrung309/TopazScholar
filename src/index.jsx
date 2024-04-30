import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.scss";
import { ConfigProvider } from "antd";
import { Provider } from 'react-redux';
import store from './redux/index';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              buttonSolidCheckedHoverBg: "#ced4da",
              buttonSolidCheckedColor: "black",
              buttonSolidCheckedActiveBg: "#dee2e6",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
