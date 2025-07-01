import TextInput from "../textInput/TextInput";

interface FormControlProps {
  label: string;
  inputType?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: any;
}

function FormControl({
  label,
  inputType,
  value,
  onChange,
  placeholder,
  style,
}: FormControlProps) {
  return (
    <div style={{ ...style }}>
      <p style={{ fontSize: "14px", marginBottom: "5px" }}>{label}:</p>
      <TextInput
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormControl;
