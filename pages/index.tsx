import type { NextPage } from 'next'
import {signIn, signOut, useSession} from "next-auth/react";
import {useEffect} from "react";

const Home: NextPage = () => {
  const {data:session} = useSession()

  if(session) {
    return <div>
      <p><> email:{session.email} </></p>
      <p><> role:{session.role}</></p>
      <button onClick={()=>signOut()} >Sign out</button>
      <button onClick={()=>{
      console.log(session)
      }
      } >print</button>
    </div>
  }

  return  <>
  <p>Not Signed In</p>
     <p> You can use any user credentials in the heroku</p>
     <p> For example: email: wsennay@gmail.com</p>
     <p> password: 12345678</p>
    <button onClick={()=>signIn("credentials")} >Sign in</button>
  </>

}

export default Home
