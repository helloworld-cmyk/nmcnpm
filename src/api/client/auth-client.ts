import axios from "axios";

import { CLIENT_CONFIG } from "./base";

/* Client cho các API cần xác thực: token và làm mới phiên do interceptor xử lý. */
export const AuthClient = axios.create(CLIENT_CONFIG);