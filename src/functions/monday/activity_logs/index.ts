import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.activityLogFunction`,
  events: [
    {
      http: {
        method: "post",
        path: "monday/getActivityLogs",
        request: {
          schema: {
            "application/json": schema,
          },
          parameters: {
            querystrings: {
              boardIds: false,
              limit: false,
              page: false,
              user_ids: false,
              column_ids: false,
              group_ids: false,
              item_ids: false,
              from: false,
              to: false,
            },
          },
        },
      },
    },
  ],
};
