export const getUserById = async(url: string) => {
  try {
    return await (await fetch(url)).json();
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};
