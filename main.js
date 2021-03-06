
const URL = 'https://api.thecatapi.com/v1/images/search?limit=2'
const URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites'
const URL_DELETE_FAVOURITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}?`;
const URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

const spanError = document.getElementById('error')

async function loadRandomCats() {
    const result = await fetch(URL);
    const data = await result.json();
    if(result.status !== 200) {
        spanError.innerText = "Hubo un error: " + result.status
    } else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const btn1 = document.getElementById('random-cat-btn1')        
        const btn2 = document.getElementById('random-cat-btn2')        
        img1.src = data[0].url
        img2.src = data[1].url

        btn1.onclick = () => saveFavouriteCat(data[0].id);
        btn2.onclick = () => saveFavouriteCat(data[1].id);
    }
}
async function loadFavouriteCats() {
    const result = await fetch(URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '6cd2e2ec-ea37-44bb-9f4a-5be4c8582143', 
        },
    });
    const data = await result.json();
    if(result.status !== 200) {
        spanError.innerText = "Hubo un error: " + result.status + data.message
    } else {
        const container = document.getElementById('favs-container')
        container.innerHTML = ""
        data.forEach(michi => {
            
            const catContainer = document.createElement('div')
            container.appendChild(catContainer)
            const favImgContainer = document.createElement('div')
            catContainer.appendChild(favImgContainer)
            const img = document.createElement('img')
            favImgContainer.appendChild(img)
            const btn = document.createElement('button')
            catContainer.appendChild(btn) 
            img.src = michi.image.url
            const text = document.createTextNode('Sacar michi de favoritos')
            btn.appendChild(text)
            catContainer.className = 'cat-container';
            favImgContainer.className = 'fav-img-container';
            btn.className = 'button';
            btn.onclick = () => deleteFavouriteCat(michi.id);
        }) 
    }
}

async function saveFavouriteCat(id) {
    const result = await fetch(URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '6cd2e2ec-ea37-44bb-9f4a-5be4c8582143'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await result.json()
    if(result.status !== 200) {
        spanError.innerText = "Hubo un error: " + result.status + data.message
    } else {
        loadFavouriteCats()
    }
}

async function deleteFavouriteCat(id){
    const result = await fetch(URL_DELETE_FAVOURITES(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '6cd2e2ec-ea37-44bb-9f4a-5be4c8582143'
        }
    });
    const data = await result.json()
    if(result.status !== 200) {
        spanError.innerText = "Hubo un error: " + result.status + data.message
    } 
    console.log(`Gato con el id ${id} eliminado`)
    loadFavouriteCats();
}
const catButton = document.getElementById('catButton');
catButton.onclick = loadRandomCats;

async function uploadCatImg() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    const result = await fetch(URL_UPLOAD, {
        method: 'POST', 
        headers: {
            // Se quita el Content-Type en este caso debido a que la instancia
            // formData ya se encarga de ese paso
            // 'Content-Type': 'multipart/form-data', 
            'X-API-KEY': '6cd2e2ec-ea37-44bb-9f4a-5be4c8582143',
        },
        body: formData,
    })
    const data = await result.json()
    if (result.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${result.status} ${data.message}`

    } else {
        console.log("Foto de michi cargada :)");
        console.log(result)}
        console.log(data);
        console.log(data.url);
    saveFavouriteCat(data.id)
}
loadRandomCats()
loadFavouriteCats()

//id foto balam CsWFbQUXQ