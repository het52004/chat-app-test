import { z } from "zod";

export const schema = z.object({
  uniqueName: z
    .string({
      required_error: "Unqiue name cannot be empty",
    })
    .min(3, "Unique name must be at least 3 characters long")
    .max(10, "Unique name must not be more than 10 characters long")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Unique name must only contain letters and numbers"
    ),
  password: z
    .string({
      required_error: "Password cannot be empty",
    })
    .min(1, "Password cannot be empty")
    .min(3, "Password must be at least 3 characters long")
    .max(10, "Password must not be more than 10 characters long"),
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email("Invalid email address")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a @gmail.com address",
    }),
  userName: z
    .string({
      required_error: "User name cannot be empty",
    })
    .min(3, "User name must be at least 3 characters long")
    .max(10, "User name must not be more than 10 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "User name must only contain letters and numbers"),
});

export const loginSchema = schema.pick({
  uniqueName: true,
  password: true,
});
