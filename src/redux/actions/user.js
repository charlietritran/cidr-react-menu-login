export const updateUser = (obj) => {
  return {
    type: 'user/update',
    payload: obj,
  };
};
