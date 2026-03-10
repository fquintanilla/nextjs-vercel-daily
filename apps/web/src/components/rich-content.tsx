import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { ArticleContentBlock } from "@/lib/server/vercel-daily-api";

function normalizeListItem(s: string) {
  // Removes whitespace right before a closing bold marker: "**text **" -> "**text**"
  return s.replace(/\*\*([^\n*]+?)\s+\*\*/g, "**$1** ").trim();
}

export function RichContent({ content }: { content: ArticleContentBlock[] }) {
  return (
    <div className="prose prose-neutral max-w-none">
      {content.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return (
              <div key={i} className="mb-4">
                <ReactMarkdown>{b.text}</ReactMarkdown>
              </div>
            );

          case "heading": {
            const Tag = `h${b.level}` as const;
            return <Tag key={i}>{b.text}</Tag>;
          }

          case "unordered-list":
            return (
              <ul key={i} className="list-disc list-inside mb-4">
                {b.items.map((item, idx) => (
                  <li key={idx}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <span>{children}</span>,
                      }}
                    >
                      {normalizeListItem(item)}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={i} className="list-disc list-inside mb-4">
                {b.items.map((item, idx) => (
                  <li key={idx}>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <span>{children}</span>,
                      }}
                    >
                      {normalizeListItem(item)}
                    </ReactMarkdown>
                  </li>
                ))}
              </ol>
            );

          case "image":
            if (!b.src) return null;
            return <Image src={b.src} alt={b.alt ?? ""} />;

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="mb-4 border-l-4 pl-4 italic opacity-90"
              >
                <ReactMarkdown>{b.text}</ReactMarkdown>
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
