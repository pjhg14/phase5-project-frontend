import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './components/App';
import userReducer from "./reducers/userReducer";

const userStore = createStore(userReducer)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={userStore}>
            <App/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
