"use server";
import axios from "axios";
import "dotenv/config";

const ecourl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitEcokey`;
export async function EcowittLinkKey(
    email: string,
    key: string,
    appKey: string,
    address: string
): Promise<{
    verified: boolean;
    data: {
        message: string;
    };
}> {
    let returnData: {
        verified: boolean;
        data: {
            message: string;
        };
    } = {
        verified: false,
        data: {
            message:
                "We were unable to verify your key. Please try again later, if the problem persists, contact simon.",
        },
    };
    try {
        await axios
            .post(ecourl, { key, app_key: appKey, address, email })
            .then((response) => {
                const data: {
                    message: string;
                    status: "ERROR" | "SUCCESS";
                } = response.data;

                if (response && response.status && response.status === 200) {
                    returnData = {
                        verified: true,
                        data: {
                            message: data.message,
                        },
                    };
                } else {
                    returnData = {
                        verified: false,
                        data: {
                            message: response.status ?
                                response.status === 429
                                    ? "You have made too many requests, please try again later."
                                    : response?.data.message : "We were unable to verify your key. Please try again later, if the problem persists, contact simon.",
                        },
                    };
                }
            })
            .catch((error) => {
                if (!error.response) {
                    returnData = {
                        verified: false,
                        data: {
                            message: "We were unable to verify your key. Please try again later, if the problem persists, contact simon.",
                        },
                    };
                    return returnData;
                }
                const message =
                    error.response.status ?
                        error.response?.status === 429
                            ? "You have made too many requests, please try again later."
                            : error.response?.data.message : "We were unable to verify your key. Please try again later, if the problem persists, contact simon.";
               
                returnData = {
                    verified: false,
                    data: {
                        message: message
                    },
                };
            });
    } catch (error) {
        console.log(error);
        returnData = {
            verified: false,
            data: {
                message:
                    "We were unable to verify your key. Please try again later, if the problem persists, contact simon."
            },
        };
    }
    return returnData;
}