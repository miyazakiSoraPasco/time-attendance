import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const LoginRequest = z
  .object({ email: z.string().email(), password: z.string() })
  .passthrough();
const LoginResponse = z.object({ token: z.string() }).partial().passthrough();
const ErrorResponse = z.object({ message: z.string() }).partial().passthrough();
const ValidationErrorResponse = z
  .object({ message: z.string(), errors: z.record(z.array(z.string())) })
  .partial()
  .passthrough();
const Attendance = z
  .object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    work_date: z.string(),
    start_time: z.string().datetime({ offset: true }).nullable(),
    end_time: z.string().datetime({ offset: true }).nullish(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();

export const schemas = {
  LoginRequest,
  LoginResponse,
  ErrorResponse,
  ValidationErrorResponse,
  Attendance,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/attendances/clock-in",
    alias: "clockInApi",
    requestFormat: "json",
    response: Attendance,
    errors: [
      {
        status: 401,
        description: `認証エラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 409,
        description: `業務競合エラー（重複打刻など）`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 422,
        description: `バリデーションエラー`,
        schema: ValidationErrorResponse,
      },
      {
        status: 500,
        description: `サーバーエラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/attendances/clock-out",
    alias: "clockOutApi",
    requestFormat: "json",
    response: Attendance,
    errors: [
      {
        status: 401,
        description: `認証エラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 409,
        description: `業務競合エラー（重複打刻など）`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 422,
        description: `バリデーションエラー`,
        schema: ValidationErrorResponse,
      },
      {
        status: 500,
        description: `サーバーエラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/attendances/today",
    alias: "todayApi",
    requestFormat: "json",
    response: Attendance,
    errors: [
      {
        status: 401,
        description: `認証エラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 500,
        description: `サーバーエラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
    ],
  },
  {
    method: "post",
    path: "/login",
    alias: "loginApi",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginRequest,
      },
    ],
    response: z.object({ token: z.string() }).partial().passthrough(),
    errors: [
      {
        status: 401,
        description: `認証エラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
      {
        status: 422,
        description: `バリデーションエラー`,
        schema: ValidationErrorResponse,
      },
      {
        status: 500,
        description: `サーバーエラー`,
        schema: z.object({ message: z.string() }).partial().passthrough(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
