import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  return (
    <button
      className="rounded-md border border-zinc-950 px-4 py-2 lg:transition-all lg:hover:bg-zinc-950 lg:hover:text-zinc-100"
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
