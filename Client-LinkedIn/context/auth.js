import { createContext } from "react";
const AuthContext = createContext({
  isSignedIn: false,
  setSignedIn: () => {},
  userId: null,
  // teori sementara, disini kaya dibuat inisiasi awal dari nilai nya userId
  setUserId: () => {},
});
export default AuthContext;
