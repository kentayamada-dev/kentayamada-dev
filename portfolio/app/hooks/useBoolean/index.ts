import { useCallback, useState } from 'react';
import type { UseBooleanType } from './types';

const useBoolean: UseBooleanType = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  const toggle = useCallback(() => {
    setValue((prev) => {
      return !prev;
    });
  }, []);

  return { setValue, toggle, value };
};

export { useBoolean };
