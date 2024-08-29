import { hash } from "bcrypt"

const hashPassword = async (password: string) => {
    try {
        const hashed = await hash(password, 10);
        return hashed;
    } catch (error) {
        console.log(error);
    }
}
export {hashPassword}