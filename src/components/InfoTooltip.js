import ok from '../images/ok.svg';
import error from '../images/error.svg';

function InfoTooltip({ isOPen, onClose, isReg }) {
    return (
        <div className={isOPen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <img
                    className='popup__info-icon'
                    src={isReg ? ok : error}
                    alt='результат регистрации'
                />
                <p className='popup__info-text'>{isReg ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}
                />
            </div>
        </div>
    )
}

export default InfoTooltip;