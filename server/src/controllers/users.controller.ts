import { Request, Response } from "express"
import { signUpService, getUsersService } from "../services/users.service";


export async function getUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await getUsersService()
    res.status(200).send(users)
  } catch (error:any) {
    res.status(500).json({message: error.message || "An error ocurred while fetching users"})
  }
}

export async function signUp(_req: Request, res:Response): Promise<void>{
  try {
    const { username, email, password, role } = _req.body
    const signUp = await signUpService(username, email, password, role)
    if (signUp.status !== 201){
      res.status(signUp.status).json({message: signUp.message})
    }
    res.status(signUp.status).json({message: signUp.message, data: signUp.data})
  } catch (error:any) {
    res.status(500).json({message: error.message || "An error ocurred while signing up user"})
  }
}