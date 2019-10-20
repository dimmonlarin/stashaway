// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var chart;
var datasets = [];
window.onload = function () {
    var ctx = $("#chart");
    chart = new Chart(ctx,
        {
            type: 'line',
            data: [{
            }],
            options:
            {
                title:
                {
                    display: true,
                    text: "StashAway performance chart"
                },
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 1000
                        }
                    }]
                }
            }
        });
    redrawGraph();
}

function redrawGraph() {
    var type = ($("#type").val() != "none") ? $("#type").val() : null;
    var months = ($("#timePeriod").val() != "none") ? $("#timePeriod").val() : null;
    chart.data = {};
    chart.data.datasets = [];
    datasets = [];
    bindData(null, months)
    // if comparism selected - add second graph
    if (type != null)
        bindData(type, months)
}

// calling API and binds data
function bindData(type, months) {
    $.ajax({
        type: "GET",
        url: "/api/Data",
        data: {
            type: type,
            months: months
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);
            chart.data.labels = data.map(function (e) {
                return e.date;
            });
            addChart(type, data);
            chart.update();
            datasets.push({ type: type, data: data });
        }, //End of AJAX Success function  

        failure: function (data) {
            alert(data.responseText);
        }, //End of AJAX failure function  
        error: function (data) {
            alert(data.responseText);
        } //End of AJAX error function  

    });
}

// updates datasets to display values in selected currency (no API calls)
function updateDataSets() {
    chart.data.datasets = [];
    datasets.forEach(function (value) {
        addChart(value.type, value.data);
    });
    chart.update();
}

function addChart(type, data) {
    chart.data.datasets.push({
        label: (type == null ? "StashAway" : type.replace("_", "/")) + " index",
        data: data.map(function (e) { return $("#currency").val() == "rm" ? e.value.rm : e.value.sgd; })
    });
}