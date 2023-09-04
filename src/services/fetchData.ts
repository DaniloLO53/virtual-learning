import axios from "axios";
import { verifyAuth } from "./verifyAuth";

type Method = 'get' | 'post' | 'put' | 'delete';
type Role = 'student' | 'teacher';
type Args = [path: string, method: Method, payload?: any, signInRole?: Role, customConfig?: any];

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

  // const config: Config = {
  //   headers: {
  //     role: signInRole || ROLE,
  //     authorization: 'Bearer ' + TOKEN,
  //   },
  // }
  // if (customConfig) {
  //   config.headers =  { responseType: customConfig.responseType, ...config.headers,}
  // }
  // try {
  //   let response;
  //   if (method === 'post' || method === 'put') {
  //     const { data } = await axios[method](url, payload, config);
  //     response = data;
  //   } else {
  //     const result = await axios[method](url, config);

  //     console.log('RESULT', result)
  //     console.log('url', url)

  //     if (customConfig) return result;
  //     response = result.data;
  //   }
  //   console.log('data', response)
  //   return response;
  // } catch (error) {
  //   console.log('Error', error)
  // }

  try {
    const { data } = await axios({
      url: baseUrl + url,
      data: payload,
      method: method || 'get',
      headers
    });

    console.log('data', data);

    return data;
  } catch(error: any) {
    console.log('Error in fetching data');
  }
}