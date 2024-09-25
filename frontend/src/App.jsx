import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./providers/app-context";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from './pages/dashboard';

function App() {
  return (
    <AppContextProvider>
      <Router> {/* Make sure there's only one Router here */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
