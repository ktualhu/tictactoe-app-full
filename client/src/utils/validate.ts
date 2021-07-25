export const validateTextField = (text: string) => {
  const trimmedText = text.trim();
  let valid = false;
  if (trimmedText.length < 5) {
    valid = false;
  }

  if (trimmedText.length >= 5) {
    valid = true;
  }
  return valid;
};
