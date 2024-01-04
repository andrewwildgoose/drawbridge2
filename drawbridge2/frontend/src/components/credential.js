import React, { useState } from 'react';

import HoverButtons from './hoverButtons';

import '../css/stored_credentials.css'

function Credential({credential}) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='stored_credential'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <div className='credential_content'>
                <div class="credential_title">{credential.title}</div>
                <div class="credential_username">{credential.username}</div>
                <div class="credential_url">{credential.url}</div>  
            </div>
            <HoverButtons 
                className="hover_buttons"
                isHovered={isHovered}
            />

    </div>
    );
}

export default Credential;