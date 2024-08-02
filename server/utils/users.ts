import { User } from "@/server/types";
export const users = [] as User[];

// Join user to chat
export function userJoin(user: User) {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  user.color = "#" + randomColor;
  users.push(user);
  return user;
}

// Get current usere
export function getCurrentUser(id: string) {
  return users.find((user) => user.id === id);
}

// User leaves chat
export function userLeave(id: string) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
