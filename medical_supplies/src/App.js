import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {StrictMode} from "react";
import ProductCreate from "./components/product/ProductCreate";

function App() {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="product/create" element={<ProductCreate/>}/>
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
