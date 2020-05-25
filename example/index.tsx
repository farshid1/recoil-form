import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import { Form, Field, ErrorMessage, useFormState, useFormValues } from '../dist';

const initialValues = {
  email: 'some@email.com',
  delayed: new Promise(resolve =>
    setTimeout(() => resolve('delayed value'), 3000)
  ),
};

const onSubmit = (values, { setValues, setErrors }) => new Promise(resolve =>
  setTimeout(() => {
    console.log(values);
    setValues('email', 'another@email.com', 'delayed', 'another value');
    setErrors({ email: 'already in use', delayed: 'another error' });
    resolve();
  }, 3000)
);

const Values = () => {
  const state = useFormState();
  const values = useFormValues();
  return (
    <>
      <h4>State: {state}</h4>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </>
  );
};

const FieldSet = () => {
  return (
    <>
      <div>
        <label>
          Email:
          <Field name="email" type="email" />
          <ErrorMessage name="email" as="div" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <Field name="password" type="password" />
          <ErrorMessage name="password" as="div" />
        </label>
      </div>
      <div>
        <label>
          Delayed field:
          <Field name="delayed" type="text" fallback="loading..." />
          <ErrorMessage name="delayed" as="div" />
        </label>
      </div>
      <div>
        <label>
          <Field name="checkbox" type="checkbox" />
          Checkbox
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <FieldSet />
        <React.Suspense fallback={<div>Loading…</div>}>
          {' '}
          <Values />
        </React.Suspense>
      </Form>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
