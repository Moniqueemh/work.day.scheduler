// possible variables
let hourlyArray;
let currentTime = moment();
let currentHour;
let textBlock = $(".col-8");
let plannerTask = $("textarea");


// getting texts and turning into objects
if (localStorage.getItem("localHourlyTasks")) {
    hourlyArray = JSON.parse(localStorage.getItem("localHourlyTasks"));
} else {
    hourlyArray = [];
};
// current date 
$("#currentDay").text(`${currentTime.format('dddd, MMMM Do')}`);

// update text block
function updateCurrentScheduleTime() {
    textBlock.removeClass('past present future');
    $.each(textBlock, function (scheduleBlockHour) {
        if (scheduleBlockHour < (currentTime.hour() - 9)) {
            $(this).addClass('past');
        } else if (scheduleBlockHour == (currentTime.hour() - 9)) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });
    currentHour = currentTime.hour();
};
// updating local storage evertime you hit save
function updateLocalStorage() {
    event.preventDefault();
    let btnIndex = Number($(this).attr('id'));
    $('.alert-success').removeClass('alert-animation');
    if (plannerTask[btnIndex].value.trim() != "") {
        hourlyArray[btnIndex] = {
            time: $(".hour")[btnIndex].textContent.trim(),
            task: plannerTask[btnIndex].value
        };
        localStorage.setItem("localHourlyTasks", JSON.stringify(hourlyArray));
        setTimeout(function () {
            $('.alert-success').addClass('alert-animation');
            $('.alert-success').text(`Successfully saved task at ${$(".hour")[btnIndex].textContent.trim()}!`);
        }, 100);
    };
};
// after refresh, tasks are saved
function writeCurrentTasks() {
    $.each(hourlyArray, function (i) {
        if (hourlyArray[i]) {
            plannerTask[i].value = hourlyArray[i].task;
        };
    });
};


// Callbacks and Click listener
updateCurrentScheduleTime();
writeCurrentTasks();
$("button").click(updateLocalStorage);