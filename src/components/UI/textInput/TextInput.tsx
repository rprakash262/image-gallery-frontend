interface TextInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ type, value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      style={{
        border: "1px solid var(--border-color)",
        borderRadius: "4px",
        padding: "10px",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "var(--input-bg-color)",
      }}
      type={type ?? "text"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TextInput;
