import { useGlobalContext } from "../contexts/appcontext"
const Games = () => { 
  const {userInfo} = useGlobalContext()
  console.log(userInfo);
  return <>
    <h2>Games page</h2>
  </>
}

export default Games