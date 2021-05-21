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
    constructor(id) {
        this.el = document.querySelector(`#${id}`)
        this.getCategories();
        this.el.addEventListener('submit', this.submit.bind(this))
    }
    async submit(e) {
        e.preventDefault();
        let type = document.querySelector("input[name=joke_choice]:checked")
        console.log(type.value)
        let url = `https://api.chucknorris.io/jokes/`;
        switch (type.value) {
            case 'random':
                url += 'random'
                break;
            case 'categories':
                let category = document.querySelector('input[name=category]:checked')
                url += `random?category=${category.value}`
                break;
            case 'search':
                url += 'search?query=hello'
                break;
        }


        let joke = await this.request(url)
        console.log(joke)
    }
    async request(url) {
        let getDATA = await fetch(url),
            data = await getDATA.json();
        return data

    }
    async getCategories(){
        let categories = await this.request(`https://api.chucknorris.io/jokes/categories`)
        // console.log(categories)
        categories = categories
            .map((cat,index)=>`<li><lable>${cat}<input type="radio" value="${cat}" name="category" ${index===0 ? 'checked' : ""}></lable></li>`)
            .join("")

        let categoriesDATA = document.querySelector('ul#categories')
        categoriesDATA.innerHTML = categories
    }
}
let jokeForm = new Form('joke')

// console.log(jokeForm)