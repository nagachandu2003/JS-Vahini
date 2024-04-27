import React from 'react';
import "./index.css"

const SS = () => {
  return (
    <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Sansthapak Sadasaya</h1>
      </div>
      <form className='ss-form'>
        <div className='ss-form-field'>
          <label htmlFor='founderName' className='ss-label'>1. संस्थापक सदस्य नाम:</label>
          <input type='text' id='founderName' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='founderMobile' className='ss-label'>2. संस्थापक सदस्य मोबाइल नंबर:</label>
          <input type='text' id='founderMobile' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='district' className='ss-label'>3. जिला:</label>
          <input type='text' id='district' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='occupation' className='ss-label'>4. पेशा:</label>
          <input type='text' id='occupation' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='perception' className='ss-label'>5. वाहिनी / पदयात्री के नज़र में यह संस्थापक सदस्य:</label>
          <input type='text' id='perception' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='successPerson' className='ss-label'>6. संस्थापक सदस्य के लिए सवाल:</label>
          <input type='text' id='successPerson' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='visitorName' className='ss-label'>7. वाहिनी / पदयात्री का नाम:</label>
          <input type='text' id='visitorName' className='ss-input' />
        </div>
        <div className='ss-form-field'>
          <label htmlFor='visitorMobile' className='ss-label'>8. वाहिनी / पदयात्री का मोबाइल नंबर:</label>
          <input type='text' id='visitorMobile' className='ss-input' />
        </div>
        <button type='submit' className='ss-submit-btn'>Submit</button>
      </form>
    </div>
  );
};

export default SS;
