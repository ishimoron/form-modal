import userModalStore from '../../store/userModal-store'
import styles from './styles.module.scss'

const Modal = () => {
	const { user, closeModal } = userModalStore
	return (
		<>
			{user.isOpen && (
				<div className={styles.ModalOverlay}>
					<div className={styles.Modal}>
						<div className={styles.ModalHeader}>
							<button className={styles.CloseButton} onClick={closeModal}>
								Закрыть
							</button>
						</div>
						<div className={styles.ModalContent}>
							<p>{`Здравствуйте, ${user.firstName} ${user.lastName}`}</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Modal
