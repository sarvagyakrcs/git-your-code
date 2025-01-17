export const cloudflareConfig = {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    publicBucketUrl: process.env.CLOUDFLARE_PUBLIC_BUCKET_URL!,
}
  
  