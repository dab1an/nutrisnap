import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>App</h1>
      <Link href="/picture">Picture</Link>
    </div>
  );
}
