import { Input } from "~/components/atoms/input/input";
import { Label } from "~/components/atoms/label/label";

type InputWithLabelProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  autoFocus?: boolean;
};
function InputWithLabel({ label, type, autoFocus }: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type={type}
        id={label}
        placeholder={label}
        autoComplete="on"
        autoFocus={autoFocus}
      />
    </div>
  );
}

export default InputWithLabel;
