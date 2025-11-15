const MOCK_USER = {
  email: "test@popzy.com",
  password: "password123",
  name: "Nguyễn Văn A",
};

const JWT_KEY = "popzy-auth-token";

export const login = (email: string, pass: string): boolean => {
  if (email === MOCK_USER.email && pass === MOCK_USER.password) {
    const mockToken = `mock-jwt-token-for-${email}`;
    localStorage.setItem(JWT_KEY, mockToken);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(JWT_KEY);
};


export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(JWT_KEY);
  return !!token;
};
