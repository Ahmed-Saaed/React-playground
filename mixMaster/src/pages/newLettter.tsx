import React, {FunctionComponent as Fc} from 'react';
import {Form, redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useNavigation} from 'react-router-dom';

interface NewLetterProps {}

const newslettterUrl = 'https://www.course-api.com/cocktails-newslettter';

export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(newslettterUrl, data);
    toast.success(response.data.msg);
  } catch (error) {
    toast.error(error);
  }

  return redirect('/');
};

const NewLetter: Fc<NewLetterProps> = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <form method='POST' className='form'>
      <h4 style={{textAlign: 'center'}}>our newsLetter</h4>
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>
          name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue='hello me'
          className='form-input'
        />
      </div>
      {/* latname */}
      <div className='form-row'>
        <label htmlFor='lastName' className='form-label'>
          last name
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          defaultValue='ahmed'
          className='form-input'
        />
      </div>

      {/* email */}
      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          email
        </label>
        <input
          type='text'
          name='email'
          id='email'
          defaultValue='test@test.com'
          className='form-input'
        />
      </div>
      <button
        type='submit'
        style={{marginTop: '0.5rem'}}
        className='btn-block btn'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </form>
  );
};

export default NewLetter;
