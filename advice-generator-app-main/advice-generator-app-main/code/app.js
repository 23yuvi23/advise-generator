


fetch('https://api.adviceslip.com/advice/1')
    .then(response => response.json())
    .then(data => console.log(data))
