import React from "react";

export type IconType = "setting" | "update" | "error";

type Props = {
  name: IconType;
} & Omit<JSX.IntrinsicElements["svg"], "className">;

export const Icon: React.FC<Props> = ({ name, ...restProps }) => {
  const svgRestProps = {
    width: 24,
    height: 24,
    fill: "currentColor",
    ...restProps,
  };

  switch (name) {
    case "setting":
      return (
        <svg role="img" viewBox="0 0 24 24" {...svgRestProps}>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
        </svg>
      );
    case "update":
      return (
        <svg role="img" viewBox="0 0 24 24" {...svgRestProps}>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1zm2.41 9H9v5c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 7.7c-.39-.39-1.02-.39-1.41 0l-4.59 4.59c-.63.63-.19 1.71.7 1.71z" />
        </svg>
      );
    case "error":
      return (
        <svg role="img" viewBox="0 0 24 24" {...svgRestProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" />
        </svg>
      );
  }
};
