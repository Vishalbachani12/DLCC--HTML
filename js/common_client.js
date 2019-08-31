$('#confirmreceipt').click(function (e) {
    e.preventDefault();
    $('#qty').val('100');
    $('#client').val('xyz');

    $('#home').trigger('click');
    $('#locate').addClass('highlightrow');

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#locate").offset().top
    }, 2000);

    setTimeout(function () {
        $('#locate').removeClass('highlightrow');
    }, 2000);
});


$('#alertDivBtn').click(function (e) {
    // $('#positionDiv').focus();
    e.preventDefault();
    $('#positions').trigger('click');
    $('#btcRow').addClass('highlightrow');

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#positionDiv").offset().top
    }, 2000);

    setTimeout(function () {
        $('#btcRow').removeClass('highlightrow');
    }, 5000);


});

$('#confirmreceipt').click(function () {
    $('#qty').val('100');
    $('#client').val('xyz');
});




function clickLocate() {
    var qty = $('#qty').val();
    var symbol = $('#symbol').val();
    var client = $('#client').val();
    var dt = new Date();
    var timestamp = "(" + dt.getHours() + "-" + dt.getMonth() + "-" + dt.getFullYear() + ") " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

    localStorage.setItem("qty", qty);
    localStorage.setItem("symbol", symbol);
    localStorage.setItem("client", client);

    $('#modalSymbol').html(localStorage.getItem("symbol"));
    $('#modalQuantity').html(localStorage.getItem("qty"));
    $('#modalClient').html(localStorage.getItem("client"));
    $('#modalTimeStamp').html(timestamp);

    // $('#modal-Locate-alert').modal('show');
    $('#clientLocateDisplayLi').css('display', 'block');

    $('#locate').css('display', 'none');
    $('#locateExecute').css('display', 'block');

    // $('#modalSymbol').html(localStorage.getItem("symbol"));
    $('#locateExecuteQty').val(localStorage.getItem("qty"));
    $('#locateExecuteClient').val(localStorage.getItem("client"));
    $('#locateExecuteSymbol').val(localStorage.getItem("symbol"));
    $("#locateExecuteSymbol option[value='" + localStorage.getItem('symbol') + "']").attr('selected', 'selected');
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4> ' + qty + ' ' + symbol + ' located ' + new Date($.now()).toString().substring(0,25)+ '</h4><div class="confirm-btn"><a href="#" class="btn btn-primary" id="viewLocate">View All Locates</a></div></div>');
}

$(document).on('click', '#locateOkBtn', function () {
    $('#modal-Locate-alert').modal('hide');
    $('#locate').css('display', 'none');
    $('#locateExecute').css('display', 'block');

    // $('#modalSymbol').html(localStorage.getItem("symbol"));
    $('#locateExecuteQty').val(localStorage.getItem("qty"));
    $('#locateExecuteClient').val(localStorage.getItem("client"));
//    
});

$(document).on('click', '#btnExecute', function () {

    var qty = $('#locateExecuteQty').val();
    var symbol = $('#locateExecuteSymbol').val();
    var client = $('#locateExecuteClient').val();
    var rate = $('#locateExecuteRate').val();
    var price = $('#locateExecutePrice').val();
    var orderType = $('input[name=orderType]:checked').val();
    var orderStrategy = $('#orderStrategy').val();

    localStorage.setItem("qty", qty);
    localStorage.setItem("symbol", symbol);
    localStorage.setItem("client", client);
    localStorage.setItem("rate", rate);
    localStorage.setItem("price", price);
    localStorage.setItem("orderType", orderType);
    localStorage.setItem("orderStrategy", orderStrategy);

    $('#modalExecuteSymbol').html(localStorage.getItem("symbol"));
    $('#modalExecuteQuantity').html(localStorage.getItem("qty"));
    $('#modalExecuteclient').html(localStorage.getItem("client"));
    $('#modalExecutePrice').html(localStorage.getItem("price"));
    $('#modalExecuteRate').html(localStorage.getItem("rate"));
    $('#modalExecuteOrder').html(localStorage.getItem("orderType"));
    $('#modalExecuteOrderStrategy').html(localStorage.getItem("orderStrategy"));

    $('#modal-Locate-execute').modal('show');
});

$(document).on('click', '#executeOkBtn', function () {
    $('#modal-Locate-execute').modal('hide');

    var clientname = "Client " + localStorage.getItem("client");
    var otherclientvalues = "Sold short " + localStorage.getItem("qty") + " " + localStorage.getItem("symbol") + " at $10,501";

    $('#clientname').html(clientname);
    $('#clientothervalue').html(otherclientvalues);

    if ($('.inven-' + localStorage.getItem("symbol").toLowerCase()).hasClass('inven-parent-' + localStorage.getItem("symbol").toLowerCase()) == true) {
        var totalInv = $('.inv-parent-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(2)').text();
        $('.inven-parent-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(2)').text(parseInt(totalInv) - localStorage.getItem("qty"));
        var totalchildinv = $('.inv-child-xyz td:nth-child(2)').text();
        $('.inven-child-xyz td:nth-child(2)').text(parseInt(totalchildinv) - localStorage.getItem("qty"));
    } else {
        var totalInv = $('.inven-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(2)').text();
        $('.inven-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(2)').text(parseInt(totalInv) - localStorage.getItem("qty"));
    }
    if (localStorage.getItem("orderType").toLowerCase() == 'limit') {
        var priceFinal = localStorage.getItem("price");
        var trTag = '<tr class="' + localStorage.getItem("symbol").toLowerCase() + 'CancelRaw ' + localStorage.getItem("symbol").toLowerCase() + '-open-order">\n' +
                '<td>' + localStorage.getItem("symbol").toUpperCase() + '</td>\n' +
                '<td>-' + localStorage.getItem("qty") + '</td>\n' +
                '<td>' + localStorage.getItem("rate") + '</td>\n' +
                '<td>' + priceFinal + '</td>\n' +
                '<td>\n' +
                '<div class="table-btn">\n' +
                '<a href="#" class="btn btn-primary editOpenPosition">Edit</a>\n' +
                '<a class="btn btn-primary btn-danger openPositionCancel" id="' + localStorage.getItem("symbol").toLowerCase() + 'Cancel">Cancel</a>\n' +
                '</div></td></tr>';
        $('.openOrderTable').prepend(trTag);
    } else {
        var trTag = '<tr class="' + localStorage.getItem("symbol").toLowerCase() + 'Raw ' + localStorage.getItem("symbol").toLowerCase() + '-open-order">\n' +
                '<td>' + localStorage.getItem("symbol").toUpperCase() + '</td>\n' +
                '<td>-' + localStorage.getItem("qty") + '</td>\n' +
                '<td>' + localStorage.getItem("rate") + '</td>\n' +
                '<td> 10830.20 </td>\n' +
                '<td>\n' +
                '<div class="table-btn">\n' +
                '<a href="#" class="btn btn-primary viewposition" id="' + localStorage.getItem("symbol").toLowerCase() + '" aria-controls="profile" role="tab" data-toggle="tab">View</a>\n' +
                '<a class="btn btn-primary btn-danger btn-danger close-position"">Close</a>\n' +
                '</div></td></tr>';
        $('.openPositionTable').prepend(trTag);
    }

//
    $('#confirmreceipt').html('Receipt Confirmed');
//    $('#openPositionTr').css('display', 'block');
//
//    $('#clientDisplayLi').css('display', 'block');

    $('#locateExecuteQty').val('');
    $('#locateExecuteSymbol').val('');
    $('#locateExecuteClient').val('');
    $('#locateExecuteRate').val('');
    $('#locateExecutePrice').val('');
    $('#orderStrategy').val('');
    $('#symbol').val('');
    $('#qty').val('');
    $('#client').val('');
    $('#locateExecute').css('display', 'none');
    $('#locate').css('display', 'block');
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4> You Sold Short ' + localStorage.getItem("qty") + ' ' + localStorage.getItem("symbol").toLowerCase() + ' at $' + localStorage.getItem("price") + ' at rate ' + localStorage.getItem("rate") + '%</div>');
//    $('#modal-Locate-execute').modal('toggle');
});

$(document).on('click', '.clearLocate', function () {
    $('#symbol').val('');
    $('#qty').val('');
    $('#client').val('');
});
$(document).on('click', '.clearExecute', function () {
    $('#locateExecuteQty').val('');
    $('#locateExecuteSymbol').val('');
    $('#locateExecuteClient').val('');
    $('#locateExecuteRate').val('');
    $('#locateExecutePrice').val('');
    $('#orderStrategy').val('');
});

$('input[type=radio][name=orderType]').change(function () {
    // alert($(this).val());
    var ordertype = $(this).val();

    if (ordertype == "Market") {
        $('#locateExecutePrice').val('');
        $('#locateExecutePrice').attr('readonly', true);
        $('#locateExecutePrice').css('background-color', '#131422');
    } else {
        $('#locateExecutePrice').attr('readonly', false);
    }
});




$('.btcChart').on('click', function () {
    $('.chartView').attr('src', 'img/BTC-USD-1.png');
});

$('.ethChart').on('click', function () {
    $('.chartView').attr('src', 'img/ETH-USD-1.jpg');
});

$(document).on('click', '.viewposition', function (e) {
    e.preventDefault();
    var position = $(this).attr('id');
    $('#risk').trigger('click');
    $('.' + position + 'RowPosition').addClass('highlightrow');

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#Positions").offset().top
    }, 2000);

    setTimeout(function () {
        $('.' + position + 'RowPosition').removeClass('highlightrow');
    }, 3000);
});

$(document).on('click', '.viewposition', function (e) {
    e.preventDefault();
    var position = $(this).attr('id');
    $('#positions').trigger('click');
    $('.' + position + 'RowPosition').addClass('highlightrow');

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#Positions").offset().top
    }, 2000);

    setTimeout(function () {
        $('.' + position + 'RowPosition').removeClass('highlightrow');
    }, 5000);
});





/*close position*/

$(document).on('click', '.close-position', function (e) {
    e.preventDefault();
    var raw = $(this).parent().children('a:first-child').attr('id');
    var qty = $(this).parent().parent().parent().children('td:nth-child(2)').html();
    var rate = $(this).parent().parent().parent().children('td:nth-child(4)').html();
    $('#modal-close-position').modal('toggle');
    $('#modal-close-position .position_name').val(raw);
    $('#modal-close-position .position_rate').val(rate);
    $('#modal-close-position .position_qty').val(qty);
    $('#modal-close-position .position_name').attr('id', client);
});


$(document).on('click', '.confirm-close-position', function (e) {
    e.preventDefault();
    var raw = $('#modal-close-position .position_name').val();
    var client = $('#modal-close-position .position_name').attr('id');
    var rate = $('#modal-close-position .position_rate').val();
    var qty = $('#modal-close-position .position_qty').val();
    $('#modal-close-position').modal('toggle');
    $('tr.' + raw + 'Raw').remove();
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4>Your  ' + qty.replace('-', '') + ' ' + raw.toUpperCase() + ' position is now closed at $' + rate + '</h4></div>');
});


/*cancel position*/
$(document).on('click', '.openPositionCancel', function (e) {
    e.preventDefault();
    var raw = $(this).attr('id');
    var qty = $(this).parent().parent().parent().children('td:nth-child(2)').html();
    var rate = $(this).parent().parent().parent().children('td:nth-child(4)').html();
    $('#modal-cancel-position').modal('toggle');
    $('#modal-cancel-position .position_cancel_name').val(raw);
    $('#modal-cancel-position .position_cancel_name').attr('id', qty);
    $('#modal-cancel-position .position_cancel_name').data('rate', rate);
});


$(document).on('click', '.confirm-open-position-cancel', function (e) {
    e.preventDefault();
    var raw = $('#modal-cancel-position .position_cancel_name').val();
    var qty = $('#modal-cancel-position .position_cancel_name').attr('id');
    var price = $('#modal-cancel-position .position_cancel_name').data('rate');
    $('#modal-cancel-position').modal('toggle');
    $('tr.' + raw + 'Raw').remove();
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4> You canceled your open position of ' + qty.replace('-', '') + ' ' + raw.replace('Cancel', '').toUpperCase() + ' at $' + price + '  </h4></div>');
});

/*Edit open orders*/

$(document).on('click', '.editOpenPosition', function (e) {
    e.preventDefault();
    var symbol = $(this).parent().parent().parent().children('td:first-child').text().toLowerCase().trim();
    var qty = $(this).parent().parent().parent().children('td:nth-child(2)').text();
    var rate = $(this).parent().parent().parent().children('td:nth-child(3)').text();
    var limit = $(this).parent().parent().parent().children('td:nth-child(4)').text().toLowerCase();
    $('.order-symbol').val(symbol.toUpperCase());
    $('.order-qty').val(qty);
    if (limit == 'mkt') {
        $('#inlineRadio12').attr('checked', 'checked');
        $('.order-limit').attr('disabled', 'disabled');
    } else {
        $('#inlineRadio22').attr('checked', 'checked');
        $('.order-limit').val(limit);
    }
    $('#modal-edit').modal('toggle');
});

$(document).on('change', 'input[type=radio][name=inlineRadioOptions]', function () {
    if (this.value == 'mkt') {
        $('.order-limit').attr('disabled', 'disabled');
//        $('.order-limit').val('');
    } else if (this.value == 'limit') {
        $('.order-limit').removeAttr('disabled');
    }
});


$(document).on('click', '.confirm-order-update', function (e) {
    e.preventDefault();
    var symbol = $('.order-symbol').val().toLowerCase();
    var qty = $('.order-qty').val();
    var client = $('.order-client').val();
    var order_type = $('#inlineRadio22').is(':checked');
    $('.' + symbol + '-open-order td:nth-child(2)').text(qty);
    if (order_type == true) {
        var limit = $('.order-limit').val();
        $('.' + symbol + '-open-order td:nth-child(4)').text(limit);
    } else {
        $('.' + symbol + '-open-order td:nth-child(4)').text('MKT');
    }
    $('#modal-edit').modal('toggle');
});

$('.btcChart').on('click', function () {
    $('.chartView').attr('src', 'img/BTC-USD-1.png');
});

$('.ethChart').on('click', function () {
    $('.chartView').attr('src', 'img/ETH-USD-1.jpg');
});

/*view Locates*/

$(document).on('click', '#viewLocate', function (e) {
    e.preventDefault();
    $('.nav-tabs li').removeClass('active');
    $('.tab-pane').removeClass('active');
    $('.nav-tabs li:nth-child(3)').addClass('active');
    $('#main-tab3').addClass('active');
});

$(document).on('click', '.changeimg', function (e) {
    if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
    } else {
        $(this).addClass('collapsed');
    }
});
