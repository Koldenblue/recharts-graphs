import React, { useState, useEffect } from 'react';
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
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])


  let data;
  // problem: the tooltip only displays numbers, but not labels? apparently this could be changed?
  // legend?
  if (typeof (parseInt(props.days)) === 'number') {
    console.log(props.days)
    let name = 0;
    let facebook = 0;
    let ig = 0;
    let twitter = 0;
    data = new Array(parseInt(props.days)).fill(null);
    console.log(data)
    data = data.map((i) => {
      return { name: name++, facebook: facebook += 20, ig: ig += 40, twitter: twitter += 30 }
    })
    console.log(data)
  } else {
    data = [
      { name: 'january', facebook: 400, ig: 2400, twitter: 1400 },
      { name: 'feb', facebook: 500, ig: 3000, twitter: 2400 },
      { name: 'march', facebook: 700, ig: 1000, twitter: 900 },
      { name: 'april', facebook: 1700, ig: 1200, twitter: 200 }
    ]
  }

  let styles = {
    tooltip: {
      backgroundColor: 'whitesmoke',
      opacity: '0.9'
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={styles.tooltip}>
          <p className="label">{`day ${label} : ${payload[0].value} likes`}</p>
          <p className="label">{`day ${label} : ${payload[1].value} likes`}</p>
          <p className="label">{`day ${label} : ${payload[2].value} likes`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
    return null;
  };

  // NOTE: if props.days gets past a certain number, the browser starts to slow and crash.
  // Therefore must limit date range


  return (
    <Container>
      <div className='chart-container'>
        <h1 className='text-center'>TOTAL LIKES</h1>
        {/* // use Responsive container component to adjust to parent container size? however, it seems to crash the app*/}
        {/* <ResponsiveContainer width={700} height='80%'> */}

        {/* // the margins let the axis labels extend beyond the chart */}
        {/* // This can be adjusted with window size? also according to number of data points? */}
        <LineChart data={data} width={width / 1.5} height={height / 1.5} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="facebook" stroke="chartreuse" />
          <Line type='monotone' dataKey='ig' stroke='crimson' />
          <Line type='monotone' dataKey='twitter' stroke='#0000FF' />

          {/* first num is strokeDasharray is stroke size. Second num is space between strokes*/}
          <CartesianGrid stroke="rebeccapurple" strokeDasharray="3 3" />

          {/* dataKey will be what appears on the x axis */}
          <XAxis dataKey="name" />
          <YAxis />

          {/* no additional params needed for tooltip to display data points from data object */}
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip /> */}

        </LineChart>

        {/* </ResponsiveContainer> */}
      </div>
    </Container>
  )
}