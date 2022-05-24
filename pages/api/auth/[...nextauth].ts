import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const herokuUrl = 'https://capstone-backend-0957-11-v2.herokuapp.com'
const localUrl = 'http://localhost:4000'
const url = `${herokuUrl}/auth/signin`

export default NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email",placeholder:"email"},
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials,req) {
                if(!credentials) {
                    return null
                }
                try{
                    const user = await axios.post(url,{
                        email:credentials.email,
                        password: credentials.password
                    })
                    console.log(user.data)
                    return user.data
                } catch (err) {
                    console.log(err)
                    return  null
                }
            },
        })
    ],
    callbacks:{
        jwt: ({token,user})=>{
            console.log('Jwt user',user)
            if(user) {
                token.accessToken = user.access_token
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        session:({session,token,user})=>{
            session.accessToken = token.accessToken
            console.log('Token in session',token)
            if(token.email) {
                session.email = token.email
            }
            if(token.role) {
                session.role = token.role
            }
            return session
        }
    },
    session:{
        maxAge:60*60 //1hr
    },
    secret:"secret",
    pages:{
        //signIn:"/api/auth/signin"
    }
})