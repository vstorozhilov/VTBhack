import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ListItemIcon from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';
import RecipeReviewCard from './News';
import { useTransition, animated } from 'react-spring';

const FRUITS = [
  'Any',
  'role1',
  'role2',
  'role3',
  'role4',
  'role5'
];

function renderItem({ item, setIsExpanded, setFruitsInBasket, setRole }) {

  const handleSelectItem = () => {
    setIsExpanded(false);
    setRole(item);
    setFruitsInBasket([]);
  };

  return (
    <ListItemButton onClick={handleSelectItem}>
      <ListItemText primary={item} />
    </ListItemButton>
  );
}

export default function TransitionGroupExample(props) {
  const [fruitsInBasket, setFruitsInBasket] = React.useState([]);
  const [role, setRole] = React.useState('Any');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [news, setNews] = React.useState([]);

  async function getNews() {
    let response = await fetch('http://82.146.37.120:8080/documents');
    let JSresponse = await response.json();
    setNews(JSresponse.map(item=>({title : item.title,
      published : item.published,
      summary : item.summary,
      repost_cnt : item.repost_cnt})));
  }

  React.useEffect(()=>{
    getNews();
  }, [])

  const handleAddFruit = () => {
    setIsExpanded(!isExpanded);
    setFruitsInBasket((!isExpanded ? FRUITS : []));
  };

  const addFruitButton = (
    <ListItemButton onClick={handleAddFruit} sx={{flexGrow: 0}}>
      <ListItemText primary={<div><span>{`Select your role: `}</span><span style={{fontWeight : '800'}}>{`${role}`}</span></div>}/>
      {isExpanded ? <ExpandLess/> : <ExpandMore/>}
    </ListItemButton>
  );

  const transitions = useTransition(news, {
    from : {opacity : 0, transform : 'translateY(100%)'},
    enter: {opacity : 1, transform : 'translateY(0%)'},
    //leave: {opacity : 0},
    delay : (key)=>(200 + key * 100),
    config : {duration : 250}
  })

  return (
    <div style={{width: '100%',
    display : 'flex',
    flexDirection: 'column',
    height: '100%'}}>
      <Box sx={{overflowY: 'scroll', height : '100%', scrollBehavior: 'smooth'}}>
        <List sx={{padding : '0',
        display : 'flex', 
        flexDirection : 'column',
        alignItems : 'center',
        padding: '16px',
        gap: '16px'}}>
          {transitions((styles, item)=>(
            <animated.div style={{width : '95%', ...styles}}>
              <RecipeReviewCard role={item.repost_cnt} date={new Date(item.published).toLocaleDateString('ru-RU')} setNews={setNews} item={item} news={news} title={item.title} summary={item.summary}/>
            </animated.div>
          ))}
          {/* {news.map(()=>(<RecipeReviewCard role='role'/>))} */}
        </List>
      </Box>
    </div>
  );
}
