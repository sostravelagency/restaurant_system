import axios from "axios"
import { API_URL } from "../../../config"

const stats_year= async (time)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/stats/year",
        method: "get",
        params: {
            time
        }
    })
    const result= await res.data
    return result
}

export default stats_year