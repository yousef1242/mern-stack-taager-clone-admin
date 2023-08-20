import axios from "axios";


const requestAdmin = axios.create({
  baseURL: "https://mern-stack-taager-clone-server.onrender.com",
});

export default requestAdmin;