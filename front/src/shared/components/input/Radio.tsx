import { type InputHTMLAttributes } from 'react';
import { useFormContext, type FieldPath, type FieldError, type FieldValues } from 'react-hook-form';
import { cn } from '@/shared/utils/style';

type RadioProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
    name: FieldPath<T>;
    label: string;
    value: string | number;
};

export const Radio = <T extends FieldValues>({ name, label, value, ...props }: RadioProps<T>) => {
    const { register, formState: { errors } } = useFormContext<T>();
    const fieldError = errors[name] as FieldError | undefined;

    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
                {...register(name)}
                {...props}
                value={value}
                className={cn(
                    "h-4 w-4 border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500",
                    fieldError && "border-red-500"
                )}
            />
            <label className="text-sm font-medium">{label}</label>
            {fieldError && <p className="text-red-500 text-sm">{fieldError.message}</p>}
        </div>
    );
};
