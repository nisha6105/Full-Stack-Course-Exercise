import axios from 'axios'

const baseurl='http://localhost:3001/persons'

const getAll=()=>{
    const request=axios.get(baseurl)
    return request
}

const create=newObject=>{
    const request=axios.post(baseurl,newObject)
    return request
}

export default { getAll, create }