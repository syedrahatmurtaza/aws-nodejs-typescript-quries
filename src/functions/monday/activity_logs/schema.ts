export default {
  type: "object",
  properties: {
    accessToken: { type: "string" },
  },
  required: ["accessToken"],
} as const;
