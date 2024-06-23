import { Controller } from "react-hook-form";
import getBgColor from "../../libs/GetBgColor";
import InputFieldLabel from "../shared/InputFieldLabel";

// Props
interface RoleSelectInputProps {
  control: any;
  errors: any;
  isDisabled: boolean;
}

const RoleSelectInput: React.FC<RoleSelectInputProps> = ({
  control,
  errors,
  isDisabled,
}) => {
  return (
    <div className="w-full md:max-w-96">
      {/* Label */}
      <InputFieldLabel id={"role"} label={"Role"} errors={errors} />

      <br />
      <Controller
        name={"role"}
        control={control}
        defaultValue={"editor"}
        render={({ field }) => (
          <select
            id={"role"}
            {...field}
            disabled={isDisabled}
            className="w-full p-2 my-1 rounded-md outline-none isDisabled:opacity-50"
            style={getBgColor("secondary")}
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        )}
      />
    </div>
  );
};
export default RoleSelectInput;
