import Link from "next/link";
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">掲示板</h1>
      <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        新規投稿
      </Link>
      <div className="mt-8 grid gap-4">
        {/*ここに投稿を表示 */}
      </div>
    </main>
  );
}
