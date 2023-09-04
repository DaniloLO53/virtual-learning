export enum Roles {
  student = 'student',
  teacher = 'teacher',
}

export function verifyAuth() {
  const accessTokenFromLocalStorage = localStorage.getItem('access_token');
  const roleFromLocalStorage = localStorage.getItem('role');
  let parsedRole;

  try {
    if (!accessTokenFromLocalStorage) throw new Error('No access token');
    if (!roleFromLocalStorage) throw new Error('No role');

    parsedRole = JSON.parse(roleFromLocalStorage!);
    if (parsedRole !== Roles.student && parsedRole !== Roles.teacher) {
      throw new Error('Invalid role');
    }
  } catch (error: any) {
    console.log('ERROR', error.message)
  }
  const parsedToken = JSON.parse(accessTokenFromLocalStorage!);

  return {
    access_token: parsedToken as string,
    role: parsedRole as keyof typeof Roles,
  }
}