import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Chart from './Chart';

export default function ParamInput() {
const history = useHistory();
const [chart, setChart] = useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    let days = event.target[0].value
    setChart(
    <Chart days={days}></Chart>
    )
  }

  return (<>
  {chart}
  <form onSubmit={(event) => {handleSubmit(event)}}>
    <label for='date-range'>number of dates on x axis</label>
    <input type='text' id='date range'></input>
    <button type='submit'>submit</button>
  </form>
  </>)
}