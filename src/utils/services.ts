import { Buffer } from "buffer";

export async function fetchReposFromGithub(
  username: string
): Promise<any[] | { error: string }> {
  if (username === "") return { error: "Username kosong." };

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      if (res.status === 404) return { error: "Username tidak ditemukan." };
      return { error: `Gagal mengambil repositori: ${res.statusText}` };
    }

    const data = await res.json();
    if (!Array.isArray(data)) return { error: "Data repositori tidak valid." };

    return data;
  } catch (err) {
    return { error: "Terjadi kesalahan saat mengambil repositori." };
  }
}

export async function fetchReadmeFromGithub(
  username: string,
  repoName: string
): Promise<string | { error: string }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`
    );
    const data = await res.json();

    if (!data.content) return { error: "File README tidak ada." };

    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return content;
  } catch (err) {
    return { error: "Terjadi kesalahan saat mengambil README." };
  }
}
