let themeBtn = document.querySelector('.themeChange')
themeBtn.addEventListener('click', changeTheme)

function changeTheme() {
    let body = document.querySelector('body')
    let currentTheme = localStorage.getItem('theme')
    if(currentTheme == "dark") {
        body.setAttribute('data-theme', 'white')
        localStorage.setItem('theme', 'white');
    } else {
        body.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark');
    }
}

function startTheme() {
    let theme = localStorage.getItem('theme')
    let body = document.querySelector('body')
    if(theme == "dark") {
        body.setAttribute('data-theme', 'dark')
    } else {
        body.setAttribute('data-theme', 'white')
    }
}

startTheme()

async function sendRequest(url, method, data) {
 
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
        })
        response = await response.json()
        return response
    }
}

let searchBtn = document.querySelector('.searchLine button')
searchBtn.addEventListener('click', search)

async function search() {
    let searchQuesry = document.getElementsByName("search")[0].value
    
    let response = await sendRequest('https://www.omdbapi.com/', "GET", {"apikey":"39072588", "t": searchQuesry})
    if(response.Response == "False") {
        alert("Фильм не найден")
    } else {
        alert(response.Title)
    }

    console.log(response)
}