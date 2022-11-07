import axios from "axios";
import { BASE_URL, BASE_LOCAL } from "@env";

const api = axios.create({
    baseURL: BASE_LOCAL
})

export { api };