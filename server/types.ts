export type User = {
  id: string;
  username: string;
  color?: string;
};

export type Message = {
  user: User;
  text: string;
  ip: string;
  os: string;
  browser: string;
};
