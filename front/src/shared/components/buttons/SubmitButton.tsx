import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/shared/components';
import { Spinner } from '@/shared/components/Spinner';

interface SubmitButtonProps {
    children: React.ReactNode;
    loadingText?: string;
    className?: string;
}

export const SubmitButton = ({ children, loadingText, className }: SubmitButtonProps) => {
    const { formState } = useFormContext();
    const isSubmitting = formState.isSubmitting;

    return (
        <Button type="submit" className={className} disabled={isSubmitting}>
            {isSubmitting
                ? (
                    <div className="flex items-center justify-center gap-2">
                        <Spinner />
                        <span>{loadingText}</span>
                    </div>
                )
                : children}
        </Button>
    );
};
