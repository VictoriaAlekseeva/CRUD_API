export const isFullBodyValid = (username: any, age: any, hobbies: any) => {
  if (typeof username !== 'string') return false;
  if (typeof age !== 'number') return false;
  if (!Array.isArray(hobbies) || !hobbies.every((hobby: any) => typeof hobby === "string")) return false;
  return true;
}

export const isPartBodyValid = (data: any) => {
  if (data === undefined || typeof data !== 'object') return false;

  if (data.username !== undefined && typeof data.username !== 'string') return false;
  if (data.age !== undefined && typeof data.age !== 'number') return false;
  if (data.hobbies !== undefined && (!Array.isArray(data.hobbies) || !data.hobbies.every((hobby: any) => typeof hobby === "string"))) return false;
  if (data.username === undefined && data.age === undefined && data.hobbies === undefined) return false;

  return true;
}