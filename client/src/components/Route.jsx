import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Chat from "./Chat";
import Register from "./Register";
const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component = {Chat}/>
                <Route exact path="/auth" component ={Auth}/>
                <Route exact path="/register" component = {Register}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;