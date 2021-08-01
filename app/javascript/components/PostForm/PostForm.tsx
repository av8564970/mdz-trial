import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import clsx from 'clsx';

import { ComponentDto, ComponentPayload } from '../../types/entities';

import './PostForm.scss';


const COMPONENT_TYPES = {
  string: {
    payloadPlaceholder: JSON.stringify({
      label: 'Label',
      value: 'Value',
    }, undefined, 2),
    payloadValidator: (payload: Record<string, unknown>): boolean => {
      return payload instanceof Object &&
        'string' === typeof payload.label &&
        'string' === typeof payload.value;
    },
  },
  boolean: {
    payloadPlaceholder: JSON.stringify({
      label: 'Checked?',
      value: true,
    }, undefined, 2),
    payloadValidator: (payload: Record<string, unknown>): boolean => {
      return payload instanceof Object &&
        'string' === typeof payload.label &&
        'boolean' === typeof payload.value;
    },
  },
  relation: {
    payloadPlaceholder: JSON.stringify({
      label: 'Related Posts',
      value: [ 1 ],
    }, undefined, 2),
    payloadValidator: (payload: Record<string, unknown>): boolean => {
      return payload instanceof Object &&
        'string' === typeof payload.label &&
        Array.isArray(payload.value) &&
        !payload.value.some((el) => 'number' !== typeof el);
    },
  },
};

function prepareFormValues(values: RawFormValues): PostFormValues {
  return {
    ...values,
    components: values.components.map((component, i) => {
      const {
        id,
        component_type,
        payload,
        ord,
      } = component;

      let newPayload: Record<string, unknown>;
      try {
        newPayload = JSON.parse(payload);
      } catch (e) {
        throw new Error(`Component #${i + 1}: ${e.message}`);
      }
      if (!COMPONENT_TYPES[component_type].payloadValidator(newPayload)) {
        throw new Error(`Component #${i + 1}: Invalid JSON`);
      }

      return {
        id,
        component_type,
        payload: newPayload as unknown as ComponentPayload,
        ord,
      };
    }),
  };
}


type RawComponentValue = Pick<ComponentDto, 'id' | 'component_type' | 'ord'> & { payload: string };

type ComponentValue = Pick<ComponentDto, 'id' | 'component_type' | 'payload' | 'ord'>;

interface RawFormValues {
  components: RawComponentValue[];
}

export interface PostFormValues {
  components: ComponentValue[];
}

interface PostFormProps {
  components?: ComponentDto[];
  onSubmit: (values: PostFormValues) => Promise<void>;
  className?: string;
}

const PostForm: FC<PostFormProps> = (props) => {
  const {
    components,
    onSubmit,
    className,
  } = props;


  const { push } = useHistory();

  const [ form ] = Form.useForm();

  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const [ error, setError ] = useState<string | null>(null);


  async function handleFinish(values: RawFormValues): Promise<void> {
    setIsSubmitting(true);

    let preparedValues: PostFormValues;
    try {
      preparedValues = prepareFormValues(values);
    } catch (e) {
      setError(e.message);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(preparedValues);
    } catch (e) {
      setError(e);
    }

    setIsSubmitting(false);
    push('/posts');
  }


  const initialFormValues = {
    components: components?.map((component) => ({
      ...component,
      payload: JSON.stringify(component.payload, undefined, 2),
    })) ?? [],
  };


  return (
    <Form
      form={form}
      initialValues={initialFormValues}
      onFinish={handleFinish}
      autoComplete="off"
      className={clsx('post-form', className)}
    >
      <Form.List name="components">
        {(
          fields,
          {
            add,
            remove,
          },
        ) => (
          <>
            <Form.Item
              className="post-form__item post-form__heading"
            >
              Components
            </Form.Item>
            {fields.length ?
              fields.map((field, i) => (
                <Space
                  key={field.key}
                  align="baseline"
                  className="post-form__space"
                >
                  <div className="post-form__i">#{i + 1}</div>
                  <Form.Item
                    {...field}
                    label="Type"
                    name={[ field.name, 'component_type' ]}
                    fieldKey={[ field.fieldKey, 'component_type' ]}
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                      },
                    ]}
                    className="post-form__item post-form__type"
                  >
                    <Select>
                      {Object.keys(COMPONENT_TYPES).map((type) => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={
                      (prevValues, nextValues) =>
                        prevValues.components[field.fieldKey]?.component_type !==
                        nextValues.components[field.fieldKey]?.component_type
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Payload"
                        name={[ field.name, 'payload' ]}
                        fieldKey={[ field.fieldKey, 'payload' ]}
                        rules={[
                          {
                            required: true,
                            message: 'Required',
                          },
                        ]}
                        className="post-form__item post-form__payload"
                      >
                        <Input.TextArea
                          rows={6}
                          placeholder={COMPONENT_TYPES[form.getFieldValue([
                            'components',
                            field.fieldKey,
                            'component_type',
                          ])]?.payloadPlaceholder}
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Order"
                    name={[ field.name, 'ord' ]}
                    fieldKey={[ field.fieldKey, 'ord' ]}
                    rules={[
                      {
                        required: true,
                        message: 'Required',
                      },
                    ]}
                    className="post-form__item post-form__order"
                  >
                    <InputNumber min={1} />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              )) :
              (
                <div>No components are defined.</div>
              )}
            <Form.Item className="post-form__item">
              <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                Add component
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item className="post-form__actions">
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>Save</Button>
        <div className="post-form__error">{error}</div>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
