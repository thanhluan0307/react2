
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout,Button } from 'antd';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteUser} from '../../userSlice'
const { Header, Footer, Content } = Layout;

function Login() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector(state => state.userReducer.tkUser)
    const removeData = () => {
        localStorage.removeItem('acc')
        localStorage.removeItem('page')
        localStorage.removeItem('accessToken')
        dispatch(deleteUser())
        nav('/login')
    }
    return ( 
        <Layout>
            <Header style={{color:'white'}}>
                {!data ? (<Link to="login">Login</Link>) : (<div className='nav'>
                    <p>{`Welcome ${data.email}`}</p>
                    <Button onClick={removeData}>LogOut</Button>
                </div>)}
            </Header>
            <Content>
                <Outlet/>
            </Content>
            <Footer>Footer</Footer>
      </Layout>
     );
}

export default Login;