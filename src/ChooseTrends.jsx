import { Grid } from "@mui/material"
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { Link, useNavigate } from 'react-router-dom';

export default function ChooseTrends(props) {

  function getTrends() {

    fetch('http://82.146.37.120:8080/documents?limit=3', {
      mode : 'cors',
      method : 'GET'
    }).then(response=>{
      response.json().then(res=>{console.log(res)})
    });

    // let lol = await res.json();
    // console.log(lol);
  }

  const [items, setItems] = useState(['trend1', 'trend2', 'trend3', 'trend4', 'trend5', 'trend6']);
  const navigate = useNavigate();

  const transitions = useTransition(items, {
    from : {opacity : 0, transform: 'translateX(100%)'},
    enter: {opacity : 1, transform: 'translateX(0%)'},
    //leave: {opacity : 0},
    keys : item=>items.indexOf(item),
    delay : (key)=>(150 + key * 50),
    config : {duration : 200}
  });

  // useEffect(()=>{
  //   getTrends();
  // })

  return(
  <Grid container
  justifyContent='center'
  alignItems='center'
  direction='column'
  wrap='nowrap'
  gap={4}
  sx={{
    height : '100%',
    width : '100%',
    //backgroundColor: '#000000'
  }}>
    <Grid item sx={{
      color : '#ffffff',
      fontWeight: '800',
      fontSize : '2rem'
    }}>
      И ЕЩЁ КОЕ-ЧТО
    </Grid>
    <Grid container
    position='relative'
    gap={3}
    direction='column'
    justifyContent='flex-start'
    alignItems='center'
    wrap='nowrap'
    sx={{
      width : '700px',
      minHeight : '500px',
      backgroundColor : '#181a1f',
      borderRadius: '20px',
      color : '#ffffff',
      paddingBottom: '80px'
    }}>
      <Grid item sx={{paddingTop : '40px', fontSize : '1rem'}}>
        Подскажите, что было бы не так интересно для Вас?
      </Grid>
      {/* <Grid item>
        Удалите не интересующие Вас тренды
      </Grid> */}
      <Grid item sx={{
          width : '400px'
        }}>
        <List>
          {transitions((styles, item) => (
            <animated.div style={styles}>
              <ListItem disablePadding
              sx={{
              backgroundColor: 'blue',
              paddingLeft: '20px',
              height : '40px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
              secondaryAction={
                <IconButton
                onClick={(e)=>{setItems((prev)=>{
                  console.log('clicked');
                  let newarr = [...prev];
                  newarr.splice(newarr.indexOf(item), 1);
                  console.log(newarr);
                  return newarr;})
                }
                }
                edge="end"
                aria-label="delete">
                  <DeleteIcon sx={{color : '#ffffff'}}/>
                </IconButton>
              }>
                  <ListItemText primary={item}/>
              </ListItem>
            </animated.div>
          ))}
          {/* {items.map((item=>(
            <ListItem disablePadding
            sx={{backgroundColor: 'blue',
            paddingLeft: '20px',
            height : '40px',
            borderRadius: '10px',
            marginBottom: '10px'}}
            secondaryAction={
              <IconButton
              onClick={(e)=>{setItems((prev)=>{
                console.log('clicked');
                let newarr = [...prev];
                newarr.splice(newarr.indexOf(item), 1);
                return newarr;})
              }
              }
              edge="end"
              aria-label="delete">
                <DeleteIcon sx={{color : '#ffffff'}}/>
              </IconButton>
            }>
                <ListItemText primary={item}/>
            </ListItem>
          )))} */}
        </List>
      </Grid>
        {/* <Link to='/news'> */}
          <Button
          onClick={()=>{navigate('/main')}}
          sx={{
            '&:hover' : {
              backgroundColor : '#ffffff'
            },
            position: 'absolute', 
            bottom : '30px',
            height: '50px',
            width: '500px',
            borderRadius : '20px',
            backgroundColor: '#ffffff',
            color : '#000000'
          }}>ПРОДОЛЖИТЬ</Button>
        {/* </Link> */}
    </Grid>
  </Grid>
  )
}