import axios from "axios";

import { CLIENT_CONFIG } from "./base";

/* Client cho các API công khai: không gắn token, không tự làm mới phiên. */
export const NoAuthClient = axios.create(CLIENT_CONFIG);