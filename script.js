// let getJokeFun = async () => {
//     let getDATA = await fetch('https://api.chucknorris.io/jokes/random'),
//         data = await getDATA.json(),
//         chuck = new Chuck(data);
//         chuck.render()
// }
// let getJoke = document.querySelector('#getJoke')
// getJoke.addEventListener('click', getJokeFun);



// class Chuck {
//     constructor(data) {
//         this.create(data);
//     }
//     create(data){
//         for(let key in data){
//             this[key] = data[key];
//         }
//     }
//     render(){
//         for(let key in this){
//             console.log(`${key} : ${this[key]}`)
//         }
//     }
// }
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
                    // except = false;
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

        // joke = joke.result && joke.result.length>0 ? joke.result.map(joke => new Joke(joke)) :  new Joke(joke)

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
        for (let key in this) {
            data.push(`<li>${key}: ${this[key]}</li>`)
        }
        console.log(data)
        jokesAll.innerHTML += `<ul>${data.join('')}</ul>`
    }
}
let jokeForm = new Form('joke', `https://api.chucknorris.io/jokes/`)
jokesAll = document.querySelector('#jokes')

// console.log(jokeForm)