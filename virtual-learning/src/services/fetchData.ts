import axios from "axios";

type Method = 'get' | 'post' | 'delete';
type Role = 'student' | 'teacher';
type Args = [path: string, method: Method, payload?: any, signInRole?: Role];

export async function fetchData(...args: Args) {
  const [path, method, payload, signInRole] = args;
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
  const config = {
    headers: {
      role: signInRole || ROLE,
      authorization: 'Bearer ' + TOKEN
    },
  }
  try {
    let response;
    if (method === 'post') {
      const { data } = await axios[method](url, payload, config);
      response = data;
    } else {
      const { data } = await axios[method](url, config);
      response = data;
    }
    console.log('data', response)
    return response;
  } catch (error) {
    console.log('Error', error)
  }
}