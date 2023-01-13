import { Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Header from "./layouts/header/Header";
import routes from "./routes/Routes";
import AuthModal from "./features/auth/index";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import { useAppSelector } from "./hooks/useAppSelector";

export const socket = io("http://localhost:5000");

const App = () => {
  const { darkMode } = useAppSelector((state) => state.authModal);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="dark:!bg-zinc-900">
        <Header />
        <AuthModal />
        <Routes>
          {routes.map((item, index) => {
            if (item.protected) {
              return (
                <Route
                  path={item.path}
                  key={index}
                  element={<ProtectedRoute>{<item.element />}</ProtectedRoute>}
                />
              );
            } else {
              return (
                <Route
                  path={item.path}
                  element={<item.element />}
                  key={index}
                />
              );
            }
          })}
        </Routes>
      </div>
    </div>
  );
};

export default App;
