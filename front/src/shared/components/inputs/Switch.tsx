import { type InputHTMLAttributes } from 'react';
import { useFormContext, type FieldPath, type FieldError, type FieldValues } from 'react-hook-form';
import { cn } from '@/shared/utils/style';
import { Error } from '@/shared/components';

type SwitchProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
    name: FieldPath<T>;
    label: string;
};

export const Switch = <T extends FieldValues>({ name, label, ...props }: SwitchProps<T>) => {
    const { register, formState: { errors } } = useFormContext<T>();
    const fieldError = errors[name] as FieldError | undefined;

    return (
        <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    {...register(name)}
                    {...props}
                    className="sr-only peer"
                />
                <div
                    className={cn(
                        "w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 transition-colors",
                        fieldError && "ring-1 ring-red-500"
                    )}
                />
                <span className="ml-3 text-sm font-medium">{label}</span>
            </label>
            {fieldError && <Error error={fieldError}></Error>}
        </div>
    );
};
