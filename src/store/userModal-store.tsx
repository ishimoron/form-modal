import { makeAutoObservable } from 'mobx'

interface IUserModal {
	firstName: string
	lastName: string
	isOpen: boolean
}
class userModal {
	user: IUserModal = {
		firstName: '',
		lastName: '',
		isOpen: false,
	}

	constructor() {
		// whats more preferable describe this way or use makeAutoObservable
		// makeObservable(this, {
		// 	user: observable,
		// 	openModal: action,
		// 	closeModal: action,
		// 	changeUserData: action,
		// })
		makeAutoObservable(this, {}, { autoBind: true })
	}

	openModal() {
		this.user.isOpen = true
	}

	closeModal() {
		this.user.isOpen = false
	}

	changeUserData(user: IUserModal) {
		this.user.firstName = user.firstName
		this.user.lastName = user.lastName
		this.user.isOpen = user.isOpen
	}
}

const userModalStore = new userModal()
export default userModalStore
