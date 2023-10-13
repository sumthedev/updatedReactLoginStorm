import "./index.css";
import React from "react";

import Form from "./component/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "./component/Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
