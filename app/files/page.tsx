import FileUploader from "@/components/global/file-uploader";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cloudflare R2 File Upload</h1>
      <FileUploader />
    </main>
  );
}

