import { useState } from "react";
import {Input, message} from 'antd'
import {PutAPI,PostAPI} from '../../methodsAPI'
import {useDispatch,useSelector} from 'react-redux'
import {upCouter} from '../../couterSlice'

export const newdata = new FormData()

function CustomModale({isbuton,id,isClassName,hide}) {
    const [nameChange,setNameChange] = useState('')
    const [emailChange,setEmailChange] = useState('')
    const couter = useSelector(state => state.couterReducer)
    const dispatch = useDispatch()
    let fileImage
    const handleUpdate = () => {
    if(!nameChange || !emailChange) {
        message.error('vui long nhap day du cac truong')
    }
        
        newdata.append('name',nameChange)
        newdata.append('email',emailChange)
        newdata.append('myFile',fileImage)
        newdata.append('password',Math.random())

        PutAPI(`https://class.nodemy.vn/api/mock/users/${id}`,newdata,
        res => {
            dispatch(upCouter(couter))
            message.success('Update thanh cong')
        })
     }
     const handleCreate = () => {
        if(!nameChange || !emailChange) {
            message.error('vui long nhap day du cac truong')
        }else{

            const newdata = new FormData()
            newdata.append('name',nameChange)
            newdata.append('email',emailChange)
            newdata.append('myFile',fileImage)
            newdata.append('password',Math.random())
            PostAPI(`https://class.nodemy.vn/api/mock/users`,newdata,res => {
               dispatch(upCouter(couter))
            })
            message.success('tao thanh cong')
            hide(false)
             }
        }
    return ( 
        <div className={isClassName ? 'body' : ''}>
            Name:<Input type="text" value={nameChange} onChange={(e) => {setNameChange(e.target.value)}} placeholder="Name change" />
            Email:<Input type="email" value={emailChange} onChange={(e) => {setEmailChange(e.target.value)}} placeholder="Email change" /> <br/>
            Image:<Input type="file"  onChange={(e) => {
                fileImage = e.currentTarget.files[0]
            }}/>
           {isbuton? (<button onClick={() => {handleUpdate()}}>Updata</button>):
                     (<button onClick={() => {handleCreate()}}>Ok</button>)
           }
        </div>
     );
}

export default CustomModale;