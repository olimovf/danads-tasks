import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
    ACCOUNT_ID: process.env.ACCOUNT_ID as string,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN as string,
    USERNAME: process.env.USER_NAME as string,
    PASSWORD: process.env.PASSWORD as string,
};
