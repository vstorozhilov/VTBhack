import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import TransitionGroupExample from './Components/List';

export default function Feed(props) {

  const location = useLocation();

  // const [styles, api] = useSpring(() => ({ minHeight: '30%' }));

  // useEffect(()=>{
  //   api.start({ minHeight: '100%'});
  // })


  return (
      <div className="App">
        <div className="App-header">
          <TransitionGroupExample {...props}/>

        </div>
      </div>
  );
}

// export default App;
