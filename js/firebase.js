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

var data = []
firebase.database().ref('users').orderByChild("lastName").on('child_added', function(snapshot) {
	data.push(snapshot.val());
});
console.log(data);

var vm = new Vue({
    el: "#people",
    
//    firebase: {
//        // can bind to either a direct Firebase reference or a query
//        items: db.ref("users")
//    },
    
    data: {
        items: data
    },
    
});


setTimeout(function () {
    $('.swiper-container').css('opacity', '1')
    
    var firstSlide = Math.floor(Math.random() * 17)
    var mainSlider = new Swiper('.main-slider', {
        // Optional parameters
        loop: true,
        loopedSlides: 18,
        initialSlide: firstSlide,
        direction: 'horizontal',
        keyboardControl: false,
        shortSwipes: false,
        noSwipingClass: 'thumbnails',
        speed: 600,
    })

    var thumbnailSlider = new Swiper('.thumbnails', {
        slideActiveClass: 'thumb-active',
        initialSlide: firstSlide,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: 18,
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    
    mainSlider.params.control = thumbnailSlider;
    thumbnailSlider.params.control = mainSlider;
    
}, 1000);

$('section').horizon({
    swipe: false
});

var aChildren = $("nav li").children().not('.eventbrite-link'); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollLeft(); // get the offset of the window from the left of page
        var windowWidth = $(window).width(); // get the width of the window
        var docWidth = $(document).width();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().left; // get the offset of the div from the left of page
            var divWidth = $(theID).width(); // get the width of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divWidth)) {
                $("a[href='" + theID + "']").parent().addClass("selected");
                console.log(theID);
            } else {
                $("a[href='" + theID + "']").parent().removeClass("selected");
            }
        }

        if(windowPos + windowWidth == docWidth) {
            if (!$("nav li:last-child a").hasClass("selected")) {
                var navActiveCurrent = $(".selected").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("selected");
                $("nav li:last-child a").addClass("selected");
            }
        }
    });

