"use strict";
$(document).ready(function () {
  //////////////////////////////////////////validation form/////////////////////////////////////////

  $.validator.addMethod("nowhitespace", function (value, element) {
    return this.optional(element) || /^\S+$/i.test(value);
  }, "No white space please");
  $('#form').validate({
    rules:{
      name: {
        required: true,
        minlength: 2,
        lettersonly: true
      },
      email:{
        required: true,
        email: true
      }
    },
    highlight: function highlight(element) {
      $(element).addClass("attention");
    },
    unhighlight: function unhighlight(element) {
      $(element).removeClass("attention");
    },
    messages: {
      name: {
        minlength: "الاسم يجب ان يحتوى على اكثر من 2 حرف",
        required: "يجب ادخال الاسم"
      },
      email: {
        email: "الايميل غير صحيح" ,
        required: "يجب ادخال الايميل"
      }
    }
  });
});
//////////////////////////////////////////////////////////

let direction = document.body.getAttribute('dir');
if (direction == 'ltr'){
  rightToLeft=false;
}
else{
  rightToLeft=true;
}
$('.owl-slider').owlCarousel({
    loop:true,
    margin:0,
    items:1,
    autoplay:true,
    autoplayHoverPause: true,
    dots:false,
    nav: true,
    rtl:rightToLeft,
    navText:["<div class='nav-btn prev-slide'><i class='fas fa-angle-left'></i></div>","<div class='nav-btn next-slide'><i class='fas fa-angle-right'></i></div>"],
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        992:{
            items:1
        }
    }
});
///////////////////////////////////////////////////
let windowWidth = window.innerWidth;
console.log(windowWidth);
let itemLoop ;

window.addEventListener("resize", getWidth);
function getWidth() {
  let windowWidth = window.innerWidth;
  if(windowWidth >= 768){
    itemLoop= true;
  }
  else{
    itemLoop = false;
  }
  console.log(windowWidth);
}
//////////////////////////////////////change from right to left/////////////////////////////////
$( ".enbtn" ).click(function() {
  $( 'body' ).attr( "dir", "ltr" );
  $('#ink').attr('href' , "css/minifiedstyle/ltrstyle.min.css");
});

///////////////////////////////////////////////////
$('.owl-newproduct').owlCarousel({
  loop:itemLoop,
  margin:50,
  items:3,
  autoplay:false,
  autoplayHoverPause: true,
  dots:false,
  nav: false,
  rtl:rightToLeft,
  responsive:{
      0:{
          items:1
      },
      767:{
          items:2
      },
      992:{
          items:3
      }
  }
});
///////////////////////////////////////////////////////
function LoadDataalltypes(){
  var output = '';
  const xhr = new XMLHttpRequest();
  xhr.open('GET' , '../json/alltypes.json');
  xhr.onload = function(){
      if(xhr.status === 200){
          const photos = JSON.parse(this.responseText);
          for(var i =0 ; i < photos.length ; i++){
              output+=
              `<div class="item col-lg-3 col-md-6 col-12">            
                  <div class="card">
                    <div class="cars-img">
                      <img src="${photos[i].src}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${photos[i].title}</h5>
                    </div>
                  </div>
              </div>`
          }
          document.querySelector('.owl-alltypes .row').innerHTML=output;
      }
  }
  xhr.send();
}
///////////////////////////////////////////////////////////////////////
function LoadDataorder(){
  var output = '';
  const xhr = new XMLHttpRequest();
  xhr.open('GET' , '../json/order.json');
  xhr.onload = function(){
      if(xhr.status === 200){
          const order = JSON.parse(this.responseText);
          for(var i =0 ; i < order.length ; i++){
              output+=
              `<div class="item col-lg-3 col-md-6 col-12">            
                  <div class="card">
                    <div class="cars-img">
                      <img src="${order[i].src}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${order[i].title}</h5>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop-startorder">اطلب الأن</a>
                        <span>${order[i].price}</span>
                    </div>
                  </div>
              </div>`
          }
          document.querySelector('.orders .row').innerHTML=output;
      }
  }
  xhr.send();
}
///////////////////////////////////////////////////////////////////////
LoadDataorder()
LoadDataalltypes();
///////////////////////////////////////////////////////////

