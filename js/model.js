class Model {
	constructor({
		onPostsChanged
	}) {
		// посты
		this.posts = [];
		// состояние ошибки
		this.errorType = false;

		// передача в конструктор
		this.onPostsChanged = onPostsChanged;
	}

	// добавление поста
	addPost(title, description) {

		if (this._isPostValid(title, description)) {

			this.posts.push({
				title,
				description,
				timestamp: Date.now()
			});
		} else {
			console.log('3 ошибка  =' + this.errorType)
		}
		// model оповещает, что произошло изменение данных
		// передача в конструктор и далее в контроллер
		this.onPostsChanged(this.posts, this.errorType);
	}

	// не используется
	getPosts() {
		return this.posts;
	}

	// проверка заголовка и текста поста
	_isPostValid(title, description) {
		// если поля ввода пустые
		if (title.length == 0 || description.length == 0) {
			this.errorType = 1;
			return false;
		} else {
			// если заполнение полей ввода валидно по лимиту символов
			if (title.length < 20 && description.length < 100) {
				this.errorType = false;
				return true;
				// если заголовок превышает лимит символов
			} else if (title.length > 20) {
				this.errorType = 2;
				return false;
				// если текст поста превышает лимит символов
			} else if (description.length > 100) {
				this.errorType = 3;
				return false;
			} else {
				return false;
			}
		}
	}
}