import axios from "axios";

type Method = 'get' | 'post' | 'put' | 'delete';
type Role = 'student' | 'teacher';
type Args = [path: string, method: Method, payload?: any, signInRole?: Role, customConfig?: any];

interface Config {
  headers: {
    role: Role,
    authorization: string,
    responseType?: string
  }
}

export async function fetchData(...args: Args) {
  const [path, method, payload, signInRole, customConfig] = args;
  let TOKEN;
  let ROLE;

  if (!localStorage.getItem('access_token') || !localStorage.getItem('role')) {
    TOKEN = '';
    ROLE = '';
  } else {
    TOKEN = JSON.parse(localStorage.getItem('access_token')!);
    ROLE = JSON.parse(localStorage.getItem('role')!);
  }

  const url = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `${path}`;
  const config: Config = {
    headers: {
      role: signInRole || ROLE,
      authorization: 'Bearer ' + TOKEN,
    },
  }
  if (customConfig) {
    config.headers =  { responseType: customConfig.responseType, ...config.headers,}
  }
  try {
    let response;
    if (method === 'post' || method === 'put') {
      const { data } = await axios[method](url, payload, config);
      response = data;
    } else {
      const result = await axios[method](url, config);

      console.log('RESULT', result)
      console.log('url', url)

      if (customConfig) return result;
      response = result.data;
    }
    console.log('data', response)
    return response;
  } catch (error) {
    console.log('Error', error)
  }
}