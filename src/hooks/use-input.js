import { useCallback } from "react";
import { useState } from "react";
const useInput = (validate) => {
  const [input, setInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = validate(input);
  const hasError = !isValid && isTouched;
  const inputHandler = useCallback((event) => {
    setInput(event.target.value);
  }, []);
  const valueHandler = useCallback((value) => {
    setInput(value);
  }, []);
  const reset = useCallback(() => {
    setInput("");
    setIsTouched(false);
  }, []);
  const inputBlurHandler = useCallback(() => {
    setIsTouched(true);
  }, []);

  return {
    value: input,
    isTouched,
    hasError,
    inputBlurHandler,
    inputHandler,
    reset,
    valueHandler,
  };
};

export default useInput;
