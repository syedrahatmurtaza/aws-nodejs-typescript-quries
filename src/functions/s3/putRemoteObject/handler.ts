import "source-map-support/register";

import AWS from "aws-sdk";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { downloadFile } from "./util/fileDownload";
import fs from "fs";
import {
  INVALID_ACCESS_KEY_ID,
  INVALID_ACL_VALUE,
  INVALID_BUCKET_NAME,
  INVALID_SECRET_KEY,
  RESPONSE_201_MESSAGE,
  RESPONSE_201_TO_SEND,
  RESPONSE_400_MESSAGE,
  RESPONSE_400_TO_SEND,
  RESPONSE_403_MESSAGE,
  RESPONSE_403_TO_SEND,
  RESPONSE_404_MESSAGE,
  RESPONSE_404_TO_SEND,
  S3_ENDPOINT,
} from "./util/constants";
import { DEV_ENVIRONMENT, getTempPath, TEST_ENVIRONMENT } from "./util/tempPath";
/**
 * update the comment as per the implmention below is only a sample.
 * @localmember putRemoteObject
 * @description putRemoteObject on amazon s3 bucket.
 * @param {ValidatedEventAPIGatewayProxyEvent <typeof schema>} body is empty
 * @return {JSON} retrun the DUMP of {ValidatedEventAPIGatewayProxyEvent <typeof schema>}.
 */
const putRemoteObject: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    // Setting Global To This Function To Delete The File
    let fileNameGlobal: string = '';
    try {
      const { queryStringParameters } = event;

      const { url, bucketName, AccessKeyID, SecretAccessKey, ACL } =
        queryStringParameters;

      let { fileName } = queryStringParameters;

      const s3Bucket = new AWS.S3({
        endpoint: S3_ENDPOINT,
        accessKeyId: AccessKeyID,
        secretAccessKey: SecretAccessKey,
      });

      if (fileName == undefined) {
        fileName = 'random';
      }

      // Downloading The File
      if (queryStringParameters.environment) {
        await downloadFile(url, fileName, TEST_ENVIRONMENT);
        // Setting Global Variable
        fileNameGlobal = getTempPath(TEST_ENVIRONMENT) + fileName;
      } else {
        await downloadFile(url, fileName, DEV_ENVIRONMENT);
        // Setting Global Variable
        fileNameGlobal = getTempPath(DEV_ENVIRONMENT) + fileName;
      }

      // Reading The File
      const file = fs.readFileSync(fileNameGlobal);

      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ACL: ACL,
      };

      // Uploadin To The s3
      const result = await s3Bucket.upload(params).promise();

      if ((result.Key = fileName)) {
        // Deleting The Temp File
        if (queryStringParameters.environment) {
          fs.unlinkSync(getTempPath(TEST_ENVIRONMENT) + fileName);
        } else {
          fs.unlinkSync(getTempPath(DEV_ENVIRONMENT) + fileName);
        }

        return {
          statusCode: RESPONSE_201_TO_SEND,
          body: JSON.stringify({ message: RESPONSE_201_MESSAGE }),
        };
      }

      return {
        statusCode: RESPONSE_404_TO_SEND,
        body: JSON.stringify({ message: RESPONSE_404_MESSAGE }),
      };
    } catch (error) {
      // Deleting The Temp File If Error Occurs

      if (fs.existsSync(fileNameGlobal)) {
        fs.unlinkSync(fileNameGlobal);
      }

      if (
        error.code === INVALID_ACCESS_KEY_ID ||
        error.code === INVALID_SECRET_KEY
      ) {
        return {
          statusCode: RESPONSE_403_TO_SEND,
          body: JSON.stringify({ message: RESPONSE_403_MESSAGE }),
        };
      } else if (
        error.code === INVALID_ACL_VALUE ||
        error.code === INVALID_BUCKET_NAME
      ) {
        return {
          statusCode: RESPONSE_400_TO_SEND,
          body: JSON.stringify({ message: RESPONSE_400_MESSAGE }),
        };
      }

      console.log(error);
      return {
        statusCode: RESPONSE_404_TO_SEND,
        body: JSON.stringify({ message: RESPONSE_404_MESSAGE }),
      };
    }
  };

export const putRemoteObjectFunction = middyfy(putRemoteObject);
