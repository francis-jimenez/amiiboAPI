document.getElementById('random').addEventListener('click', randomAmiibo)
document.getElementById('search').addEventListener('click', fetchAmiibo)
const prev = document.getElementById('previous')
const next = document.getElementById('next')

let charArr

async function randomAmiibo () {
    const res = await fetch('https://www.amiiboapi.com//api/amiibo/')
    const data = await res.json()
    const random = Math.ceil(Math.random() * 837)
    document.getElementById('charName').innerText = data.amiibo[random].name
    document.getElementById('gameSeries').innerText = `Game Series: ${data.amiibo[random].gameSeries}`
    document.getElementById('amiiboSeries').innerText = `amiibo Series: ${data.amiibo[random].amiiboSeries}`
    document.getElementById('charImg').style.display = 'block';
    document.getElementById('charImg').src = data.amiibo[random].image
       
    console.log(data.amiibo[random])
}

async function fetchAmiibo () {
    const res = await fetch('https://www.amiiboapi.com//api/amiibo/')
    const data = await res.json()
    let index = 0;
    let userText = document.querySelector('input').value.toLowerCase()
    if (userText.length == 0) {
        alert("Enter a character's name")
    } else {
        charArr = data.amiibo.filter((x, i, a) => a[i].character.toLowerCase().includes(userText))
        console.log(index)
        displayAmiibo(index)
    }

function displayAmiibo(index) {
    document.getElementById('charName').innerText = `${charArr[index].name}- ${index + 1} of ${charArr.length}`
    document.getElementById('gameSeries').innerText = `Game Series: ${charArr[index].gameSeries}`
    document.getElementById('amiiboSeries').innerText = `amiibo Series: ${charArr[index].amiiboSeries}`
    document.getElementById('previous').style.display = 'inline-block'
    document.getElementById('next').style.display = 'inline-block'
    document.getElementById('charImg').style.display = 'block';
    document.getElementById('charImg').src = charArr[index].image
    console.log(data.amiibo)
    console.log(charArr)
}    
next.addEventListener('click', () => {
    console.log(data)
    index = (index + 1) % charArr.length
    if (index >= charArr.length) index = 0
    console.log(index)
    displayAmiibo(index)
})

prev.addEventListener('click', () => {
    if (index == 0) index = charArr.length
    index--
    console.log(index)
    displayAmiibo(index)
})
}