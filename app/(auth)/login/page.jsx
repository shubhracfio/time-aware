// import manInMiddle from "@/lib/manInMiddle";
import Login from "./Login";

export const generateMetadata = async () => {
  return { title: 'Login | Cashflowy Timeaware' }
}

export default async function Page() {
  return <Login />
}
