import bcrypt from "bcrypt"

const compairPassword = async (password: string, hashedPassword: string) => {
    const compared = await bcrypt.compare(password, hashedPassword)
    return compared
}
export {compairPassword}