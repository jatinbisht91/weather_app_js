// import bgImage from "./data.js";

const bgImage = [{
    name: "mist",
    src: "https://media.istockphoto.com/photos/buildings-in-central-district-and-west-kowloon-in-hong-kong-picture-id1214863261?k=20&m=1214863261&s=612x612&w=0&h=LRi9lz2YSvEpEVCB0IUc2tBEWitUb91TChTokLmDCs4="
}, {
    name: "clouds",
    src: "https://images.unsplash.com/photo-1560837616-fee1f3d8753a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2xvdWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
}, {

    name: "clear",
    src: "https://images.unsplash.com/photo-1532300821639-af8f986b9d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80"

}]
let bg = document.querySelector(".bgImage-Container")
const cityName = document.querySelector("form");
const time = document.querySelector(".time");
const temprature = document.querySelector(".temp");
const range = document.querySelector(".min-max");
const wind = document.querySelector(".wind");
const description = document.querySelector(".description")
const name = document.querySelector(".name")
const fetchWeather = async (e) => {
    e.preventDefault();
    try {
        let city = cityName.elements[0].value
        const URL = "https://api.openweathermap.org/data/2.5/weather?"
        if (e.target.nodeName === "BUTTON") {
            const response = await fetch(`${URL}q=${city}&appid=7d3ffc25a7511b0ecd5b6694dce181ea&units=metric`)
            const data = await response.json();

            if (data.cod !== 200) {
                alert(`${data.message}`)
            }
            else {
                document.querySelector("input").value = "";
                showData(data)

            }

        }
    } catch (e) {
        alert(e.message)
    }



}

const setBgImage = (Image) => {
 const foundImage=bgImage.find((image)=>{
    if(image.name.toLowerCase()===Image.toLowerCase()){
        return image;
    }
 })
 if(foundImage){
  const{src}=foundImage;
  bg.style.background = `url(${src}) no-repeat fixed center/cover `
 }
 else{
    bg.style.background = `url("https://images.unsplash.com/photo-1614480633894-f3b7f4bb0e76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2VhdGhlciUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60") no-repeat fixed center/cover `
 }

   
 
}


const showData = (data) => {
 setBgImage(data.weather[0].main);
   
    console.log(data)
    const { main: { temp, temp_min, temp_max } } = data
    name.innerText = data.name;
    time.innerText = new Date().toLocaleString();
    temprature.innerText = `${temp} C`;
    range.innerText = `${temp_min}C(min)/ ${temp_max} C(max)`;
    wind.innerText = data.wind.speed;
    description.innerText = data.weather[0].main;
}


cityName.addEventListener("click", fetchWeather)