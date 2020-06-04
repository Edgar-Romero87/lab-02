'use strict';

let allHorns = [];
let keyword = [];

function Animals(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHorns.push(this);
}

Animals.prototype.render = function (){

  const myTemplate = $('#horns-template').html();

  const $newSection = $(`<section class=${this.keyword}>${myTemplate}</section>`);

  $newSection.find('img').attr('src', this.image_url);

  $newSection.find('h2').text(this.title);

  $newSection.find('p').text(this.description);

  $newSection.find('p').text(this.keyword);

  $newSection.find('p').text(this.horns);

  //append to the DOM
  $('main').append($newSection);

}

//fill the keyword array
const getKeywords = () =>{
  allHorns.forEach(beast => {
    keyword.push(beast.keyword);
  })
}

//fill the dropdown menu with the keywords of each image
const dropDown = () => {
  let unique = [];
  keyword.forEach(beast => {
    if (!unique.includes(beast)){
      unique.push(beast)
    }
  })
  unique.forEach(keyword =>{
    $('#dropdown-template').append(`<option>${keyword}</option>`)
    
  })
}

//the ajax to pull the JSON 
$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(creatures => {

    creatures.forEach(value =>{
      new Animals(value).render();
    })
    getKeywords();
    dropDown();
    
})
//we need a filter function 
//identify what was clicked on
//remove everything 
//show only what was clicked on

function filter(event){
  let thingIClick = $(this).val();
  $('section').hide();
  $(`.${thingIClick}`).show();
  
}
$('#dropdown-template').on('change', filter);


// const imageSorter = (how) => {
//   if(how === 'title'){
//     allHorns.sort((a,b) => {
//       return a.title > b.title ? 1: -1;
//     });
//   } else {
//     allHorns.sort((a,b) => {
//       return a.horns - b.horns;
//     });
//   }
// }

// imageSorter();
// function sortByTitle (arr){
//   arr.sort( (a,b) => a.title > b.title ? 1 : a.title < b.title ? -1: 0);
//   return arr;
// }
// function sortByHorns (arr){
//   arr.sort( (a,b) => b.horns - a.horns);
//   return arr;
// }

// function titleSortListener() { 
//   $('#title').click( () => { 

//     Images.list.sort( (a,b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
//     console.log(Images.list);
//     clearAllImages();
//     displayAllImages();
//   })
// }

// function hornSortListener() { 
//   $('#horn').click( () => { 
//     Images.list.sort( (a,b) => a.horns > b.horns ? 1 : a.horns < b.horns ? -1 : 0);
//     console.log(Images.list);
//     clearAllImages();
//     displayAllImages();
//   })
// }

// function displayAllImages() { 
//   const photoTemplate = $('#photo-template').html();
//   const photoTemplateScript = Handlebars.compile(photoTemplate);
//   Images.list.forEach(object => {
//     const image = {'title': object.title, 'image_url': object.image_url, 'description': object.description, 'keyword': object.keyword};
//     const html = photoTemplateScript(image);
//     $('main').append(html);
//   })
// }

// function clearAllImages() { 
//   $('section').remove();