interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  style: any;
}

function Checkbox({ checked, onChange, style }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      style={{
        marginRight: "10px",
        width: "20px",
        height: "20px",
        color: "var(--primary-color)",
      }}
      onChange={onChange}
    />
  )
}

export default Checkbox;
