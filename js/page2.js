'use strict';

let allHornsTwo = [];
let keyword = [];

function AnimalTwo(obj){
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHornsTwo.push(this);
}
AnimalTwo.prototype.toHtml = function(){
  // 1. Get the template from the html
  let template = $('#gallery-template').html();

  // 2. Use Mustache to "render" new html by merging the template with the data
  let html = Mustache.render(template, this);

  // 3. Return the "html"  from this method
  return html;
}

$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
.then(creatures => {

  creatures.forEach(value =>{
    new AnimalTwo(value)
  })
  console.log(allHornsTwo);
  // getKeywords();
  allHornsTwo.forEach(AnimalTwo => {
    // this will create the html
    console.log(AnimalTwo);
    let AnimalTwoHtml = AnimalTwo.toHtml();
  
    // append to page
    $('#gallery2').append(AnimalTwoHtml);
  })

  // creatures.forEach(value =>{
  //   new AnimalTwo(value).render();
  // })
  getKeywords();
  dropDown();
  
})

//fill the keyword array
const getKeywords = () =>{
  allHornsTwo.forEach(beast => {
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
function filter(event){
  let thingIClick = $(this).val();
  $('main').hide();
  $(`.${thingIClick}`).show();
}
$('#dropdown-template').on('change', filter);

// $.get('./data/page-2.json', (data) => {
//   data.forEach(element => {
//     new Images(element.image_url, element.title, element. description, element.keyword, element.horns);
//   })
//   optionListener();
//   titleSortListener();
//   hornSortListener();
// });
