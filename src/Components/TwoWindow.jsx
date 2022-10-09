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
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { TransitionGroup } from 'react-transition-group';
import RecipeReviewCard from './News';
import { useTransition, animated } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useState } from 'react';

export default function TwoWindow(props) {

  const [CommonTrends, setCommonTrends] = useState(['trend1', 'trend2', 'trend3', 'trend4']);
  const [insightTrends, setInsightTrends] = useState(['trend1', 'trend2', 'trend3', 'trend4']);

  const navigate = useNavigate();

  // const transitions = useTransition(CommonTrends, {
  //   from : {opacity : 0, transform: 'translateY(-100%)'},
  //   enter: {opacity : 1, transform: 'translateY(0%)'},
  //   leave: {opacity : 0},
  //   config : {duration : 200}
  // });

  return (
    <Grid container
    sx={{
      width: '100%',
      height: '100%'
    }}
    direction='row'
    wrap='nowrap'
    alignItems='center'
    gap={3}>
      <Grid item sx={{
        paddingTop: '20px',
        fontSize: '1.3rem'
      }}>
        Тренды
      </Grid>
      <div style={{
        borderRadius: '30px',
        paddingTop: '10px',
        backgroundColor: '#726969',
        width: '90%',
        height : '300px',
        overflowY: 'scroll'
      }}>
        <Grid container
        direction='column'
        alignItems='center'
        wrap='nowrap'
        gap={2}
        sx={{
          paddingTop: '20px',
          width : '100%'
        }}>
          {CommonTrends.map(item=>(
            <Grid id='id' item
              onClick={(e)=>{
                if (e.target.id === 'id') {
                  navigate('/lol');
                }
              }}
              sx={{
                position : 'relative',
                width : '80%',
                height : '60px',
                backgroundColor : 'black',
                paddingTop: '8px',
                paddingLeft: '15px',
                borderRadius: '19px'
              }}>
              <div style={{
                position : 'absolute',
                fontSize: '1.3rem'
                }}>
                {item}
              </div>
              <IconButton sx={{position: 'absolute', right: '10px', bottom: '7px'}}
              onClick={(e)=>{
                props.setSelectedTrend(item);

                setCommonTrends((prev)=>{
                  let newArr = [...prev];
                  newArr.splice(newArr.indexOf(item), 1);
                  return newArr;})
              }}>
                <ThumbDownIcon fontSize='medium' sx={{color : '#ffffff'}}/>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </div>
      <Grid item sx={{
        paddingTop: '20px',
        fontSize: '1.3rem'
      }}>
        Инсайтовые тренды
      </Grid>
      <div style={{
        borderRadius: '30px',
        paddingTop: '10px',
        backgroundColor: '#726969',
        width: '90%',
        height : '300px',
        overflowY: 'scroll'
      }}>
        <Grid container
        direction='column'
        alignItems='center'
        wrap='nowrap'
        gap={2}
        sx={{
          paddingTop: '20px',
          width : '100%'
        }}>
          {props.value.map(item=>(
            <Grid id='id' item
              onClick={(e)=>{
                if (e.target.id === 'id') {
                  navigate('/lol');
                }
              }}
              sx={{
                position : 'relative',
                width : '80%',
                height : '60px',
                backgroundColor : 'black',
                paddingTop: '8px',
                paddingLeft: '15px',
                borderRadius: '19px'
              }}>
                <div style={{
                  position : 'absolute',
                  fontSize: '1.3rem'
                }}>
                  {item}
                </div>
                  <IconButton sx={{position: 'absolute', right: '10px', bottom: '7px'}}
                  onClick={(e)=>{
                    props.setValue((prev)=>{
                      let newArr = [...prev];
                      newArr.splice(newArr.indexOf(item), 1);
                      return newArr;})
                  }}>
                    <ThumbDownIcon fontSize='medium' sx={{color : '#ffffff'}}/>
                  </IconButton>
            </Grid>
          ))}
        </Grid>
      </div>
      {/* <Box>
        related trends
        <List sx={{padding : '0', backgroundColor: '#000000', width: '50%', position: 'absolute', top: '48px', zIndex: 1}}>
          <TransitionGroup>
            {fruitsInBasket.map((item) => (
              <Collapse key={item}>
                {renderItem({ item, setIsExpanded, setFruitsInBasket, setRole })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box> */}
      {/* <Box sx={{overflowY: 'scroll', height : '100%', opacity : `${isExpanded ? '0.1' : '1'}`}}>
        <List sx={{padding : '0', display : 'flex',  flexDirection : 'column', alignItems : 'center', padding: '16px', gap: '16px'}}>
          {Cards.filter(item=>(item[1] === role || role === 'Any')).map(item=>item[0])}
        </List>
      </Box> */}
      <Grid item>

      </Grid>
    </Grid>
  );
}
