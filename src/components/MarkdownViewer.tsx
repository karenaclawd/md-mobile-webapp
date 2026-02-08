import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

function normalizeCodeText(value: React.ReactNode): string {
  if (typeof value === "string") {
    return value.replace(/\n$/, "");
  }
  if (Array.isArray(value)) {
    return value.map((child) => normalizeCodeText(child)).join("");
  }
  return "";
}

function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const codeElement = React.Children.toArray(children).find((child) =>
    React.isValidElement(child)
  ) as React.ReactElement | undefined;

  const codeText = useMemo(() => {
    if (!codeElement) {
      return "";
    }
    return normalizeCodeText(codeElement.props.children);
  }, [codeElement]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
  };

  if (!codeElement) {
    return <pre className="md-pre">{children}</pre>;
  }

  const className = codeElement.props.className ?? "";
  const codeNode = React.cloneElement(codeElement, {
    className: `md-code ${className}`.trim()
  });

  return (
    <div className="md-pre-wrapper">
      <pre className="md-pre">{codeNode}</pre>
      <button className="md-copy-button" onClick={handleCopy} type="button">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="md-h1" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="md-h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="md-h3" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="md-p" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="md-ul" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="md-ol" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => {
    const { children, ...rest } = props;
    const checkbox = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        child.props &&
        (child.props["data-checked"] === true ||
          child.props["data-checked"] === false)
    );

    if (checkbox && React.isValidElement(checkbox)) {
      return (
        <li className="md-li-task" {...rest}>
          <input
            type="checkbox"
            checked={checkbox.props["data-checked"]}
            readOnly
          />
          {checkbox.props.children}
        </li>
      );
    }
    return <li className="md-li" {...rest}>{children}</li>;
  },
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="md-quote" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="md-link" target="_blank" rel="noreferrer" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="md-code" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="md-table-wrapper">
      <table className="md-table" {...props} />
    </div>
  ),
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
