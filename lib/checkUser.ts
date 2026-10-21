import { getServerUser } from "./auth-server";

export const checkUser = async () => {
  return await getServerUser();
};