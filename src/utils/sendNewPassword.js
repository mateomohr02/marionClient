import axios from "axios";

export const sendNewPassword = async ( password, token) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/recovery/${token}`,
        { password },
      )

    const { data } = response;

      console.log(response, 'response');
      

    console.log(data, 'data');
    
    return data;
}