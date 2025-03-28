"use server";
import prisma from "@/lib/prisma";
import { handleError } from "@/utils/error-logs";

/**
 * Retrieves a user by their email from the database, based on the current session.
 * 
 * @async
 * @function GetUserByEmail
 * @returns {Promise<object>} - Returns the user data if authenticated and found, or an error response if not authenticated or not found.
 */
export const GetUserByEmail = async (email: string | undefined) => {
    if(!email) {
        return null;
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        
        if (!user) {
            return null;
        }
        
        return user;
        
    } catch (error) {
        handleError(error);
        return null;
    }
};

/**
 * Retrieves a user by their username from the database, based on the current session.
 * 
 * @async
 * @function GetUserByEmail
 * @returns {Promise<object>} - Returns the user data if authenticated and found, or an error response if not authenticated or not found.
 */
export const GetUserByUsername = async (username: string | undefined) => {
    if(!username) {
        return null;
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                userName: username
            }
        });
        
        if (!user) {
            return null
        }
        
        return user;
        
    } catch (error) {
        handleError(error);
        return null;

    }
};


/**
 * Retrieves a user by their userid(primary key) from the database, based on the current session.
 * 
 * @async
 * @function GetUserByEmail
 * @returns {Promise<object>} - Returns the user data if authenticated and found, or an error response if not authenticated or not found.
 */
export const GetUserById = async (id: string | undefined) => {
    if(!id){
        return null;
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        
        if (!user) {
            return null;
        }
        
        return user;
        
    } catch (error) {
        handleError(error);
        return null;
    }
};
