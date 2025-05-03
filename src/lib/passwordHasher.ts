import bcrypt from "bcrypt";

const saltRounds: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
  if (!password || typeof password !== "string") {
    throw new Error("Incorrect password");
  }
  try {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Your password is not secure. Please contact helpdesk.");
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  if (
    !password ||
    !hashedPassword ||
    typeof password !== "string" ||
    typeof hashedPassword !== "string"
  ) {
    throw new Error("Password cannot be verified");
  }

  const isPasswordCorrect: boolean = await bcrypt.compare(
    password,
    hashedPassword
  );

  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  return true;
};
