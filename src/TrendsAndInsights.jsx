import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useTransition, animated } from 'react-spring';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { display, keys } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Delete from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import RecipeReviewCard from "./Components/News";


export default function TrendsAndInsights(props) {


  const [trends, setTrends] = useState(['Мобилизованными гражданами право',
  'налоговики вы исправите',
  'мобилизации бухгалтерскую налоговую',
  'международные перевозки грузов',
  'импортировать товары какие']);
  const [insights, setInsights] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [extsources, setextSources] = useState([]);

  async function getInsights() {
    let response = await fetch('http://82.146.37.120:8080/documents?insight=True');
    let JSresponse = await response.json();
    setextSources(Array.from((new Set(JSresponse.map(item=>(item.link.split('/')[2])))).values()));
    setInsights(JSresponse.map(item=>({title : item.title,
      link : item.link,
      published : item.published,
      summary : item.ds_insight.insight,
      repost_cnt : item.repost_cnt})));
  }

  const transitions = useTransition(
    props.value,
  {
    from : {opacity : 0, transform : 'translateY(100%)'},
    enter : {opacity : 1, transform : 'translateY(0%)'},
    keys: (item)=>(props.value.indexOf(item)),
    delay : (key)=>(200 + 50 * key)
  });

  const insightsTransitions = useTransition(insights, {
    from : {opacity : 0, transform : 'translateY(100%)'},
    enter : {opacity : 1, transform : 'translateY(0%)'},
    keys: (item)=>(insights.indexOf(item)),
    delay : (key)=>(400 + 30 * key)
  });

  const SampleDialog = (props) => {
    const [sources, setSources] = useState(extsources);

    const sourcesTransitions = useTransition(
      sources,
    {
      from : {opacity : 0, transform : 'translateY(100%)'},
      enter : {opacity : 1, transform : 'translateY(0%)'},
      keys: (item)=>(sources.indexOf(item)),
      delay : (key)=>(300 + 100 * key)
    });

    return <Dialog open={props.open}>
        <DialogTitle sx={{
          backgroundColor : 'blue',
          color : '#ffffff',
          display : 'flex',
          justifyContent : 'space-between'
        }}><span>Настройки</span>
          <IconButton onClick={(e)=>{
            setOpen(!open);
          }}>
            <CloseIcon sx={{color : 'white'}}/>
          </IconButton>
        </DialogTitle>
      <DialogContent sx={{
        backgroundColor : 'white',
        padding : '0',
        overflowY : 'hidden'
      }}>
        <div style={{
          width : '400px',
          height: '500px',
          overflowY : 'scroll',
          backgroundColor : 'white'
        }}>
        <Grid container
        direction='column'
        alignItems='center'
        wrap='nowrap'
        gap={2}
        sx={{
          width: '100%',
          zIndex : '1',
          paddingTop : '10px'
          }}>
            {sourcesTransitions((styles, item)=>(
              <animated.div style={{
              width : '90%',
              height : '40px',
              display : 'flex',
              justifyContent: 'center',
              ...styles}}>
              <Grid container
              justifyContent='space-between'
              alignItems='center'
              sx={{width : '90%',
                height : '40px',
                borderRadius : '10px',
                backgroundColor : 'blue',
                paddingRight : '10px',
                paddingLeft : '10px'}}>
                  <div style={{color : '#ffffff'}}>
                    {item}
                  </div>
                  <IconButton onClick={(e)=>{
                    setSources((prev)=>{
                      let newArr = [...prev];
                      newArr.splice(newArr.indexOf(item), 1);
                      return newArr;
                    }
                    );
                  }}>
                    <Delete sx={{color : '#ffffff'}}/>
                  </IconButton>
              </Grid>
              </animated.div>
            ))}
        </Grid>
        </div>
        <div style={{backgroundColor : 'white',
        marginTop : '30px',
        color : 'white',
        display : 'flex',
        justifyContent : 'center'}}>
          <Button variant="contained" sx={{width : '90%',
          borderRadius : '10px',
          marginBottom : '10px'}}>Добавить новый источник</Button>
        </div>
        <div style={{backgroundColor : 'white',
        color : 'white',
        display : 'flex',
        marginBottom : '10px',
        justifyContent : 'center'}}>
          <Button variant="outlined" sx={{
            width : '90%',
            borderRadius : '10px',
            marginBottom : '10px'
            }}>
            Подключить telegram-канал</Button>
        </div>
      </DialogContent>
    </Dialog>
  }

  useEffect(()=>{
    getInsights();
  }, []);

  return (
    <>
    <SampleDialog open={open}/>
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor : 'blue'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton sx={{color : '#ffffff'}} onClick={(e)=>{setOpen(true)}}>
            <SettingsIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container
    direction='row'
    alignItems='center'
    gap="30px"
    justifyContent='center'
    sx={{
      width : '100%',
      height : '100%'
    }}>
      <Grid item sx={{
        width:'40%',
        height: '80%',
        backgroundColor : '#1c56e9a6',
        borderRadius: '30px',
        overflowY : 'scroll'
      }}>
        <div style={{
          marginTop: '10px',
          marginBottom: '20px',
          color : '#ffffff',
          textAlign: 'center'
        }}>
          Инсайты
        </div>
        <Grid container
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap="10px"
        sx={{width : '100%'}}>
          {insightsTransitions((styles, item)=>(
            <animated.div style={{width: '90%', display: 'flex', justifyContent : 'center', ...styles}}>
              <RecipeReviewCard role={item.link} date={new Date(item.published).toLocaleDateString('ru-RU')} setNews={setInsights} item={item} news={insights} title={item.title} summary={item.summary}/>
            </animated.div>))}
        </Grid>
      </Grid>
      <Grid item sx={{
        width:'40%',
        height: '80%',
        backgroundColor : '#1c56e9a6',
        borderRadius: '30px',
        overflowY : 'scroll'
      }}>
        <div style={{
          marginTop: '10px',
          marginBottom: '20px',
          color : '#ffffff',
          textAlign: 'center'
        }}>
          Тренды
        </div>
        <Grid container
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        gap="10px"
        sx={{width : '100%'}}>
          {transitions((styles, item)=>(
            <animated.div style={{
              width: '100%',
              height : '40px',
              display: 'flex',
              justifyContent : 'center',
              ...styles}}>
              <Grid id='id' container
              onClick={(e)=>{
                if (e.target.id === 'id'){
                  props.setSelectedTrend(item);
                  navigate('/lol');
                }
              }}
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                //background: 'linear-gradient(to right, #2b04ae, #2b04ae)',
                backgroundColor : '#2b04ae',
                width : '90%',
                height : '40px',
                borderRadius: '10px'
              }}>
                <div style={{
                  paddingLeft : '10px',
                  color : 'white'
                }}>
                  {item}
                </div>
                <IconButton onClick={(e)=>{
                props.setValue((prev)=>{
                  let newArr = [...prev];
                  newArr.splice(newArr.indexOf(item), 1);
                  return newArr;
                })
              }}>
                  <ThumbDownIcon fontSize="small" sx={{color : 'white'}}/>
                </IconButton>
              </Grid>
            </animated.div>))}
        </Grid>
      </Grid>
    </Grid>
    </>
  )
}