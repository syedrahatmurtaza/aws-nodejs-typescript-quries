export const TEST_ENVIRONMENT: string = 'test';
export const DEV_ENVIRONMENT: string = 'dev';
export const getTempPath = (environment: string) => {
  if (environment === TEST_ENVIRONMENT) {
    return './tmp/';
  } else {
    return '/tmp/';
  }
};
