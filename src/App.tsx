import { useState } from "react";
import "./index.css";

export default function App() {
  const [markdownInput, setMarkdownInput] = useState("");

  return (
    <>
      <header>
        <h1>Md-Parser</h1>
      </header>
      <main>
        <div className="editor">
          <textarea
            value={markdownInput}
            onChange={(event) => setMarkdownInput(event.target.value)}
            placeholder="Write your markdown here..."
          />
        </div>
        <div className="preview">Markdown Preview</div>
      </main>
    </>
  );
}
