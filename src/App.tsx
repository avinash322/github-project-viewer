import { useState } from "react";
import ManualMarkdownRenderer from "./ManualMarkdownRenderer";

export default function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [readme, setReadme] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const fetchRepos = async () => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    setRepos(data);
    setReadme("");
    setSelectedRepo(null);
  };

  const fetchReadme = async (repoName: any) => {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`
    );
    const data = await res.json();
    const content = atob(data.content);
    setReadme(content);
    setSelectedRepo(repoName);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>GitHub Project Viewer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 10 }}
      />
      <button onClick={fetchRepos} style={{ padding: 10, width: "100%" }}>
        Search
      </button>

      <div style={{ marginTop: 20 }}>
        <h2>Repositories:</h2>
        <ul>
          {repos.map((repo: any) => (
            <li key={repo.id} style={{ marginBottom: 5 }}>
              <button onClick={() => fetchReadme(repo.name)}>
                {repo.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {readme && (
        <div style={{ marginTop: 20 }}>
          <h2>README: {selectedRepo}</h2>
          <ManualMarkdownRenderer markdown={readme} />
        </div>
      )}
    </div>
  );
}
