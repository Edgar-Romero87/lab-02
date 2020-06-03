'use strict';

let allHorns = [];
let keyword = [];
const myTemplate = $('#horns-template').html();

function Animals(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHorns.push(this);
}

Animals.prototype.render = function (){

  

  const $newSection = $(`<section>${myTemplate}</section>`);

  $newSection.find('img').attr('src', this.image_url);

  $newSection.find('h2').text(this.title);

  $newSection.find('p').text(this.description);

  $newSection.find('p').text(this.keyword);

  $newSection.find('p').text(this.horns);

  //append to the DOM
  $('main').append($newSection);

}
//the ajax to pull the JSON 
$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(creatures => {

    creatures.forEach(value =>{
      new Animals(value).render();
    })
    getKeywords();
    dropDown();
    // event();
  })

  //fill the keyword array
const getKeywords = () =>{
  allHorns.forEach(beast => {
    keyword.push(beast.keyword);
  })
}

//fill the
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
//Event listener
$('select').on('click', function(event){
  event.preventDefault();
  if (val !== 'default'){
    $('main').empty();

    allHorns.forEach(value => {
      if($(this).value() === value.keyword){
        value.render();
      }
    });

  } else {
    $('main').empty();
    allHorns.forEach(value => value.render());
  }
});

//Option view handler
// $('options').on('change', function(){
//     // console.log('inside option choice')  
//     if($(this).val()) {    
//       $('section').hide();    
//       $(`section[keyword="${$(this).val()}"]`).show();  
//   }
// });