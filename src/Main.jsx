import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import TwoWindow from './Components/TwoWindow';

function App(props) {

  const location = useLocation();

  return (
      <div className="App">
        <div className="App-header">
          <TwoWindow value={props.value}
          setValue={props.setValue}
          selectedTrend={props.selectedTrend}
          setSelectedTrend={props.setSelectedTrend}/>
        </div>
      </div>
  );
}

export default App;
