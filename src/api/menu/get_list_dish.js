import axios from "axios"
import { API_URL } from "../../config"

const get_list_dish= async ()=> {
    const res= await axios({
        url: API_URL+ "/menu/dish/",
        method: "get",

    })
    const result= await res.data
    return result
}

export default get_list_dish