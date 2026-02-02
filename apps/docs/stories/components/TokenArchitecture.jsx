import React from "react";

/**
 * Static Token Architecture Diagram
 * React component for use in MDX documentation
 */
export function TokenArchitecture() {
  const layers = [
    {
      id: "recipes",
      title: "Layer 3: RECIPES (Component Tokens)",
      emoji: "🧩",
      bgColor: "#fed7aa",
      borderColor: "#ea580c",
      labelColor: "#9a3412",
      itemBg: "#fff7ed",
      itemBorder: "#fdba74",
      itemColor: "#c2410c",
      items: ["Button", "Input", "Card", "Badge", "..."],
    },
    {
      id: "flavors",
      title: "Layer 2: FLAVORS (Semantic Tokens)",
      emoji: "🎭",
      bgColor: "#fef3c7",
      borderColor: "#f59e0b",
      labelColor: "#92400e",
      itemBg: "#fffbeb",
      itemBorder: "#fcd34d",
      itemColor: "#b45309",
      items: [
        "Action Colors",
        "Background Colors",
        "Text Colors",
        "Border Colors",
      ],
    },
    {
      id: "ingredients",
      title: "Layer 1: INGREDIENTS (Primitive Tokens)",
      emoji: "🥗",
      bgColor: "#ecfccb",
      borderColor: "#84cc16",
      labelColor: "#3f6212",
      itemBg: "#f7fee7",
      itemBorder: "#bef264",
      itemColor: "#4d7c0f",
      items: ["Colors", "Spacing", "Typography", "Border", "Elevation"],
    },
  ];

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "32px",
        background: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
        borderRadius: "16px",
        margin: "24px 0",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
    },
    layers.flatMap((layer, index) => {
      const elements = [
        // Layer box
        React.createElement(
          "div",
          {
            key: layer.id,
            style: {
              background: layer.bgColor,
              border: `2px solid ${layer.borderColor}`,
              borderRadius: "12px",
              padding: "20px",
            },
          },
          [
            // Layer title
            React.createElement(
              "div",
              {
                key: `${layer.id}-title`,
                style: {
                  fontSize: "12px",
                  fontWeight: "600",
                  color: layer.labelColor,
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
              },
              `${layer.emoji} ${layer.title}`,
            ),
            // Items container
            React.createElement(
              "div",
              {
                key: `${layer.id}-items`,
                style: { display: "flex", gap: "12px", flexWrap: "wrap" },
              },
              layer.items.map((item) =>
                React.createElement(
                  "div",
                  {
                    key: item,
                    style: {
                      background: layer.itemBg,
                      border: `1px solid ${layer.itemBorder}`,
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      color: layer.itemColor,
                      fontWeight: "500",
                    },
                  },
                  item,
                ),
              ),
            ),
          ],
        ),
      ];

      // Add arrow between layers (not after the last one)
      if (index < layers.length - 1) {
        elements.push(
          React.createElement(
            "div",
            {
              key: `arrow-${index}`,
              style: {
                textAlign: "center",
                color: "#78716c",
                fontSize: "20px",
              },
            },
            [
              "↓ ",
              React.createElement(
                "span",
                { key: "ref-text", style: { fontSize: "12px" } },
                "references",
              ),
              " ↓",
            ],
          ),
        );
      }

      return elements;
    }),
    // Legend at the bottom
    React.createElement(
      "div",
      {
        key: "legend",
        style: {
          marginTop: "8px",
          padding: "12px 16px",
          background: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e7e5e4",
          fontSize: "12px",
          color: "#57534e",
        },
      },
      [
        React.createElement("strong", { key: "legend-title" }, "How it works:"),
        " Components consume Recipe tokens → Recipes reference Flavor tokens → Flavors reference Ingredient primitives. Switching flavors changes the entire theme!",
      ],
    ),
  );
}

export default TokenArchitecture;
