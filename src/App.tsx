import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitInvoice from "./pages/SubmitInvoice";
import InvestorDashboard from "./pages/InvestorDashboard";
import About from "./pages/About";

export default function App() {
  const [, setInvoices] = useState<any[]>([]);

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white" }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<SubmitInvoice setInvoices={setInvoices} />} />
          <Route path="/investor" element={<InvestorDashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}