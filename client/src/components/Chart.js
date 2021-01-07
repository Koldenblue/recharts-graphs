import React from 'react';
import * as Recharts from "recharts/umd/Recharts";
import Container from 'react-bootstrap/Container';
const Area = Recharts.Area;
const LineChart = Recharts.LineChart;
const Line = Recharts.Line;
const CartesianGrid = Recharts.CartesianGrid;
const XAxis = Recharts.XAxis;
const YAxis = Recharts.YAxis;
const Tooltip = Recharts.Tooltip;
const ResponsiveContainer = Recharts.ResponsiveContainer;

export default function Chart(props) {

  // problem: the tooltip only displays numbers, but not labels? apparently this could be changed?
  // legend?
  if (typeof(props.data) === 'number') {
    console.log(props.data)
  } else {
    const data = [
      { name: 'january', facebook: 400, ig: 2400, twitter: 1400 },
      { name: 'feb', facebook: 500, ig: 3000, twitter: 2400 },
      { name: 'march', facebook: 700, ig: 1000, twitter: 900 },
      { name: 'april', facebook: 1700, ig: 1200, twitter: 200 }
    ]
  }

  return (
    <Container>
      <div className='chart-container'>
        <h1 className='text-center'>TOTAL LIKES</h1>
        {/* // use Responsive container component to adjust to parent container size? however, it seems to crash the app*/}
        {/* <ResponsiveContainer width={700} height='80%'> */}

        {/* // the margins let the axis labels extend beyond the chart */}
        {/* // This can be adjusted with window size? also according to number of data points? */}
          <LineChart data={data} width={900} height={700} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="facebook" stroke="chartreuse" />
            <Line type='monotone' dataKey='ig' stroke='crimson' />
            <Line type='monotone' dataKey='twitter' stroke='#0000FF' />

            {/* first num is strokeDasharray is stroke size. Second num is space between strokes*/}
            <CartesianGrid stroke="rebeccapurple" strokeDasharray="3 3" />

            {/* dataKey will be what appears on the x axis */}
            <XAxis dataKey="name" />
            <YAxis />

            {/* no additional params needed for tooltip to display data points from data object */}
            <Tooltip />
          </LineChart>

        {/* </ResponsiveContainer> */}
      </div>
    </Container>
  )
}