import axios from "axios";


export const sendRecoveryEmail = async (email, lang = 'es') => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/recovery`,
            { email, lang },
          )

        const { data } = response;
        return data;
}