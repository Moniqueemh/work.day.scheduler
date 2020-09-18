// possible variables
let hourlyArray = 0;
let currentTime = moment();
let currentHour = 0;
let textBlock = $(".col-8");
let plannerTask = $("textarea");


// store and retrieve local storage
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