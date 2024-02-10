export const isBodyValid = (username: any, age: any, hobbies: any) => {
  if (typeof username !== 'string') return false;
  if (typeof age !== 'number') return false;
  if (Array.isArray(hobbies) || !hobbies.every((hobby: any) => typeof hobby === "string")) return false;
}