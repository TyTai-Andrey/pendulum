import React from 'react';
import { keyframes } from "styled-components";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    width: 300,
    marginBottom: '50px'
  },
});


export const App = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    start: 0,
    length: 3,
    working: false,
    attraction: 10,
    time: 0
  })

 const pendulum = React.useRef(null);

let position = true

function pendulumGO () {
  if (state.working) {

      if (position) {
        pendulum.current.style.transitionDuration = `${state.time}s`
        pendulum.current.style.transform = `rotate(-${state.start}deg)`
        position = !position
        console.log(state.time)
      } else {
        pendulum.current.style.transform = `rotate(${state.start}deg)`
        position = !position
        console.log(position)
        console.log(state.time)
      }

    }
}

pendulumGO()

let newInterval = setInterval(pendulumGO, (state.time*1000))

function workingPendulum (action) {


  if (action === 'stop') {
    setState({...state, working: false})
    pendulum.current.style.transitionDuration = `1s`
    pendulum.current.style.transform = `rotate(${state.start}deg)`
    
  } else if (action === 'start') {
    setState({...state, working: true})
  }
  clearInterval(newInterval) 
}

  return (
    <>

      <div className='wrapper'>
        <div className="options">
          <div className="options-left">
            <div className={classes.root}>
              <Typography id="discrete-slider" gutterBottom>
                Начальная точка
              </Typography>
              <Slider
                defaultValue={state.start}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks
                onChange={(event,value)=>{setState({...state, start: value, time: 2*Math.PI*Math.sqrt(((state.length)/state.attraction))})}}
                min={0}
                max={110}
                step={10}
                disabled={state.working}
              />
              <Typography id="discrete-slider" gutterBottom>
                Длина нити (метры)
              </Typography>
              <Slider
                defaultValue={state.length}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks
                onChange={(event,value)=>{setState({...state, length: value, time: 2*Math.PI*Math.sqrt(((state.length)/state.attraction))})}}
                min={3}
                max={20}
                disabled={state.working}
              />
              <Typography id="discrete-slider" gutterBottom>
                Притяжение
              </Typography>
              <Slider
                defaultValue={state.attraction}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks
                onChange={(event,value)=>{setState({...state, attraction: value, time: 2*Math.PI*Math.sqrt(((state.length)/state.attraction))})}}
                min={5}
                max={15}
                disabled={state.working}
              />
            </div>
          </div>
          <div className="options-right">
            <Button 
            variant="contained" 
            color="primary" 
            href="#contained-buttons"
            disabled={state.working}
            onClick={()=>{workingPendulum('start')}}>
              Start
            </Button>
            <Button 
            variant="contained" 
            color="primary" 
            href="#contained-buttons"
            disabled={!state.working}
           onClick={()=>{workingPendulum('stop')}}>
              Stop
            </Button>
          </div>
        </div>

        <div className="pendulum">
          <div className="pendulum-cone"></div>
          <div className="pendulum-body" ref={pendulum} style={{transform: `rotate(${state.start}deg)`}}>
            <div className="pendulum-thread" style={{height: `${state.length*10}px`}}></div>
            <div className="pendulum-ball"></div>
          </div>
        </div>
        <div className="time">
          Время периода: <span>{state.time} секунд</span> 
        </div>
      </div>
    </>
  );
}