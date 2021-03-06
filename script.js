class Form {
    constructor(id, api) {
        this.api = api
        this.el = document.querySelector(`#${id}`)
        this.getCategories();
        this.el.addEventListener('submit', this.submit.bind(this))
    }
    async submit(e) {
        e.preventDefault();
        let type = document.querySelector("input[name=joke_choice]:checked")

        // console.log(type.value)
        let url = this.api;
        let except = true;
        switch (type.value) {
            case 'random':
                url += 'random'
                break;
            case 'categories':
                let category = document.querySelector('input[name=category]:checked')
                url += `random?category=${category.value}`
                break;
            case 'search':
                let search = document.querySelector('#search')
                if (!search.value) {
                    search.focus();
                } else {
                    url += `search?query=${search.value ? search.value : `Hello`}`
                }
                break;
        }

        if (except) {
            let joke = await this.request(url)
            if (joke.result) {
                if (joke.result.length > 0) {
                    joke = joke.result.map(joke => new Joke(joke))
                }
            } else {
                joke = new Joke(joke)
            }
            console.log(joke)
        }

    }
    async request(url) {
        let getDATA = await fetch(url),
            data = await getDATA.json();
        return data

    }
    async getCategories() {
        let categories = await this.request(`${this.api}categories`)
        console.log(categories)
        categories = categories
            .map((cat, index) => `<li><lable>${cat}<input type="radio" value="${cat}" name="category" ${index===0 ? 'checked' : ""}></lable></li>`)
            .join("")

        let categoriesDATA = document.querySelector('ul#categories')
        categoriesDATA.innerHTML = categories
    }
}
class Joke {
    constructor(joke) {
        this.create(joke)
        this.render();
    }
    create(joke) {
        for (let key in joke) {
            this[key] = joke[key]
        }
    }
    render() {
        let data = [];
        // for (let key in this) {
        //     console.log(this.value)
        //     data.push(`<li>${key}: ${this[key]}</li>`)
        // }
        if (this.value !== undefined) {
            data.push(`<li>ID: ${this.id}</li> <li>Joke: ${this.value}</li>`)
            let FavBtn = document.createElement('button');

            FavBtn.innerHTML = this.favourite ? "Remove from favourite" : "Add to favourite";
            FavBtn.dataset.favourite = this.favourite ? true : false;

            FavBtn.addEventListener('click', this.addFav.bind(this))

            let FavBtnLi = document.createElement('li')
            FavBtnLi.append(FavBtn);

            let list = document.createElement('ul')
            list.dataset.id = this.id
            list.innerHTML = this.value ? data.join('') : console.log(`sorry`)
            list.append(FavBtnLi)

            this.favourite ? fav.append(list) : getAll.append(list)
        } else 
            alert(`I can't get Joke with this value: "${search.value}"`)
    }
    addFav() {
        let jokeBtn = document.querySelector(`ul[data-id=${this.id}] button`)
        jokeBtn.innerHTML = "Remove from favourite"


        let storageJokes = localStorage.getItem('favJokes');
        storageJokes = storageJokes ? JSON.parse(storageJokes) : {};
        if (jokeBtn && jokeBtn.dataset.favourite === "false") {
            this.favourite = true;
            jokeBtn.innerHTML = 'Remove from favourite';
            jokeBtn.dataset.favourite = true;
            storageJokes[this.id] = this;
        } else {
            if (jokeBtn) {
                jokeBtn.innerHTML = 'Add to from favourite';
                jokeBtn.dataset.favourite = false;
            }
            this.favourite = false;
            delete storageJokes[this.id];
        }
        localStorage.setItem('favJokes', JSON.stringify(storageJokes))
        Jokes.fav();
    }

}

class Jokes {
    static fav() {
        let storageJokes = localStorage.getItem('favJokes');
        if (storageJokes) {
            storageJokes = JSON.parse(storageJokes)
            for (let key in storageJokes) {
                new Joke(storageJokes[key])
            }
        }
    }
}

let jokeForm = new Form('joke', `https://api.chucknorris.io/jokes/`),
    getAll = document.querySelector('#getAll'),
    fav = document.querySelector('#fav')

Jokes.fav()