import React from "react";

interface Props {
  markdown: string;
}

const ManualMarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  const lines = markdown.split("\n");

  const renderLine = (line: string, index: number) => {
    if (line.startsWith("### "))
      return <h3 key={index}>{line.replace(/^### /, "")}</h3>;
    if (line.startsWith("## "))
      return <h2 key={index}>{line.replace(/^## /, "")}</h2>;
    if (line.startsWith("# "))
      return <h1 key={index}>{line.replace(/^# /, "")}</h1>;
    if (line.startsWith("- "))
      return <li key={index}>{line.replace(/^- /, "")}</li>;

    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
    line = line.replace(/`(.*?)`/g, "<code>$1</code>");

    return (
      <p
        key={index}
        dangerouslySetInnerHTML={{ __html: line }}
        style={{ whiteSpace: "pre-wrap" }}
      />
    );
  };

  return (
    <div style={{ padding: 10 }}>
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  );
};

export default ManualMarkdownRenderer;
