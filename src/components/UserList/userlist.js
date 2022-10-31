/* eslint-disable array-callback-return */

import React, { useState, useEffect } from 'react';
import { Button, Card, Pagination,Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'

import "../../App.css"
import { deleteAPI, getAPI } from '../../methodsAPI'
import {upCouter} from '../../couterSlice'
import Filter from '../Filter/filter';
import CustomModale from '../CustomModal/customModale';

const { Meta } = Card;


function UserList() {
  const [data,setData] = useState([]) 
  const [total,setTotal] = useState(0)
  const [search,setSearch] = useState('')
  const [sorts,setSorts] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const couter = useSelector(state => state.couterReducer)
  const dispatch = useDispatch()
    useEffect(()=> {
        getAPI(`https://class.nodemy.vn/api/mock/users?page=${localStorage.getItem("page")}`, (res) => {
          setData(res.data.data)
          setTotal(res.data.total)
        })
    },[couter])
    //Pagination
    function onChangePage(page,pageSize) {
      localStorage.setItem('page',page)
      getAPI(`https://class.nodemy.vn/api/mock/users?page=${page}&size=${pageSize}`, (res) => {
        setData(res.data.data)
        setTotal(res.data.total)
      })
    }
    //Delete
    const DeleteUser = (id) => {
      const mess = window.confirm('ban chac chua?')
      if(mess) {
        deleteAPI(`https://class.nodemy.vn/api/mock/users/${id}`,res => {
          //setCouter(couter + 1)
          dispatch(upCouter())
        })
      }
    }
  const showModal = () => {
    setIsModalOpen(true);
  };
  //createUser
  const handleOk = () => {
     setIsModalOpen(false);
};
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //filter
  const handleSorring = (e) => {
    setSorts(e.target.value)
    const value = e.target.value
    const newdata = data.sort((a,b) => {
     if(value === 'low') {
      return a.createdAt > b.createdAt ? 1:-1
    }
    if(value === 'hight') {
      return a.createdAt < b.createdAt ? 1:-1
    }
    })
    setData(newdata)
  }
    return ( 
       <div >
        
       <Input placeholder='Search...' value={search} onChange={e => {setSearch(e.target.value)}}/>
        <div className='pagination'>
          <Pagination defaultCurrent={1} total={total} onChange={onChangePage}/>;
          <Button type="primary" onClick={showModal}>
            Add User
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {/* Name:<Input type="text" value={newName} onChange={(e) => {setnewName(e.target.value)}} placeholder="Name change" />
            Email:<Input type="email" value={newEmail} onChange={(e) => {setnewEmail(e.target.value)}} placeholder="Email change" /> <br/>
            Image:<Input type="file"  onChange={(e) => {
                   fileImage = e.currentTarget.files[0]
                }}/> */}
               <CustomModale isbuton={false} isClassName={false} hide={setIsModalOpen}/>
          </Modal>
        </div>
        <Filter
          sort={sorts}
          sorting={handleSorring}
        />
         <div className='user_wrapper'>
            {/* <Outlet/> */}
            {data.filter(val =>{
              if(search === '') {
                return val
              }else if(val.name.toLowerCase().includes(search.toLowerCase())){
                return val
              }
            }).map(item => {
                return (
                  <Card 
                      key={item._id}
                        hoverable
                        style={{width: 230,}}
                        cover={<Link 
                                  style={{display:'block'}} 
                                  to={`/home/${item._id}`}
                              >
                                <img style={{height:'300px',width:'100%',objectFit: 'cover'}} 
                                  alt={item.name} src={item.avatar}/>
                              </Link>
                        }
                  >
                        <Meta title={item.name} description={item.email} /> <br/>
                        <Button onClick={() => {DeleteUser(item._id)}} type="primary">Delete</Button>  
                  </Card>  
                 )
            })}
        </div>
       </div>
     );
}

export default UserList;