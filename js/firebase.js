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
    },
});


setTimeout(function () {
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className) {
            return '<span class="custom-bullet ' + className + '"></span>';
        }
    })
}, 500);
