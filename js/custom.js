(function () {

  function isStrictMode() {

    return !this;

  }


  function isStrictMode() {

    "use strict";

    return !this;

  }


  $(document).ready(function () {


    var s = 1;


    $('form fieldset').each(function () {

      $(this).attr('data-q', s++);

    });


    function goNext(el) {

      var step = el.parents('fieldset').last();


      // Check if the current 'fieldset' is the last one

      if (step.next().length === 0) {

        return; // Do nothing if it's the last 'fieldset'

      }


      step.fadeOut(function () {

        step.next().fadeIn(function () {

          $.stepanimate();

        });

      });

    }

    $(document).on('click', "button", function () {

      $("html, body").animate({
        scrollTop: 0
      }, "fast");

      goNext($(this));

    });


    $(".btn-q").click(function () {


      $("article").fadeOut(function () {

        $("form").fadeIn();

      });


      $(document).ready(function () {

        // Add a click event handler to all buttons with class "btn-q"

        $(".btn-q").click(function () {

          // Get the data-q attribute and button value of the clicked button

          var dataQValue = $(this).closest('fieldset').attr('data-q');

          var buttonValue = $(this).val();


          // Find the value of the other fieldset's button in the same data-q group

          var otherButtonValue = $("[data-q='" + dataQValue + "']").not(this).find(".btn-q").val();


          if ((dataQValue === "2" && buttonValue === "Yes")) {

            $("#continue-cta-call").show();

          } else if ((dataQValue === "2" && buttonValue === "No")) {

            $("#continue-cta-medicare").show();

            $("#continue-cta-call").hide();

          }


        });


      });


    });


  });


  $.stepanimate = function () {

    $(".progress_box").slideDown();


    var cV = $('.progress-val span');

    var tS = $("fieldset").length;

    var q = $('form fieldset:visible').data('q');

    var p = parseInt((q / tS) * 100);

    $('.progress-bar').css({
      width: p + '%'
    });


    $({
      Counter: cV.text()
    }).animate({
        Counter: p
      },

      {

        duration: 1000,

        step: function () {
          cV.text(Math.ceil(this.Counter));
        }

      });


    if (q == tS) {

      $.steps();


    }


  }


  $.steps = function () {

    var timeVar = null,

      count = 1;


    showProgress(count++);

    timeVar = setInterval(function () {

      showProgress(count++);

    }, 100);


    function showProgress(count) {

      switch (count) {

        case 1:

          $('.step' + count).show();

          break;

        case 2:

        case 3:

          $('.step' + (count - 1)).hide();

          $('.step' + count).show();

          break;

        default:

          if (timeVar) {

            $('.steps').hide();

            $('.result').slideDown(function () {

              interval = setInterval(startTimer, 1000);

              $('.cta-btn svg').css('display', 'inherit');

              $('.round-bg-icon').css('display', 'inherit');

            });

            clearInterval(timeVar);

          }

      }

    }


  }


  var interval = 0;

  var $timer = $('.time span');

  var $timermain = $('.time');


  var timer = 120;


  function startTimer() {

    if (timer < 2) {

      clearInterval(interval);

      $timermain.text("Last chance to get your spot, Call Now!");

    } else {

      var seconds = timer % 60;

      if (seconds < 10) seconds = '0' + seconds;

      $timer.text(Math.floor(timer / 60) + ':' + seconds);

      timer--;

    }

  }


})();


//Date


// Define an array of weekday names

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// Get the current date

var currentDate = new Date();


// Extract the day, month, and year

var day = currentDate.getDate();

var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

var year = currentDate.getFullYear();


// Get the day of the week

var dayOfWeek = weekdays[currentDate.getDay()];


// Format the date as "Day, MM/DD/YYYY"

var formattedDate = dayOfWeek + ', ' + month + '/' + day + '/' + year;


// Display the formatted date in the "dateDisplay" element

document.getElementById("dateDisplay").textContent = formattedDate;
