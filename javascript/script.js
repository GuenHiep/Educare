const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let signIn = $("#sign-in");
let signUp = $("#sign-up");
let btn_right = $("#btn-right");
let btn_left = $("#btn-left");
let start = $("#start");
let feature = $(".feature-dec");
let btn_feature = $("#btn-feature");
let btn_meet = $("#btn-meet");

let i = 1;
let urlSector = "http://localhost:3000/courses?page=";
let urlFeature = "http://localhost:3000/feature?page=";
function call(urlSector, i) {
  return fetch(`${urlSector}${i}`, {})
    .then((Response) => Response.json())
    .then((data) => {
      data[0].data.forEach((element) => {
        start.innerHTML += `<div class="flex-column flex-item px-5 py-3">
        <p class="fs-2 fw-bolder sec-p55">${element.title}</p>
        <p class="pb-4  sec-p35">${element.description}</p>
        <img src="${element.image}" alt="img about Design Sector" class="mb-2">
      </div>`;
      });
    });
}

// API feature
function callFeature(urlFeature, i) {
  return fetch(`${urlFeature}${i}`, {})
    .then((Response) => Response.json())
    .then((data) => {
      data[0].data.forEach((element) => {
        feature.innerHTML += `<div class="d-flex flex-row  bg-light mb-4 feature-item">
         <div class="d-flex">
           <img src="${element.image}" alt="feature picture" class="featured-img" />
         </div>
         <div class="flex-nowrap">
           <p class="fs-2 icon-rating">
             <input type="checkbox" id="st1" value="1" />
             <label for="st1"></label>
             <input type="checkbox" id="st2" value="2" />
             <label for="st2"></label>
             <input type="checkbox" id="st3" value="3" />
             <label for="st3"></label>
             <input type="checkbox" id="st4" value="4" />
             <label for="st4"></label>
             <input type="checkbox" id="st5" value="5" />
             <label for="st5"></label>
           </p>
           <p class="fw-bolder fs-4">
             ${element.title}
           </p>
           <p class="flex-grow-1 sec-p25">
             ${element.numberClass} Class &emsp;<i class="fas fa-circle fa-ring" style="color: teal"></i>&emsp;3 Month
           </p>
           <div class="d-flex align-items-center">
             <img src="${element.avatar}" alt="avatar" class="featured-person flex-shrink-0"/>
             <p class="flex-grow-1 ms-3 sec-p25">by ${element.nameBuy}</p>
           </div>
           <hr />
           <p class="fs-5"><span class="fw-bolder">$${element.prices}</span> <span class="float-end pe-4 feature-buy"><a href="https://www.spinxdigital.com/blog/12-web-design-tutorials-in-2020/" target="_blank"><i class='fa fa-shopping-cart'></i> ${element.typeBuy}</a></span></p>
         </div>
       </div>`;
      });
    });
}
call(urlSector, i);
callFeature(urlFeature,i);
// removeChild
let removeAll = () => {
  let getChild = start;
  while (getChild.firstChild) {
    getChild.removeChild(getChild.firstChild);
  }
};
if ((i = 1)) btn_left.classList.remove("btn-hover");

// Event Listeners
btn_left.onclick = () => {
  if (i > 1) {
    btn_right.classList.add("btn-hover");
    i--;
    removeAll();
    call(urlSector, i);
  }
  if ((i = 1)) btn_left.classList.remove("btn-hover");
};
btn_right.onclick = () => {
  if (i < 2) {
    btn_left.classList.add("btn-hover");
    i++;
    removeAll();
    call(urlSector, i);
  }
  if ((i = 2)) {
    btn_right.classList.remove("btn-hover");
  }
};
btn_feature.onclick = () => {
  if (i < 2) {
    i++;
    callFeature(urlFeature, i);
  }
  if ((i = 2)) {
    setTimeout(btn_feature.classList.add("btn-del"),3000)
    btn_feature.innerText = "It's OVER";
    
  }



}
btn_meet.onclick = () => {
  alert("Out of data...😭😭😭😭");
};