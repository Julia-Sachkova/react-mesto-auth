import error from '../images/error.svg';

function InfoTooltipLogin({ isOPen, onClose, isLog, errText }) {
    return (
        <div className={isOPen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <img
                    className='popup__info-icon'
                    src={!isLog ? error : ''}
                    alt='результат регистрации'
                />
                <p className='popup__info-text'>{!isLog ? errText : ''}</p>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltipLogin;