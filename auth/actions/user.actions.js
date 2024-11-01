"server-only"
import authDB from "@/auth/database"
import bcrypt from "bcrypt"

export async function getUserFromDb(email, password) {
    try {
      const existedUser = await authDB.Users.findOne({
        where: {'email': email},
      })
  
      if (!existedUser) {
        return {
          success: false,
          message: "User not found.",
        }
      }
  
      if (!existedUser.password) {
        return {
          success: false,
          message: "Password is required.",
        }
      }
  
      const isPasswordMatches = await bcrypt.compare(
        password,
        existedUser.password
      )
  
      if (!isPasswordMatches) {
        return {
          success: false,
          message: "Password is incorrect.",
        }
      }
  
      return {
        success: true,
        data: existedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
}

export async function register({name, email, password}) {
    try {
      // get user from db
      const existedUser = await getUserFromDb(email, password)
      if (existedUser.success) {
        return {
          success: false,
          message: "User already exists.",
        }
      }
      const hash = await bcrypt.hash(password, 10)
  
      const insertedUser = await authDB.Users.create({
        name,
        email,
        password: hash,
      })
  
      return {
        success: true,
        data: insertedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
}