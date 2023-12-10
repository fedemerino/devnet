import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();


export async function getUsersService(){
  try{
    const users = await prisma.user.findMany()
    return users
  }
  catch(error:any){
    throw new Error(error.message || "An error occurred while fetching users");
  }
}

export async function signUpService(username: string, email: string, password: string, roleId: number) {
  try {
    if(!username || !email || !password || !roleId){
      return {status: 400, message: "Please provide all fields"}
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return {status: 409, message: "User already exists"}
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: { connect: { id: roleId } }
      },
    });
    if (!user) {
      return {status: 500, message: "An error occurred while signing up user"}
    }
    return {status: 201, message: "User created successfully", data: user}
  } catch (error:any) {
    throw new Error(error.message || "An error occurred while signing up user");
  }
}

async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error:any) {
    throw new Error(error.message || "An error occurred while fetching user");
  }
}
