import axios from "axios";

type Method = 'get' | 'post' | 'delete';
type Args = [path: string, method: Method, payload?: any];

export async function fetchData(...args: Args) {
  const [path, method, payload] = args;
  const TOKEN = JSON.parse(localStorage.getItem('access_token') || '');
  const role = JSON.parse(localStorage.getItem('role') || '');

  const url = (process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string) + `${path}`;
  const config = {
    headers: {
      role,
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