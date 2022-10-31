import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import {Provider} from 'react-redux'
import UserList from './components/UserList/userlist';
import DeatilUser from './components/DeatilUser/deatilUser';
import Login from './components/Login/login';
import Layout from './components/Layout/layout';
import PrivateRouter from './components/PrivateRouter/privateRouter'
import { store } from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Layout/>}>
                <Route path='login' element={<Login/>}></Route>
                <Route path='home' element={<PrivateRouter> <UserList/>  </PrivateRouter>}/>
                <Route path='home/:userID' element={<DeatilUser/>}></Route>
              </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
