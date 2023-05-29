import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FetchNoStyling from './pages/FetchNoStyling';
import './App.css';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/fetch-no-styling" element={<FetchNoStyling/>} />
    </Routes>
    </>
  );
}

export default App;
