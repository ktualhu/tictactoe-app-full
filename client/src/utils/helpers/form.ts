import React from 'react';
import { validateTextField } from '../../utils/validate';
import { FIELD_LENGTH_ERROR } from '../constants';

export const useFormField = (name: string, initValue: string = '') => {
  const [value, setValue] = React.useState(initValue);
  const [isInvalid, setInvalid] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const onChange = React.useCallback(e => {
    setValue(prevState => {
      prevState.length && !e.target.value.length && setInvalid(false);
      return e.target.value;
    });
  }, []);

  const changeInvalidValue = (value: boolean, errMsg: string = '') => {
    setErrorMsg(
      errMsg ||
        `${
          name.charAt(0).toLocaleUpperCase() + name.slice(1)
        } ${FIELD_LENGTH_ERROR}`
    );
    setInvalid(value);
  };

  const onLocalErrors = () => {
    return !validateTextField(value);
  };

  return {
    props: {
      value,
      isInvalid,
      onChange,
    },
    errorMsg,
    changeInvalidValue,
    onLocalErrors,
  };
};
