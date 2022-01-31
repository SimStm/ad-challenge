import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './pages/_app/App';
import ListCampaigns from './routes/listCampaigns';
import AddNewCampaign from './routes/addNewCampaign';

const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route exact path="" element={<Navigate to="/list-campaigns" />} />
          <Route path="list-campaigns" element={<ListCampaigns />} />
          <Route path="add-campaign" element={<AddNewCampaign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
