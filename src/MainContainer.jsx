import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import AskForInsight from './AskingForInsight';
import ChooseTrends from './ChooseTrends';
import App from './Main';
import Feed from './App';
import TrendsAndInsights from './TrendsAndInsights';

export default function MainContainer() {
  const location = useLocation();
  const [insightTrends, setInsightTrends] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [trends, setTrends] = useState(['Мобилизованными гражданами право',
  'налоговики вы исправите',
  'мобилизации бухгалтерскую налоговую',
  'международные перевозки грузов',
  'импортировать товары какие']);

  const transitions = useTransition(location, {
    from : {transform : 'translateX(100%)'},
    enter : {transform : 'translateX(0%)'},
    leave : {transform : 'translateX(-100%)'}
  })

  return (
      transitions((styles, item)=>(
        <animated.div style={{height: '100%', width : '100%', position : 'absolute', overflowX : 'hidden', ...styles}}>
          <Routes location={item}>
            <Route path='/insights' element={<AskForInsight setValue={setInsightTrends} value={insightTrends}/>}/>
            <Route path='/news' element={<ChooseTrends trends={trends} setTrends={setTrends}/>}/>
            <Route path='/main' element={<TrendsAndInsights
            setValue={setTrends}
            value={trends}
            selectedTrend={selectedTrend}
            setSelectedTrend={setSelectedTrend}/>}/>
            <Route path='/lol' element={<Feed selectedTrend={selectedTrend}/>}/>
          </Routes>
        </animated.div>
        ))
  )
}