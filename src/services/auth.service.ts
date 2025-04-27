import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface LoginData {
  email: string;
  username: string;
  password: string;
}

interface LoginSuccess {
  token: string;
}

type LoginCallback = (success: boolean, payload: string | Error) => void;

// https://fakestoreapi.com/users
// token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXIiOiJqb2huZCIsImlhdCI6MTc0NTc0Njg0M30.gwKofr7agOfOkOt7jDW5JdrXWyRngw0YHQGxHGyyOnc"
// https://jwt.io/

export const login = (data: LoginData, callback: LoginCallback) => {
  axios.post<LoginSuccess>("https://fakestoreapi.com/auth/login", data)
    .then((res) => {
      callback(true, res.data.token);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getUsername = (token: string) => {
  const decoded: {iat: number, sub: number, user: string} = jwtDecode(token);
  console.log(decoded);
  return decoded.user;
}