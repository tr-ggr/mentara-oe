import { z } from 'zod';

const runtimeEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().url(),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
});

const bootstrapEnvSchema = runtimeEnvSchema.extend({
  BOOTSTRAP_ADMIN_EMAIL: z.string().email(),
  BOOTSTRAP_ADMIN_PASSWORD: z.string().min(8),
  BOOTSTRAP_ADMIN_NAME: z.string().min(1),
});

function formatError(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
}

export function parseAllowedOrigins(value: string): string[] {
  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => {
      const url = new URL(origin);
      return url.origin;
    });

  if (origins.length === 0) {
    throw new Error('CORS_ALLOWED_ORIGINS must include at least one origin.');
  }

  return Array.from(new Set(origins));
}

export function getRuntimeEnv() {
  const parsed = runtimeEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid runtime environment: ${formatError(parsed.error)}`);
  }

  return {
    ...parsed.data,
    allowedOrigins: parseAllowedOrigins(parsed.data.CORS_ALLOWED_ORIGINS),
  };
}

export function getBootstrapEnv() {
  const parsed = bootstrapEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid bootstrap environment: ${formatError(parsed.error)}`);
  }
  return parsed.data;
}
