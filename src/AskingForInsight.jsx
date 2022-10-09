import { Grid } from "@mui/material"
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { Link, useNavigate } from 'react-router-dom';

export default function AskForInsight(props) {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const transitions = useTransition(props.value, {
    from : {opacity : 0, transform: 'translateY(-100%)'},
    enter: {opacity : 1, transform: 'translateY(0%)'},
    leave: {opacity : 0},
    config : {duration : 200}
  });

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
      color : '#000000',
      fontWeight: '800',
      fontSize : '2rem',
      color : 'blue'
    }}>
      ПРЕЖДЕ ЧЕМ МЫ ПОКАЖЕМ ВАМ САМЫЕ СВЕЖИЕ НОВОСТИ
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
      backgroundColor : '#1c56e9a6',
      borderRadius: '20px',
      color : '#ffffff',
      paddingBottom: '80px'
    }}>
      <Grid item sx={{paddingTop : '40px', fontSize : '1rem'}}>
        Какие инфоповоды будут полезны для вашего бизнеса?
      </Grid>
      {/* <Grid item>
        Напишите пару интересующих вас тем
      </Grid> */}
      <Grid item sx={{width : '500px'}}>
        <TextField label="Что-то очень полезное" variant="outlined"
        onKeyDown={(e)=>{
          if (e.code === 'Enter') {
            props.setValue((prev)=>prev.concat([e.target.value]));
            e.target.value = '';
          }
        }}
        sx={{
          width : '100%',
          borderRadius : '15px',
          '& .MuiInputBase-root' : {
            borderRadius: '10px'
          },
          '& .MuiOutlinedInput-notchedOutline' : {
            border: 'solid 2px #ffffff'
          },
          '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline' : {
            border: 'solid 2px #ffffff'
          },
          '&:hover .Mui-focused .MuiOutlinedInput-notchedOutline' : {
            border: 'solid 2px #ffffff'
          },
          '& .MuiOutlinedInput-notchedOutline:hover' : {
            border: 'solid 2px #ffffff'
          },
          '& .MuiInputLabel-root' : {
            color : '#ffffff',
            opacity: '0.6'
          },
          '& .MuiInputLabel-root.Mui-focused' : {
            color : '#ffffff',
            opacity: '0.6'
          },
          '&:hover .MuiInputBase-root fieldset': {
            borderColor: '#ffffff',
          },
          '& input': {
            color: '#ffffff',
          }
        }}/>
      </Grid>
      <Grid item sx={{
          width : '400px'
        }}>
        <List>
          {transitions((styles, item) => (
            <animated.div style={styles}>
              <ListItem disablePadding
              sx={{backgroundColor: 'blue',
              paddingLeft: '20px',
              height : '40px',
              borderRadius: '10px',
              marginBottom: '10px'}}
              secondaryAction={
                <IconButton
                onClick={(e)=>{props.setValue((prev)=>{
                  console.log('clicked');
                  let newarr = [...prev];
                  newarr.splice(newarr.indexOf(item), 1);
                  return newarr;
                  })
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
          onClick={()=>{navigate('/news')}}
          sx={{
            '&:hover' : {
              backgroundColor : '#ffffff'
            },
            color : 'blue',
            fontWeight: '700',
            position: 'absolute', 
            bottom : '30px',
            height: '50px',
            width: '500px',
            borderRadius : '20px',
            backgroundColor: '#ffffff',
            //color : '#000000'
          }}>ПРОДОЛЖИТЬ</Button>
        {/* </Link> */}
    </Grid>
  </Grid>
  )
}