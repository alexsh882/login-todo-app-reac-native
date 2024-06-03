const USER_DATA = {
    email : "admin@gmail.com",
    password : "Admin.1234"

}


export const AuthServices = {
    login: async (email: string, password: string) => {
        if (email === USER_DATA.email && password === USER_DATA.password) {
            return {
                email: USER_DATA.email,
                token: "token"
            }
        }
        throw new Error("Usuario o contraseña incorrectos")
    }
}