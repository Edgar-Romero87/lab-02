'use strict';

let allHorns = [];

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

  const $newSection = $(`<section>${myTemplate}</section>`);

  $newSection.find('img').attr('src', this.image_url);

  $newSection.find('h2').text(this.title);

  $newSection.find('p').text(this.description);

  $newSection.find('p').text(this.keyword);

  $newSection.find('p').text(this.horns);

  //append to the DOM
  $('main').append($newSection);

}

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(creatures => {

    creatures.forEach(value =>{
      new Animals(value).render();
    })
  })
