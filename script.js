const form = document.getElementById('down-payment-form');
var deposit = 0;
var loanAmount = 0;
var downPaymentPercentage = 0;
var downPaymentAmount = 0;
form.addEventListener('submit', (event) => {
    event.preventDefault();

    loanAmount = document.getElementById('loan-amount').value;
    downPaymentPercentage = document.getElementById('down-payment-percentage').value;

    // Get the form data
    const savings = document.getElementById('savings').value;
    const years = document.getElementById('years').value;

    // Calculate the down payment amount
    var downPaymentAmount = (loanAmount * (downPaymentPercentage / 100));

    var downPaymentAmountDiv = document.getElementById('down-payment-amount');

    //Show how much already saved
    if (savings > downPaymentAmount) {

        downPaymentAmountDiv.innerHTML = 'Congratulations! You have already saved enough!'

    } else {
        downPaymentAmount = (loanAmount * (downPaymentPercentage / 100) - savings) / (years * 12);

        deposit = Math.floor(savings / downPaymentAmount);
        console.log("You have already saved $", savings, deposit);

        // Display the down payment amount
        downPaymentAmountDiv.innerHTML = `Down Payment Amount: $${downPaymentAmount.toFixed(2)}`;
    }
});

// Add an event listener to the download button to generate the PDF file when clicked
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', () => {
    downloadPDF();
});

function downloadPDF() {
    // Get a reference to the canvas element
    const canvas = document.getElementById('image-container');
    // Create the PDF file
    window.html2canvas = html2canvas;
    window.jsPDF = window.jspdf.jsPDF;

    const doc = new jsPDF({
        orientation: "landscape"
    });
    doc.text(`Down Payment Plan`, 14, 10);
    doc.setFontSize(11);
    doc.text(`Loan Amount: $${loanAmount}`, 14, 20);
    doc.text(`Down Payment Percentage: ${downPaymentPercentage}%`, 14, 25);
    doc.text(`Down Payment Amount: $${downPaymentAmount.toFixed(2)}`, 14, 30);

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector("#image-container");

    // Add the image to the PDF
    doc.html(elementHTML, {
        callback: function (doc) {
            // Save the PDF
            doc.save('down-payment-plan.pdf');
        },
        x: 15,
        y: 35,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
}

function showImage() {
    // Get the selected option value from the dropdown menu

    var housingOption = document.querySelector('input[name="housing-options"]:checked').value;

    // Get the selected value from the slider
    var numYears = document.getElementById("years").value;


    // Set the source of the image based on the selected option
    var imageSource = "";
    if (housingOption == "studio") {
        imageSource = "images/studio.jpg";
    } else if (housingOption == "1bedroom") {
        imageSource = "images/1bedroom.jpg";
    } else if (housingOption == "2bedrooms") {
        imageSource = "images/2bedroom.jpg";
    } else if (housingOption == "townhouse") {
        imageSource = "images/townhouse.jpg";
    }

    // Get the dimensions of the image
    var image = new Image();
    image.src = imageSource;
    var imageWidth = image.width;
    var imageHeight = image.height;

    // Calculate the number of rows and columns based on the image dimensions and the number of years selected
    var num = (numYears * 12);// 6 12 18 24 36 48 60
    if (num == 6) {
        var numRows = 2;
        var numColumns = 3;
    }
    else if (num == 12) {
        var numRows = 3;
        var numColumns = 4;
    }
    else if (num == 18) {
        var numRows = 3;
        var numColumns = 6;
    }
    else if (num == 24) {
        var numRows = 4;
        var numColumns = 6;
    }
    else if (num == 36) {
        var numRows = 6;
        var numColumns = 6;
    }
    else if (num == 48) {
        var numRows = 6;
        var numColumns = 8;
    }
    else if (num == 60) {
        var numRows = 6;
        var numColumns = 10;
    }
    // var numRows = 3;//2 3 3 4 6 6 6
    // var numColumns = 6;//3 4 6 6 6 8 10
    var boxWidth = imageWidth / numColumns;
    var boxHeight = imageHeight / numRows;

    // Generate the HTML for the boxes to be overlaid on the image
    var boxesHTML = "";
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
            var boxLeft = j * boxWidth;
            var boxTop = i * boxHeight;
            boxesHTML += '<div class="box" style="position: absolute; z-index: 2; left: ' + boxLeft + 'px; top: ' + boxTop + 'px; width: ' + boxWidth + 'px; height: ' + boxHeight + 'px";"></div>';
        }
    }

    var checkHTML = "";
    console.log(deposit);

    let q = 0;
    let w = 0;

    for (var l = 0; l < deposit; l++) {
        if (q >= numRows || w >= numColumns) {
            break;
        }

        var boxLeft = w * boxWidth;
        var boxTop = q * boxHeight;
        checkHTML += '<div id="image-container" style="position: absolute;"><img src="images/check-mark.png" class="img-responsive" style="position: absolute; z-index: 0;left: ' + boxLeft + 'px; top: ' + boxTop + 'px;  width: ' + boxWidth + 'px; height: ' + boxHeight + 'px">' + boxesHTML + '</div>'

        q++;
        if (q >= numRows) {
            q = 0;
            w++;
        }
    }

    if (deposit > 0) {
        // Update the image in the container with the selected image and boxes overlaid on top of it
        document.getElementById("image-container").innerHTML = `<div id="image-container" style="position: relative;"><img src="${imageSource}" class="img-responsive" style="position: absolute; z-index: 0">${checkHTML}</div>`;
    } else {
        // Update the image in the container with the selected image and boxes overlaid on top of it
        document.getElementById("image-container").innerHTML = `<div id="image-container" style="position: relative;"><img src="${imageSource}" class="img-responsive" style="position: absolute; z-index: 0">${boxesHTML}</div>`;
    }
}

// Call the showImage function to display the image and boxes when the page loads
window.onload = showImage;