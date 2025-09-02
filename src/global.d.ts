import { JSX } from 'solid-js';

declare module '*.svg' {
  const content: (props: { class?: string }) => JSX.Element;
  export default content;
}
