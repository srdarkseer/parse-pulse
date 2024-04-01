import React, { useState } from "react";
import {
  parseItalic,
  parseBold,
  parseHeadings,
  parseStrikethrough,
} from "./utilities";
import "./index.css";

export default function App() {
  const [markdownInput, setMarkdownInput] = useState("");

  const parseMarkdown = (markdownText: string) => {
    const lines = markdownText.split("\n");

    return lines.map((line, index) => {
      if (line.trim() === "") {
        return <br key={index} />;
      }

      const heading = parseHeadings(line);
      if (heading) {
        return React.cloneElement(heading, { key: index });
      }

      let parsedLine = parseBold(line);
      parsedLine = parseItalic(parsedLine);
      parsedLine = parseStrikethrough(parsedLine);

      return <p key={index} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
    });
  };
  return (
    <>
      <header>
        <h1>Parse Pluse</h1>
      </header>
      <main>
        <div className="editor">
          <textarea
            value={markdownInput}
            onChange={(event) => setMarkdownInput(event.target.value)}
            placeholder="Write your markdown here..."
          />
        </div>
        <div className="preview">{parseMarkdown(markdownInput)}</div>
      </main>
    </>
  );
}
