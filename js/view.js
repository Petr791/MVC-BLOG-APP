class View {
	constructor({
		onNewPost
	}) {
		// работа view с элементами на странице
		this.postsNode = document.querySelector('#posts');
		this.titleInputNode = document.querySelector('#post-title-input');
		this.descInputNode = document.querySelector('#post-text-input');
		this.btnNode = document.querySelector('#add-post-btn');
		this.errorNode = document.querySelector('#validation-messag');

		// передача в конструктор
		this.onNewPost = onNewPost;

		// обработчик события на кнопке "добавить пост"
		this.btnNode.addEventListener('click', this._handleBtnClick);

	}

	// view отрисовывает на экране список постов
	render(posts, errorType) {

		this._clearView();

		if (errorType == 1) {
			this.errorNode.innerText = 'Заполните поле ввода!';
		}
		if (errorType == 2) {
			this.errorNode.innerText = 'Заголовок превышает 20 символов!';
		}
		if (errorType == 3) {
			this.errorNode.innerText = 'Текст поста превышает 100 символов!';
		}

		posts.forEach(post => {
			this.postsNode.innerHTML += `
			<div class='post'>
			<p class='post__date'>${this._buildDateString(post.timestamp)}</p>
			<p class='post__title'>${post.title}</p>
			<p class='post__text'>${post.description}</p>
			</div>
			`;
		});
	}

	// view реагирует на действия пользователя
	_handleBtnClick = () => {
		const title = this.titleInputNode.value;
		const description = this.descInputNode.value;

		// view сообщает, что пользователь добавил новый пост
		// передача в constuctor и далее в контроллер
		this.onNewPost(title, description);
	}

	// создание даты поста
	_buildDateString(timestamp) {
		const date = new Date(timestamp);

		let dd = date.getDate();
		if (dd < 10) dd = '0' + dd;

		let mm = date.getMonth() + 1;
		if (mm < 10) mm = '0' + mm;

		let yyyy = date.getFullYear();

		let hh = date.getHours();
		if (hh < 10) hh = '0' + hh;

		let mt = date.getMinutes();
		if (mt < 10) mt = '0' + mt;

		return `${dd}.${mm}.${yyyy} ${hh}:${mt}`;
	}

	// очистка полей
	_clearView() {
		/* this.titleInputNode.value = ''; */
		/* this.descInputNode.value = ''; */
		this.postsNode.innerHTML = '';
		this.errorNode.innerText = '';
	}
}