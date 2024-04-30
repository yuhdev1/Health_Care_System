let globalUser = {
  email: "user123",
  role: {
    name: "user"
  }
};

export function getGlobalUser() {
  return globalUser;
}

export function setGlobalUser(user) {
  globalUser = user;
}