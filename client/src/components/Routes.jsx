import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Auth from "./Auth";
import Chat from "./Chat";
import Register from "./Register";
const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
          <Route exact path="/" component={Chat} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Auth} />
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;