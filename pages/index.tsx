import type { NextPage } from 'next'
import {signIn, signOut, useSession} from "next-auth/react";
import {useEffect} from "react";

const Home: NextPage = () => {
  const {data:session} = useSession()

  if(session) {
    return <>
     token: {session.role}
      <button onClick={()=>signOut()} >Sign out</button>
      <button onClick={()=>{
      console.log(session)
      }
      } >print</button>
    </>
  }

  return  <>
  Not Signed In
    <button onClick={()=>signIn("credentials")} >Sign in</button>
  </>

}

export default Home
