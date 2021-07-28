import axios from "axios";

export const API = axios.create({
  baseURL: "https://api-rn-todo.herokuapp.com/api/v1",
});
