let getJokeFun = async () => {
    let getDATA = await fetch('https://api.chucknorris.io/jokes/random'),
        data = await getDATA.json(),
        chuck = new Chuck(data);
        chuck.render()
}
let getJoke = document.querySelector('#getJoke')
getJoke.addEventListener('click', getJokeFun);


class Chuck {
    constructor(data) {
        this.create(data);
    }
    create(data){
        for(let key in data){
            this[key] = data[key];
        }
    }
    render(){
        for(let key in this){
            console.log(`${key} : ${this[key]}`)
        }
    }
}