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



// function AnimalTwo(obj){
//   this.image_url = obj.image_url;
//   this.title = obj.title;
//   this.description = obj.description;
//   this.keyword = obj.keyword;
//   this.horns = obj.horns;
//   allHorns2.push(this);
// }
// pageTwoDataSet.forEach( pageTwo=>  {
//   new AnimalTwo(pageTwo);
// })

// // render prototype to render each object instance to the page using mustache

// AnimalTwo.prototype.toHtml = function(){
//   // 1. Get the template from the html
//   let template = $('#gallery-template').html();

//   // 2. Use Mustache to "render" new html by merging the template with the data
//   let html = Mustache.render(template, this);

//   // 3. Return the "html"  from this method
//   return html;
// }
// allHorns2.forEach(AnimalTwo => {
//   // this will create the html
//   let AnimalTwoHtml = AnimalTwo.toHtml();

//   // append to page
//   $('#gallery2').append(AnimalTwoHtml);
// })
