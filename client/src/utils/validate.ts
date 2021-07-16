export const validateTextField = (text: string) => {
  let valid = false;
  if (text.length < 5) {
    valid = false;
  }

  if (text.length >= 5) {
    valid = true;
  }
  return valid;
};
