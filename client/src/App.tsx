import { Routes, Route } from "react-router-dom";
import Header from "./layouts/header/Header";
import routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((item, index) => {
          return (
            <Route path={item.path} element={<item.element />} key={index} />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
