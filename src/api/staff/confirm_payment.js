import axios from "axios"
import { API_URL } from "../../config"

const confirm_payment= async (order_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/paid/confirm",
        method: "post",
        data: {
            order_id
        }
    })
    const result= await res.data
    return result
}

export default confirm_payment