import { supabase } from "./supabase.ts";

export async function checkUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        throw error;
    }

    return data;
}
