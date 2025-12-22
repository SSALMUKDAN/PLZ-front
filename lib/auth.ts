import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

// 비밀번호 해싱
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 비밀번호 검증
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT 토큰 생성
export function generateToken(
  userId: string,
  email: string,
  role: string
): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: "7d" } // 7일 유효
  );
}

// JWT 토큰 검증
export function verifyToken(
  token: string
): { userId: string; email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Authorization 헤더에서 토큰 추출
export function extractToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Request에서 사용자 ID 추출 (로그인하지 않은 경우 null 반환)
export function getUserIdFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  const token = extractToken(authHeader);

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  return decoded?.userId ?? null;
}
