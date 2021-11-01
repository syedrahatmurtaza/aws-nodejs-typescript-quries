import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";
import schema from "./schema";
import { MONDAY_API_KEY, MONDAY_BASE_URL } from "./util/constants";

const activityLogs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { queryStringParameters, body } = event;
    const { boardIds, from, to, limit } = queryStringParameters;

    console.log("Limit: ", limit)

    const queryLimit = limit === undefined ? 25 : limit;
    const boardIdsList = boardIds.split(',')
    const boardIdsListNumbers = []
    boardIdsList.forEach((value) => {
      boardIdsListNumbers.push(Number(value))
    })

    console.log(boardIdsListNumbers)

    let query = `query 
                  { 
                    boards (ids: [${boardIdsListNumbers}]) 
                    { 
                      activity_logs (from: \"${from}\", to: \"${to}\", limit: ${queryLimit}) 
                      { id event data }
                    }
                  }`;

    console.log("Query: ", query)

    const bodyAxios = JSON.stringify({ query: query });

    const response = await axios.post(MONDAY_BASE_URL, bodyAxios, {
      headers: {
        "Content-Type": "application/json",
        Authorization: MONDAY_API_KEY,
      },
    });

    const data = response.data;

    return {
      statusCode: 500,
      body: JSON.stringify({ body, queryStringParameters, data }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

export const activityLogFunction = middyfy(activityLogs);
