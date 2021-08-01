import React, {
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';

import { ComponentDto } from '../../types/entities';
import ComponentPost from '../ComponentPost/ComponentPost';

import './Component.scss';


interface ComponentProps {
  component: ComponentDto;
  postChain: number[];
  className?: string;
}

const Component: FC<ComponentProps> = (props) => {
  const {
    component,
    postChain,
    className,
  } = props;

  const {
    component_type: type,
    payload,
  } = component;


  async function handleComponentPostDelete(_id: number): Promise<void> {
    alert('Not implemented yet');
  }


  const [ jsx, setJsx ] = useState<ReactNode>(null);

  useEffect(() => {
    switch (type) {
      case 'string':
        setJsx(payload.value as string);
        break;
      case 'boolean':
        setJsx(`${payload.label}: ${payload.value as boolean ? 'Yes' : 'No'}`);
        break;
      case 'relation':
        setJsx(
          <>
            <div className="component__relation-label">{payload.label}</div>
            <div className="component__relation-value">
              {(payload.value as number[]).map((postId) => postChain.includes(postId) ?
                (
                  <div key={postId} className="component__error">
                    Short circuit break (
                    {postChain.join(' → ')}
                    {' → '}
                    {postId}
                    )
                  </div>
                ) :
                (
                  <ComponentPost
                    key={postId}
                    id={postId}
                    onDelete={handleComponentPostDelete}
                    chain={[ ...postChain, postId ]}
                    className="component__post"
                  />
                ))}
            </div>
          </>,
        );
        break;
    }
  }, []);


  return (
    <div className={clsx('component', `component_type_${type}`, className)}>
      {jsx ?
        jsx :
        (
          <div className="component__loading">Loading...</div>
        )}
    </div>
  );
};

export default Component;
