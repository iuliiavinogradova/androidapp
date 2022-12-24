const form = document.getElementById('down-payment-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the form data
    const loanAmount = document.getElementById('loan-amount').value;
    const downPaymentPercentage = document.getElementById('down-payment-percentage').value;

    // Calculate the down payment amount
    const downPaymentAmount = loanAmount * (downPaymentPercentage / 100);

    // Display the down payment amount
    const downPaymentAmountDiv = document.getElementById('down-payment-amount');
    downPaymentAmountDiv.innerHTML = `Down Payment Amount: $${downPaymentAmount.toFixed(2)}`;
    // Get a reference to the canvas element
    const canvas = document.getElementById('apartment-container');
    // Create the PDF file
    window.html2canvas = html2canvas;
    window.jsPDF = window.jspdf.jsPDF;

    const doc = new jsPDF({
        orientation: "landscape"
        // unit: "in",
        // format: [10, 10]
    });
    doc.text(`Down Payment Plan`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Loan Amount: $${loanAmount}`, 14, 32);
    doc.text(`Down Payment Percentage: ${downPaymentPercentage}%`, 14, 37);
    doc.text(`Down Payment Amount: $${downPaymentAmount.toFixed(2)}`, 14, 42);
    // Use the autoTable function to add a table to the PDF
    doc.autoTable({
        head: [['Date', 'Amount Saved']],
        body: [],
        startY: 50
    });
    // doc.addImage("images/learning-platform-1.png", "PNG", 15, 40, 180, 180);

    // Source HTMLElement or a string containing HTML.
    var elementHTML = document.querySelector("#apartment-container");

    doc.html(elementHTML, {
        callback: function (doc) {
            // Save the PDF
            doc.save('sample-document.pdf');
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
    // Add the image to the PDF

    // doc.HTML(canvas, 15, 15, {
    //     width: 170
    // });

    // doc.addHtml(canvas, {
    //     x: 20, y: 75, maxWidth: 270
    // });

    // Add an event listener to the download button to generate the PDF file when clicked
    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', () => {
        doc.save('down-payment-plan.pdf');
    });

    function downloadPDF() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        var source = document.getElementById('apartment-container').innerHTML;

        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#apartment-container': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        var margins = {
            top: 50,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.HTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },



            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins
        );

        // doc.html(document.body, {
        //     callback: function (doc) {
        //         doc.save();
        //     },
        //     x: 10,
        //     y: 10
        // });
    }

    const download = document.getElementById('download-button');
    download.addEventListener('click', () => {
        downloadPDF();
    });

});