import { useState } from 'react';

const EmailForm = ({ onEmailSubmit, disabled }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onEmailSubmit(email);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3 className='form-header'>Login</h3>
                <div className='input-wrapper'>
                    <input
                        placeholder='Enter your email'
                        className=''
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div>
                    <button
                        color='primary'
                        className=''
                        disabled={disabled}
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Send Magic Link
                    </button>
                </div>
            </form>
            <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
        </>
    );
};

export default EmailForm;