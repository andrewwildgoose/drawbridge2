import keyImg from '../staticAssets/key.png'
import usernameImg from '../staticAssets/people.png'
import gotToImg from '../staticAssets/share.png'


function HoverButtons({ isHovered }) {

    if (!isHovered) {
        return null; 
    }

    return (
        <div className="hover_buttons">
            <button className='button'><img src={keyImg} className="key_img"/></button>  
            <button className='button'><img src={usernameImg} className="key_img"/></button>
            <button className='button'><img src={gotToImg} className="key_img"/></button>
        </div>
    );

}

export default HoverButtons;