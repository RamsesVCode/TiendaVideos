(async function getAllData(){
    async function getData(url){
        let promiseData = await fetch(url);
        let data = await promiseData.json();
        return data;
    }
    function getItemTemplate(item, val){
        if(val=='0'){
            return  `<a href="#" class="item-list">
                        <figure>
                            <img src="${item.medium_cover_image}">
                        </figure>
                        <p>
                            ${item.title}
                        </p>
                    </a>`;
        }else if(val=='1'){
            return  `<div class="item-movies">
                        <figure>
                            <img src="${item.medium_cover_image}">
                        </figure>
                        <div class="description-container">
                            <p class="item-description">${(item.title).substring(0,9)}...</p>
                            <p class="item-val"><span class="star"><i></i></span>${item.rating}/10</p>
                        </div>
                    </div>`;
        }
    }
    function getHTML(HTMLString){
        let html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];   
    }
    //contenedor de peliculas nuevas
    function renderMovies(list, $container,val){
        $container.children[0].remove();
        list.forEach((item)=>{
            let HTMLString = getItemTemplate(item,val);
            let movieItem = getHTML(HTMLString);
            $container.append(movieItem);
        });
    }
    const $movies = document.getElementById('movies');
    const $General = document.getElementById('movies-container');
    let lista = await getData('https://yts.mx/api/v2/list_movies.json?Genres=Action');
    renderMovies(lista.data.movies,$movies,0);
    let listaGeneral = await getData('https://yts.mx/api/v2/list_movies.json?genre=horror');
    renderMovies(listaGeneral.data.movies,$General,'1');
    console.log(listaGeneral);
    // console.log(lista);

})();