import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import Api from '../api/Api';
import { ComponentDto } from '../types/entities';


interface Value {
  components: ComponentDto[];
  setComponents: Dispatch<SetStateAction<ComponentDto[]>>;
  error: string | null;
}

export default function usePostComponents(postId: number): Value {
  const [ components, setComponents ] = useState<ComponentDto[] | null>(null);

  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if (components) {
      return;
    }

    Api.getComponents(postId).then((response) => {
      const {
        result: newComponents,
        error: newError,
      } = response;

      if (newError) {
        setError(newError);
      } else {
        setComponents(newComponents);
      }
    });
  }, [ postId ]);


  return {
    components,
    setComponents,
    error,
  };
}
