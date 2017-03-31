// Initialize Firebase
var config = {
    apiKey: "AIzaSyANKO5LqddgASdkSG2WzcPXLPQ41AkewPo",
    authDomain: "webd-portfolio-show-2017.firebaseapp.com",
    databaseURL: "https://webd-portfolio-show-2017.firebaseio.com",
    storageBucket: "webd-portfolio-show-2017.appspot.com",
    messagingSenderId: "888183054325"
};

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()

var vm = new Vue({
    el: "#people",
    firebase: {
        // can bind to either a direct Firebase reference or a query
        items: db.ref("users")
    }
});


setTimeout(function () {
    console.log('slider initialized');
    $('.swiper-container').css('opacity', '1')
    
    var firstSlide = Math.floor(Math.random() * 17)
    var mainSlider = new Swiper('.main-slider', {
        // Optional parameters
        initialSlide: firstSlide,
        direction: 'horizontal',
        keyboardControl: false,
        shortSwipes: false,
        noSwipingClass: 'thumbnails',
        speed: 600,
    })

    $('.thumbnail').click(function () {
        console.log('clicked')
        $('.thumbnail').removeClass('thumb-active')
        mainSlider.slideTo($(this).index());
        $(this).addClass('thumb-active')
    });
    
}, 1000);



$('section').horizon({
    swipe: false
});
