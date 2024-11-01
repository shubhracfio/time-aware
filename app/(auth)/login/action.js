"use server"
import { signIn } from "@/auth"
import { revalidatePath } from "next/cache"

export async function loginCredentials({
    email,
    password,
  }) {
    try {
  
        await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
      return {
        status: "success",
        message: "Login successful.",
      }
    } catch (error) {
      return {
        status: "failed",
        message: "Email or password is incorrect.",
      }
    }
  }

  export async function loginWithGoogle() {
    return await signIn("google")
  }