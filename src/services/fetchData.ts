import axios from "axios";
import { verifyAuth } from "./verifyAuth";

type Method = 'get' | 'post' | 'put' | 'delete';
type Role = 'student' | 'teacher';

interface Headers {
  [key: string]: any,
  role?: Role,
  authorization?: string,
  responseType?: string
}

interface AxiosConfig {
  url: string;
  headers?: Headers;
  method?: Method;
  payload?: any;
}

export async function fetchData(axiosConfig: AxiosConfig) {
  const { access_token, role } = verifyAuth();
  let { url, payload, method, headers } = axiosConfig;

  const baseUrl = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string);

  headers = {
    ...headers,
    role,
    authorization: 'Bearer ' + access_token,
  }

  try {
    const { data } = await axios({
      url: baseUrl + url,
      data: payload,
      method: method || 'get',
      headers
    });

    return data;
  } catch(error: any) {
    console.log('Error in fetching data', error);
  }
}