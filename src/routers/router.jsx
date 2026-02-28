import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainLayout } from "../layouts/MainLayout";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
