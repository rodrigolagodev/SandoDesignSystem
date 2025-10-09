/// <reference types="vite/client" />

// CSS files imported with ?inline query parameter
declare module '*.css?inline' {
  const content: string;
  export default content;
}
