// Just make sure the input is one word and all alphanumeric
const clean_input = (input: string) => {
  const regex = /^[a-zA-Z0-9]+$/;

  if (input.match(regex)) {
    return input;
  }
  return "";
};

export { clean_input };
