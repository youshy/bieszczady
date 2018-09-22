const should = {}

document.getElementById('answer').innerHTML = "TAK";

const outputArray = [];

const apiAddress = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCykoFJLhcxGyaZ3oZb3YfMEPo_bWl63tU &callback=initMap'

const getAPI = async(api, array) => {
    // if fetched right
    try {
        const resp = await fetch(api)
        const data = await resp.json()
        array.push(data)
        return data
    
    // if error occurs
    } catch(err) {
        console.log(err)
        console.log("Whoops, something went wrong!")
    }
}

getAPI(apiAddress, outputArray)

// const map;

// should.initMap = () => {
//     map = new google.maps.Map()
// }

// Google api key
AIzaSyCykoFJLhcxGyaZ3oZb3YfMEPo_bWl63tU 