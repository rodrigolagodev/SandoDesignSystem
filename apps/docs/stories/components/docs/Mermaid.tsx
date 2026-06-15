import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with configuration
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    // Sando-inspired colors
    primaryColor: "#fef3e2",
    primaryTextColor: "#1f2937",
    primaryBorderColor: "#f97415",
    secondaryColor: "#dcfce7",
    secondaryTextColor: "#1f2937",
    secondaryBorderColor: "#22c55e",
    tertiaryColor: "#fef9c3",
    tertiaryTextColor: "#1f2937",
    tertiaryBorderColor: "#eab308",
    lineColor: "#6b7280",
    textColor: "#1f2937",
    mainBkg: "#ffffff",
    nodeBorder: "#9ca3af",
    clusterBkg: "#f9fafb",
    clusterBorder: "#d1d5db",
    titleColor: "#1f2937",
    edgeLabelBackground: "#ffffff",
    // Fonts
    fontFamily: "Inter, system-ui, sans-serif",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
    padding: 15,
  },
  securityLevel: "loose",
});

interface MermaidProps {
  chart: string;
  caption?: string;
}

/**
 * Mermaid diagram component for Storybook MDX documentation.
 * Renders Mermaid diagrams client-side with proper cleanup.
 *
 * @example
 * ```tsx
 * <Mermaid chart={`
 *   flowchart TD
 *     A[Start] --> B[End]
 * `} caption="Simple flow" />
 * ```
 */
export const Mermaid: React.FC<MermaidProps> = ({ chart, caption }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart.trim()) return;

      try {
        // Clean the chart string
        const cleanChart = chart.trim();

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(
          idRef.current,
          cleanChart,
        );
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to render diagram",
        );
        setSvg("");
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "0.5rem",
          color: "#991b1b",
          fontFamily: "monospace",
          fontSize: "0.875rem",
        }}
      >
        <strong>Mermaid Error:</strong> {error}
        <pre style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <figure style={{ margin: "1.5rem 0" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1.5rem",
          backgroundColor: "#fafafa",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
            fontSize: "0.875rem",
            color: "#6b7280",
            fontStyle: "italic",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default Mermaid;
