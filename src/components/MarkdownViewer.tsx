import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="md-h1" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="md-h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="md-h3" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="md-p" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="md-ul" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="md-ol" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="md-li" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="md-quote" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="md-link" target="_blank" rel="noreferrer" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="md-code" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="md-pre" {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => <table className="md-table" {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th className="md-th" {...props} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td className="md-td" {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="md-hr" {...props} />
};

type MarkdownViewerProps = {
  content: string;
};

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="markdown-viewer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
