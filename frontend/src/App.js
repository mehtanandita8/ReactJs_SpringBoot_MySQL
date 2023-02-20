import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result from './components/Result';
import Survey from './components/Survey';
import Welcome from './components/Welcome';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />}></Route>
          <Route exact path="/survey" element={<Survey />}></Route>
          <Route exact path="/result" element={<Result />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;