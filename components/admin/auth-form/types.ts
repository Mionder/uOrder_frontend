export type LoginDto = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
};