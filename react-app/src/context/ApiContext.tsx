import { createContext } from "react";
import { apiService } from "../services/api";

export const ApiContext = createContext(apiService);