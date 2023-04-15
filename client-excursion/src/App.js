import { Route, Routes } from "react-router-dom";
// import { lazy, Suspense } from "react";

import { AuthProvider } from './contexts/AuthContext';
import { ExcursionProvider } from "./contexts/ExcursionContext";
import { SearchProvider } from "./contexts/SearchContext";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Catalog from "./components/Catalog/Catalog";
import ExcursionDetails from './components/ExcursionDetails/ExcursionDetails';
import Logout from "./components/Logout/Logout";
import Page404 from './components/Page404/Page404';
import CreateExcursion from "./components/CreateExcursion/CreateExcursion";
import EditExcursion from "./components/EditExcursion/EditExcursion";
// import PrivateRoute from "./common/PrivateRoute";
import Search from "./components/Search/Search";
import ErrorBoundary from "./services/ErrorBoundary";
import ExcursionOwner from "./common/ExcursionOwner";

// const Catalog = lazy(() => import('./components/Catalog/Catalog'));

function App() {

  return (
    <AuthProvider>
      <Header />
      <ExcursionProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateExcursion />} />
            <Route element={<ExcursionOwner />}>
              <Route path="/excursions/:excursionId/edit" element={<EditExcursion />} />
            </Route>
            <Route path="/catalog" element={
              <ErrorBoundary fallback={<h1>Error Catalog</h1>}>
                <Catalog />
              </ErrorBoundary>
            } />
            <Route path="/catalog/:excursionId" element={<ExcursionDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </SearchProvider>
      </ExcursionProvider>
    </AuthProvider >
  );
}

export default App;
