class Controller {
	constructor() {

		this.model = new Model({
			onPostsChanged: this.handleModelPostsChanget
		});

		this.view = new View({
			onNewPost: this.handleViewNewPost
		});
	}

	handleModelPostsChanget = (posts, errorType) => {
		//в случае изменений(новые посты) отрисовка постов
		this.view.render(posts, errorType);
	}

	handleViewNewPost = (title, description) => {
		// обработка добавления нового поста
		this.model.addPost(title, description);
	}
}