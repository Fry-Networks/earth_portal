"use server";
import axios from "axios";
import "dotenv/config";
// import { StatusColors } from "./consts";

const ambientUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitkey`;
export async function AmbientLinkKey(
  key: string,
  address: string | undefined,
  email: string
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
        "We were unable to verify your key. Please try again later, if the problem persists, contact simon."
    //   color: StatusColors.ERROR,
    },
  };
  try {
    await axios
      .post(ambientUrl, { email, key, address })
      .then((response) => {
        const data: {
          message: string;
          status: "ERROR" | "SUCCESS";
        } = response.data;

        if (response.status === 200) {
          returnData = {
            verified: true,
            data: {
              message: data.message,
            },
          };
        }
      })
      .catch((error) => {
        console.log(error.response?.data);
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


