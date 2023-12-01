import React, { useState } from 'react';
import PasswordGenerator from './password_generator';

import '../css/modals.css';

function GeneratorModal({ closeGenerator, sendGeneratedPassword }) {

    const [generatedPassword, setGeneratedPassword] = useState('');

    // const handleConfirmPassword = () => {
    //     console.log("Password: ", generatedPassword)
    //     // Assuming 'password' holds the generated password
    //     // addPassword(generatedPassword); // Pass generated password back to CredentialModal
    //     closeGenerator(false); // Close the GeneratorModal
    // };

    const handlePasswordChange = (newPassword) => {
        console.log("Password in generator modal: ", newPassword)
        setGeneratedPassword(newPassword)
    }

    const handleConfirmPassword = () => {
        sendGeneratedPassword(generatedPassword)
    }

    return (
        <div className='modalGeneratorContainer'>
            <div className='modalCloseButton'>
                <button className='button' onClick={() => closeGenerator(false)}> X </button>
            </div>
            {<PasswordGenerator onPasswordChange={handlePasswordChange}/>}  
            <div>
                <button className='button' onClick={() => closeGenerator(false)}> Cancel </button>
                {<button className='button' onClick={handleConfirmPassword}> Confirm Password </button>}
            </div>
        </div>
    )
}

export default GeneratorModal;