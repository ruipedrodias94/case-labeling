import Login from "../login/Login";
import Main from "../main-page/Main";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />

          <Route
            path="/image-overview"
            render={(props) => <Main {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
