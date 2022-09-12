import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const create = newObject => {
    //console.log(newObject)
    const request = axios.post(baseUrl, newObject)
    //console.log(request)
    return request.then(response => response.data)
}

const delitem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const AssignObject = { getAll, update, create, delitem }
export default AssignObject
// these two lines I do like this because if I use just the line below it raises warnings
// export default { getAll, update, create, delitem }
// the warning I get is: 
    // Assign object to a variable before exporting as module default  import/no-anonymous-default-export
// The warning is now gone but do I really understand why this works like this... Nope :D
// In another project (notes example project) it works without these warnings
