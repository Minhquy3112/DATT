

export interface SignUp{
  name: string;
  email: string;
  password: string;
  repPassword: string;
  role: string;

}

export interface SignIn{

  email: string;
  password: string;
  role: string;

}

export interface ListUser {
  name: string;
  email: string;
}
