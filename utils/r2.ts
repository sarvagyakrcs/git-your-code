import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cloudflareConfig } from "../config/cloudflare";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${cloudflareConfig.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: cloudflareConfig.accessKeyId,
    secretAccessKey: cloudflareConfig.secretAccessKey,
  },
});

export async function uploadToR2(file: File, key: string) {
  const command = new PutObjectCommand({
    Bucket: cloudflareConfig.bucketName,
    Key: key,
    Body: new Uint8Array(await file.arrayBuffer()),
    ContentType: file.type,
  });

  await S3.send(command);
  console.log(`File uploaded successfully: ${key}`);
  return `${cloudflareConfig.publicBucketUrl}/${key}`;
}

export async function getSignedUrlFromR2(key: string) {
  // First, check if the object exists
  const headCommand = new HeadObjectCommand({
    Bucket: cloudflareConfig.bucketName,
    Key: key,
  });

  try {
    await S3.send(headCommand);
  } catch (error) {
    console.error(`Object not found: ${key}`);
    throw new Error(`The specified key does not exist: ${key}`);
  }

  const command = new GetObjectCommand({
    Bucket: cloudflareConfig.bucketName,
    Key: key,
  });

  const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
  console.log(`Generated signed URL for: ${key}`);
  return signedUrl;
}

export async function deleteFromR2(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: cloudflareConfig.bucketName,
    Key: key,
  });

  await S3.send(command);
  console.log(`File deleted successfully: ${key}`);
}

