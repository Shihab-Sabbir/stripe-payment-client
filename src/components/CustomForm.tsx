import useLoadingStore from "@/store/loadingStore";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Spinner from "./Spinner";

interface Field {
  name: string;
  type: string;
  label: string;
  required: boolean;
}

interface CustomFormProps {
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
}

const CustomForm: React.FC<CustomFormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { isLoading } = useLoadingStore();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1 mt-3">
          <label htmlFor={field.name} className="text-sm">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={`Please enter you ${field.name}`}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(e, field.name)}
            required={field.required}
            className="w-[300px] sm:w-[500px] border border-primary placeholder:text-xs p-2 rounded-md focus:outline-blue-800"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-primary hover:bg-blue-700 text-white font-semibold h-[45px] py-3 px-4 focus:outline-none focus:shadow-outline mt-5 text-sm w-full rounded-md"
      >
        {isLoading ? (
          <div className="space-x-2">
            <Spinner /> <span>  Please Wait...</span>
          </div>
        ) : (
          "SUBMIT"
        )}
      </button>
    </form>
  );
};

export default CustomForm;
