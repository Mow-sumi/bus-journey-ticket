
 
function handleTicketChange(ticketType, isIncremented) {
    let ticketCount = Number(document.querySelector('.' + ticketType + 'ItemCount').value);

    (isIncremented == true) ? ticketCount++ : ticketCount--;

    calculateTicketPrice(ticketType, ticketCount);
}


function getValidatedInputValue(inputTicketCount) {
    let ticketCount = Number(inputTicketCount);
    if (ticketCount < 0) {
        ticketCount = 0;
    }
    return ticketCount;
}

function calculateTicketPrice(ticketType, inputTicketCount) {

    let ticketCount = getValidatedInputValue(inputTicketCount);
    // UPDATE UI 
    document.querySelector('.' + ticketType + 'ItemCount').value = ticketCount;
    let ticketPricePerSeat = ticketType == 'firstClassTicket' ? 150 : 100;
    document.querySelector('.' + ticketType + '-price').textContent = ticketCount * ticketPricePerSeat;

    calculateTotal();
}

//Total Price Count
function calculateTotal() {

    let firstClassTicketPrice = parseFloat(firstClassTicketPriceElement.textContent);
    let economyTicketPrice = parseFloat(economyTicketPriceElement.textContent);
    let subtotal = (subTotalElement.textContent = firstClassTicketPrice + economyTicketPrice);

    let vat = Math.round(subtotal * 0.1);
    vatElement.textContent = vat
    let total = (grandTotalElement.textContent = subtotal + vat);
    
    document.getElementById('bookNowBtn').disabled = (subtotal <= 0);
}

d
function viewInvoice() {
   
    document.getElementById('booking-confirmation').style.display = "none";
    document.getElementById('invoice').style.display = "block";
    document.getElementById('invoice').innerHTML = `
        <section id="invoice" class="container">
            <table class="table modal">
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td> ${flyFromElement.value} </td>
                    <td> ${flyToElement.value} </td>
                    <td> ${parseFloat(grandTotalElement.textContent)} </td>
                </tr>
            </table>
        </section>
        `
}

function finishBooking() {
    document.getElementById('booking-ticket-container').style.display = "none";
    document.getElementById('header').style.display = "none";
    document.getElementById('booking-confirmation').style.display = "block";
    document.getElementById('booking-confirmation').innerHTML = `
    <div class="modal">
        <img src="images/bus.png" alt="">
        <h1> Wish You safe journey from ${flyFromElement.value} to ${flyToElement.value}. </h1>
        <h3> Now you can write easy on exam "Travelling by Bus"'</h3>
        <button class="btn btn-success" id="get-invoice" onclick="viewInvoice()"> GET INVOICE </button>
    </div>    
    `
}