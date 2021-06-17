import './App.css';
import { Route, Switch } from "react-router-dom";
import MainContent from './feed/MainContent';
import LandingPage from "./portal/LandingPage";
import Portal from "./portal/Portal";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/portal/:type">
                    <Portal />
                </Route>
                <Route path="/feed">
                    <MainContent />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
