import React from "react";
import "./modal.css";

function Modal({show, onClose, modal_text_prop}) {
    
    let change = () => {
        window.onclick = function(event) {
            if (event.target.className === 'modal') {
              event.target.style.display = 'none';
            }
          }
        onClose();
    }

    let innerHeight = window.innerHeight/2.7;
    let height_px = `${innerHeight}px auto`;
    
    if (!show) {
        return null;
    }
    
    return (
        <div className='modal' onClick = {change}>
            <div className='modal-content' style = {{margin: height_px}}>
                {/* &times; dispalys the x symbol on the modal window */}
                <span className='close'>&times;</span>
                <p style = {{color: 'black'}}>{modal_text_prop}</p>
            </div>
        </div>
    );
}

export default Modal;