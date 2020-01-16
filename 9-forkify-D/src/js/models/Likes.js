export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
       const like = { id, title, author, img };
       this.likes.push(like);

    // Persis data in local storage 
        this.persistData();
       return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        
        // Persis data in local storage 
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
        // localStorage.setItem('likes', this.likes.toString()); in kar nemikone. fek konam chon array az object e.
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes')); // age chizi toosh nabashe, getItem null barmigardoone
        if (storage) this.likes = storage;

    }

};