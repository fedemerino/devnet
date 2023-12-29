import { Request, Response } from "express"
import { signUpService, getUsersService, loginService} from "../services/users.service";


export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await getUsersService()
    return res.status(200).send(users)
  } catch (error:any) {
    return res.status(500).json({message: error.message || "An error ocurred while fetching users"})
  }
}

export async function login(_req:Request, res:Response){
  try {
    const { username, password } = _req.body
    if (!username || !password){
      return res.status(400).json({message: "Username and password are required"})
    }
    const login = await loginService(username, password)
    if (login.status !== 200){
      return res.status(login.status).json({message: login.message})
    }
    return res.status(login.status).json({message: login.message, data: login.data})
  } catch (error:any) {
    return res.status(500).send({message: error.message || "An error ocurred while logging in user"})
  }
}

export async function signUp(_req: Request, res:Response){
  try {
    const { username, email, password, role } = _req.body
    const signUp = await signUpService(username, email, password, role)
    if (signUp.status !== 201){
      return res.status(signUp.status).json({message: signUp.message})
    }
    return res.status(signUp.status).json({message: signUp.message, data: signUp.data})
  } catch (error:any) {
    return res.status(500).json({message: error.message || "An error ocurred while signing up user"})
  }
}