import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import userModalStore from '../../store/userModal-store'
import Modal from '../Modal/modal'
import styles from './styles.module.scss'

type IUserData = {
	firstName: string
	lastName: string
}

const Form: React.FC = observer(() => {
	const { changeUserData, user } = userModalStore
	const [userData, setUserData] = useState<IUserData>({
		firstName: '',
		lastName: '',
	})
	const [error, setError] = useState<IUserData>({
		firstName: '',
		lastName: '',
	})

	const handleChangeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setUserData(prevUserData => ({
			...prevUserData,
			[name]: value,
		}))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const firstNameIsEmpty = userData.firstName.trim().length === 0
		const lastNameIsEmpty = userData.lastName.trim().length === 0

		if (firstNameIsEmpty || lastNameIsEmpty) {
			setError({
				firstName: firstNameIsEmpty ? 'Поле не должно быть пустым' : '',
				lastName: lastNameIsEmpty ? 'Поле не должно быть пустым' : '',
			})
		} else {
			setError({ firstName: '', lastName: '' })
			changeUserData({ ...userData, isOpen: true })
			if (!firstNameIsEmpty && !lastNameIsEmpty) {
				setUserData({ firstName: '', lastName: '' })
			}
		}
	}

	useEffect(() => {
		// handle case if one of the fields is empty error will be shown and form should not be submitted
		const firstNameNotEmpty = userData.firstName.trim().length > 0
		const lastNameNotEmpty = userData.lastName.trim().length > 0

		if (firstNameNotEmpty) {
			setError(prevState => ({ ...prevState, firstName: '' }))
		}

		if (lastNameNotEmpty) {
			setError(prevState => ({ ...prevState, lastName: '' }))
		}
	}, [userData])

	if (user.isOpen) {
		return <Modal />
	}

	return (
		<div className={styles.formWrapper}>
			<form onSubmit={event => handleSubmit(event)}>
				<div className={styles.formContainer}>
					<div className={styles.formGroup}>
						<label htmlFor='firstName' className={styles.formLabel}>
							Имя
						</label>
						<span className={styles.formErrorMsg}>
							{error.firstName && error.firstName}
						</span>
						<input
							type='text'
							name='firstName'
							id='firstName'
							value={userData.firstName}
							onChange={event => handleChangeUserData(event)}
							className={styles.formInput}
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='lastName' className={styles.formLabel}>
							Фамилия
						</label>
						<span className={styles.formErrorMsg}>
							{error.lastName && error.lastName}
						</span>
						<input
							type='text'
							name='lastName'
							id='lastName'
							value={userData.lastName}
							onChange={event => handleChangeUserData(event)}
							className={styles.formInput}
						/>
					</div>
				</div>
				<button type='submit' className={styles.formButton}>
					Готово
				</button>
			</form>
		</div>
	)
})

export default Form
