/*********************************************** RESPONSES ***********************************************/
export const RESPONSE_201_TO_SEND: number = 201;
export const RESPONSE_201_MESSAGE: string = 'file saved';

export const RESPONSE_404_TO_SEND: number = 404;
export const RESPONSE_404_MESSAGE: string = 'internal server error';

export const INVALID_ACCESS_KEY_ID: string = 'InvalidAccessKeyId';
export const INVALID_SECRET_KEY: string = 'SignatureDoesNotMatch';
export const RESPONSE_403_TO_SEND: number = 403;
export const RESPONSE_403_MESSAGE: string = 'you are not allowed to save files';

export const INVALID_ACL_VALUE: string = 'InvalidArgument';
export const INVALID_BUCKET_NAME: string = 'NoSuchBucket';
export const RESPONSE_400_TO_SEND: number = 400;
export const RESPONSE_400_MESSAGE: string = 'attributes are missing';

/*********************************************** AWS Constants ***********************************************/
export const S3_ENDPOINT: string = 'https://s3.amazonaws.com';
