
function createBlock(img, name, lan, population, money) {
    let col = document.querySelector('.col');
    col.style.margin = '30px';
    
    let imge = document.querySelector('img');
    imge.src = img;
    document.querySelector('h5').innerHTML = name;
    document.getElementById('popul').innerHTML = population;
    document.getElementById('lan').innerHTML = lan;
    document.getElementById('mon').innerHTML = money;
    let newCol = col.cloneNode(true);
    col.remove();
    return newCol;
}

function createLitBlock(img, name, lan, population, money) {

     
    let col = document.querySelector('.col');
    let newCol = col.cloneNode(true);
    newCol.style.width = '250px';
    newCol.style.display = "inline-block"
    let newImg = newCol.children[0].children[0];
    newImg.src = img;
    let neig = document.createElement('p');
    neig.innerHTML = 'neighboring element';   
    console.log(neig);
    newCol.prepend(neig);
    newCol.querySelector('.card-title').innerHTML = name;
    let cardText = document.querySelectorAll('.card-text');
    cardText[0].innerHTML = population;
    cardText[1].innerHTML = lan;
    cardText[2].innerHTML = money;

    return newCol;
    }


function newNeig(code) {
    fetch('https://restcountries.com/v3.1/name/' + code)
    .then ((Response) => Response.json()) 
    .then((data) => {
        document.body.append(createLitBlock(data[0].flags.png, data[0].name.official, Object.values(data[0].languages)[0], data[0].population, Object.values(data[0].currencies)[0].name));
    })
}

let content = document.getElementById('content');

fetch('https://restcountries.com/v3.1/all')
    .then((Response) => Response.json())
    .then((data) => {
        let lan = Object.values(data[5].languages)[0];
        let population = data[5].population;
        let cur = Object.values(data[5].currencies)[0].name;
        content.append(createBlock(data[5].flags.png, data[5].name.official, lan, population, cur));

        let border = data[5].borders;
        console.log(border);
        console.log(data[5].name.official);
        for (let i = 0; i < border.length; i++) { 
            let code =  border[i];
            newNeig(code);
        }

    })

// ошибки выдает потому что не для всех стран есть отдельная такая ссылка