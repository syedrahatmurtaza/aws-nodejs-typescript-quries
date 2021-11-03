import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

/**
 * update the comment as per the implmention below is only a sample.
 * @localmember putRemoteObject
 * @description putRemoteObject on amazon s3 bucket.
 * @param {ValidatedEventAPIGatewayProxyEvent <typeof schema>} body is empty
 * @return {JSON} retrun the DUMP of {ValidatedEventAPIGatewayProxyEvent <typeof schema>}.
 */
const putRemoteObject: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Done", event }),
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Error", error }),
      };
    }
  };

export const putRemoteObjectFunction = middyfy(putRemoteObject);
