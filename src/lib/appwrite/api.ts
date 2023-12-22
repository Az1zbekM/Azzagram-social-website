import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const response = await account.create(
           ID.unique(),
            user.email,
            user.password,
            user.name
        );
        return response      
    } catch (
        error
    ) {
        console.log(error);
        throw error
    }
}