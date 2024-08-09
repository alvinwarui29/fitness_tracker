
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
