import { Input } from "~/components/atoms/input/input";
import { Label } from "~/components/atoms/label/label";

type InputWithLabelProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: unknown) => void;
  autoFocus?: boolean;
  error?: string;
};
function InputWithLabel({
  label,
  type,
  value,
  onChange,
  autoFocus,
  error,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        type={type}
        id={label.toLowerCase()}
        placeholder={label}
        autoComplete="on"
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

export default InputWithLabel;
