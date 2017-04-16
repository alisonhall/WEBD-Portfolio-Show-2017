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
firebase.database().ref('users').orderByChild("lastName").on('child_added', function (snapshot) {
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
    methods: {
        intiSlider: initSlider
    },
    updated() {
        initSlider()
    }

});


function initSlider() {
    console.log("Test")
    $('.swiper-container').css('opacity', '1')
    var firstSlide = Math.floor(Math.random() * 17)
    var mq = window.matchMedia("(min-width: 900px)");

    if (mq.matches) {
        // window width is at least 500px
        var thumbnailSlider = new Swiper('.thumbnails', {
            loop: true,
            loopedSlides: 18,
            initialSlide: firstSlide,
            slidesOffsetBefore: 200,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            speed: 1200,
            freeMode: true,
            freeModeSticky: true,
            slideActiveClass: 'thumb-active',

        });
        var mainSlider = new Swiper('.main-slider', {
            // Optional parameters
            loop: true,
            loopedSlides: 18,
            initialSlide: firstSlide,
            keyboardControl: false,
            speed: 1200,
        })
    } else {
        // window width is less than 500px
        var thumbnailSlider = new Swiper('.thumbnails', {
            loop: true,
            loopedSlides: 18,
            initialSlide: firstSlide,
            centeredSlides: true,
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            speed: 1200,
            freeMode: true,
            freeModeSticky: true,
            slideActiveClass: 'thumb-active',

        });
        var mainSlider = new Swiper('.main-slider', {
            // Optional parameters
            loop: true,
            loopedSlides: 18,
            initialSlide: firstSlide,
            keyboardControl: false,
            speed: 1200,
        })
    }




    thumbnailSlider.params.control = mainSlider;
    mainSlider.params.control = thumbnailSlider;

}

$('section').horizon({
    swipe: false
});

var aChildren = $("nav li").children().not('.eventbrite-link'); // find the a children of the list items
var aArray = []; // create the empty aArray
for (var i = 0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
} // this for loop fills the aArray with attribute href values

$(window).scroll(function () {
    var windowPos = $(window).scrollLeft(); // get the offset of the window from the left of page
    var windowWidth = $(window).width(); // get the width of the window
    var docWidth = $(document).width();

    for (var i = 0; i < aArray.length; i++) {
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

    if (window.location.href.indexOf("#home") != -1) {
        $("header > a").fadeTo('fast', 0);
    } else {
        $("header > a").fadeTo('fast', 1);
    }

    if (windowPos + windowWidth == docWidth) {

        if (!$("nav li:last-child a").hasClass("selected")) {
            var navActiveCurrent = $(".selected").attr("href");
            $("a[href='" + navActiveCurrent + "']").removeClass("selected");
            $("nav li:last-child a").addClass("selected");
        }
    }
});



//KONAMI CODE -UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A-

neededkeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], started = false, count = 0;
$(document).keydown(function (e) {
    key = e.keyCode;
    if (!started) {
        if (key == 38) {
            started = true;
        }
    }
    if (started) {
        if (neededkeys[count] == key) {
            count++;
        } else {
            reset();
        }
        if (count == 10) {
            var audio = new Audio('SnapSnapClap.mp3');
            audio.play();
            //ADD OTHER FUN STUFF HERE
            reset();
        }
    } else {
        reset();
    }
});

function reset() {
    started = false;
    count = 0;
    return;
}
