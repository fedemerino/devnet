import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

export async function getUsersService() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching users");
  }
}

export async function loginService(username: string, password: string) {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 401, message: "Invalid password" };
    }
    const role = await prisma.role.findUnique({
      where: {
        id: user.roleId,
      },
    });
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: role?.name,
    };

    return { status: 200, message: "Login successful", data };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while logging in user");
  }
}

export async function signUpService(
  username: string,
  email: string,
  password: string,
  roleId: number
) {
  try {
    if (!username || !email || !password || !roleId) {
      return { status: 400, message: "Please provide all fields" };
    }
    const mailExists = await getUserByEmail(email);
    if (mailExists) {
      return { status: 409, message: "This email has already been taken" };
    }
    const usernameExists = await getUserByUsername(username);
    if (usernameExists) {
      return { status: 409, message: "This username has already been taken" };
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: { connect: { id: roleId } },
      },
    });
    if (!user) {
      return {
        status: 500,
        message: "An error occurred while signing up user",
      };
    }
    return { status: 201, message: "User created successfully", data: user };
  } catch (error: any) {
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
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching user");
  }
}

async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching user");
  }
}
