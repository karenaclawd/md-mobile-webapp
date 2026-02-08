import React from "react";
import { MarkdownDoc } from "../types";

type OnboardingProps = {
  examples: MarkdownDoc[];
  onKeepExamples: () => void;
  onRemoveExamples: () => void;
};

const buildPreview = (content: string) => {
  const lines = content.split("\n").map((line) => line.trim());
  const previewLine = lines.find((line) => line && !line.startsWith("#")) ?? lines.find((line) => line);
  return previewLine ? previewLine.replace(/[`*_>#-]/g, "").slice(0, 120) : "Sample markdown preview.";
};

export default function Onboarding({ examples, onKeepExamples, onRemoveExamples }: OnboardingProps) {
  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="onboarding-card">
        <p className="eyebrow">Welcome</p>
        <h2 id="onboarding-title">Explore the built-in examples</h2>
        <p className="onboarding-subtitle">
          Start with sample guides or clear them out after a quick look. You can import markdown
          files anytime.
        </p>
        <div className="onboarding-examples">
          {examples.map((doc) => (
            <div className="onboarding-example" key={doc.id}>
              <div>
                <h3>{doc.title}</h3>
                <p>{buildPreview(doc.content)}</p>
              </div>
              <span className="onboarding-pill">Example</span>
            </div>
          ))}
        </div>
        <div className="onboarding-actions">
          <button className="ghost-button" onClick={onRemoveExamples}>
            Remove examples
          </button>
          <button className="primary-button" onClick={onKeepExamples}>
            Keep examples
          </button>
        </div>
      </div>
    </div>
  );
}
