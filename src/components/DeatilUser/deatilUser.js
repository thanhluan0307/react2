
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from 'antd';
import React from 'react';
import { getAPI} from '../../methodsAPI'
import { useSelector } from "react-redux";
import CustomModale from "../CustomModal/customModale";
const { Meta } = Card;

function DeatilUser() {
    const {userID} =useParams()
    const [deatilUser,setDeatilUser] = useState({})
    const couter = useSelector(state => state.couterReducer)

    useEffect(()=>{
        getAPI(`https://class.nodemy.vn/api/mock/users/${userID}`,
                res => {setDeatilUser(res.data.data)}
            )
    },[userID,couter])
   const showbody = () => {
      const bodyElement = document.querySelector('.body')
      bodyElement.style.opacity = 1
      bodyElement.style.marginTop = 0 
   }

    return ( 
        <div className="user-wrapper">
             <Card 
                hoverable
                style={{width: 230,}}
                cover={<img style={{height:'300px',objectFit: 'cover'}} 
                        alt={deatilUser.name} 
                        src={deatilUser.avatar}/>
                      }
            >
                <Meta title={deatilUser.email} description={deatilUser.name}/> <br/>
                <Button onClick={showbody}>Edit</Button>
            </Card>
            <CustomModale isbuton={true} id={deatilUser._id} isClassName={true}/>
        </div>
     );
}

export default DeatilUser;