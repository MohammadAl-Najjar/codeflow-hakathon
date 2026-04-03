import { supabase } from "./supabase";

export async function createUser(name: string, email: string, password: string, birth_year: number) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: name
            }
        }
    })

    if (error) {
        throw error;
    }

    if (!data.user) {
        throw new Error("Signup succeeded but no user was returned.");
    }

    await supabase.from('users').insert({
        id: data.user.id,
        display_name: name,
        birth_year,
    })

    return data;
}