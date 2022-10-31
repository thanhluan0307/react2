import { Navigate } from 'react-router-dom'

function PrivateRouter(props) {
    let token = localStorage.getItem('accessToken') || ''
   
    if ( token ) {
        return props.children
    }else {
        return <Navigate to='/login'></Navigate>
    }
}

export default PrivateRouter;