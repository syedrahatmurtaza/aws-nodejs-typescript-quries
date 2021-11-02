// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.putRemoteObjectFunction`,
  events: [
    {
      http: {
        method: "put",
        path: "s3/putRemoteObject",
        request: {
          // schema: {
          //   "application/json": schema,
          // },
          // parameters: {
          //   querystrings: {
          //     AccessKeyID: true,
          //     SecretAccessKey: true,
          //     bucketName: true,
          //     fileName: true,
          //     ACL: true,
          //     url: true,
          //   },
          // },
        },
      },
    },
  ],
};
