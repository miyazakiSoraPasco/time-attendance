import { type SelectHTMLAttributes } from 'react';
import { useFormContext, type FieldPath, type FieldError, type FieldValues } from 'react-hook-form';
import { cn } from '@/shared/utils/style';

type SelectOption = {
    value: string | number;
    label: string;
};

type SelectProps<T extends FieldValues> = SelectHTMLAttributes<HTMLSelectElement> & {
    name: FieldPath<T>;
    label: string;
    options: SelectOption[];
};

export const Select = <T extends FieldValues>({
    name,
    label,
    options,
    ...props
}: SelectProps<T>) => {
    const { register, formState: { errors } } = useFormContext<T>();
    const fieldError = errors[name] as FieldError | undefined;

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <select
                {...register(name)}
                {...props}
                className={cn(
                    "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                    fieldError ? "border-red-500" : "border-gray-300"
                )}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {fieldError && <p className="text-red-500 text-sm">{fieldError.message}</p>}
        </div>
    );
};
