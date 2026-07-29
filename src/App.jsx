import { Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import DownloadPage from "./pages/DownloadPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
