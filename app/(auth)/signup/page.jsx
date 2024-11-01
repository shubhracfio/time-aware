import Signup from "./Signup";

export const generateMetadata = async () => {
  return { title: 'Signup | Cashflowy Timeaware' }
}

export default async function Page() {
  return <Signup />
}
