"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, FieldPath, FieldValues } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  validationRules?: any; 
  inputStyle?:any;
  
}

export function InputField<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder = "",
  autoComplete,
  validationRules,
  inputStyle=""
}: InputFieldProps<T>) {
  const { control } = useFormContext<T>(); 

  return (
    <FormField
      control={control}
      name={name}
      rules={validationRules}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={field.value ?? ""}        
              className={inputStyle}
            />
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}