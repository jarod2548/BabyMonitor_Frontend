import type { ctgData } from "../../contracts/ctgData";


type Props = {
  value: ctgData;
  onChange: (data: ctgData) => void;
};

export default function CtgDataForm({ value, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;

    onChange({
      ...value,
      [name]: Number(inputValue),
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label>
        Hartbasis:
        <input
          type="number"
          name="hartbasis"
          value={value.hartbasis}
          onChange={handleChange}
        />
      </label>

      <label>
        Variabiliteit:
        <input
          type="number"
          name="variabiliteit"
          value={value.variabiliteit}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}