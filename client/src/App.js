import React, { useState, useEffect } from 'react';
import { setCurrentUser, selectCurrentUser } from './redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Home from './components/Home';
import FourOhFour from './components/FourOhFour';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  let currentUser = useSelector(selectCurrentUser);

  // upon route switch, gets user info if already logged in (otherwise redux store state is reset to initial value on page reload)
  useEffect(() => {
    // get user login info, then set redux state. loading is true until login info is retrieved
    axios.get("/api/userdata").then(({ data }) => {
      if (data) {
        dispatch(setCurrentUser(data));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
    })
    // according to redux docs, dispatch function identity is stable and therefore doesn't need to be included in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   axios.get("https://graph.facebook.com/177668063932282/reactions?access_token=EAAGpCqsEOeIBAMWRgWPpu8TbuhbqfLRTLp8JKWaAebG3FEfExwg3cFHpUZC9IAvv2stKPgh7MLwti726QIHZCay3hGHCkjKv6mmuRvNZCsvaHCaEaOPh8c90qFc4PMMzC06R0dBHZChMa9mEjhZAIPL78WZBlUwBM0jKlUWFQRmHS5e7DHUffNshfx7VASPh0ZD").then((data) => {
  //     console.log(data)
  //   })
  // })

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path='/' component={Home} />

          {/* Any path not listed above returns 404 */}
          <Route path='/'>
            <FourOhFour />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
