import React, { useState } from "react";
import {
  parseItalic,
  parseBold,
  parseHeadings,
  parseStrikethrough,
  parseBlockquote,
  parseInlineCode,
  parseHorizontalRule,
} from "./utilities";
import "./index.css";
import "./preview.css";
export default function App() {
  const [markdownInput, setMarkdownInput] = useState("");

  const parseMarkdown = (markdownText: string) => {
    const lines = markdownText.split("\n");

    return lines.map((line, index) => {
      if (line.trim() === "") {
        return <br key={index} />;
      }

      let element;

      element = parseHorizontalRule(line);
      if (element) {
        return React.cloneElement(element, { key: index });
      }

      element = parseBlockquote(line);
      if (element) {
        return React.cloneElement(element, { key: index });
      }

      element = parseHeadings(line);
      if (element) {
        return React.cloneElement(element, { key: index });
      }

      let parsedLine = parseBold(line);
      parsedLine = parseItalic(parsedLine);
      parsedLine = parseStrikethrough(parsedLine);
      parsedLine = parseInlineCode(parsedLine);

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
