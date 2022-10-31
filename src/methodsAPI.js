import axios from "axios"

export const getAPI = (url,success) => {
    axios.get(url,{
        headers: {
          Authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      },)
        .then(res => {
          success(res)
      })
        .catch(error => console.log(error))   
}
export const deleteAPI = (url,success) => {
  axios.delete(url,{
      headers: {
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }
    },)
      .then(res => {
        success(res)
    })
      .catch(error => console.log(error))   
}
export const PostAPI = (url,data,success,failure = ()=>{}) => {
  axios.post(url,data,{
      headers: {
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }
    },)
      .then(res => {
        success(res)
    })
      .catch(error => failure(error))   
}
export const PutAPI = (url,data,success) => {
  axios.put(url,data,{
      headers: {
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
      }
    },)
      .then(res => {
        success(res)
    })
      .catch(error => console.log(error))   
}