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
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4>' + localStorage.getItem("client") + '<br> ' + qty + ' ' + symbol + ' located ' + new Date($.now()).toString().substring(0, 25) + '</h4><div class="confirm-btn"><a href="#" class="btn btn-primary" id="viewLocate">View All Locates</a></div></div>');
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

    if ($('.inv-' + localStorage.getItem("symbol").toLowerCase()).hasClass('inv-parent-' + localStorage.getItem("symbol").toLowerCase()) == true) {
        var totalInv = $('.inv-parent-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(3)').text();
        $('.inv-parent-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(3)').text(parseInt(totalInv) - localStorage.getItem("qty"));
        var totalchildinv = $('.inv-child-xyz td:nth-child(3)').text();
        $('.inv-child-xyz td:nth-child(3)').text(parseInt(totalchildinv) - localStorage.getItem("qty"));
    } else {
        var totalInv = $('.inv-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(3)').text();
        $('.inv-' + localStorage.getItem("symbol").toLowerCase()).children('td:nth-child(3)').text(parseInt(totalInv) - localStorage.getItem("qty"));
    }
    if (localStorage.getItem("orderType").toLowerCase() == 'limit') {
        var priceFinal = localStorage.getItem("price");
        var trTag = '<tr class="' + localStorage.getItem("symbol").toLowerCase() + 'CancelRaw ' + localStorage.getItem("symbol").toLowerCase() + '-open-order">\n' +
                '<td>' + localStorage.getItem("symbol").toUpperCase() + '</td>\n' +
                '<td>' + localStorage.getItem("client") + '</td>\n' +
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
                '<td>' + localStorage.getItem("client") + '</td>\n' +
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
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4> Client ' + localStorage.getItem("client") + '<br> Sold Short ' + localStorage.getItem("qty") + ' ' + localStorage.getItem("symbol").toLowerCase() + ' at $' + localStorage.getItem("price") + ' at rate ' + localStorage.getItem("rate") + '%</div>');
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


$(document).on('click', '.changeimg', function (e) {
    if ($(this).hasClass('collapsed')) {
        $(this).removeClass('collapsed');
    } else {
        $(this).addClass('collapsed');
    }
});

//$('.inventory-table-datatable').DataTable({
//    
//    paging: false,
//    searching: false,
//});

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





/*close position*/

$(document).on('click', '.close-position', function (e) {
    e.preventDefault();
    var raw = $(this).parent().children('a:first-child').attr('id');
    var client = $(this).parent().parent().parent().children('td:nth-child(2)').html();
    var qty = $(this).parent().parent().parent().children('td:nth-child(3)').html();
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
    var total = $('.' + raw.replace(/[0-9]/g, '') + '-child').length;
    $('.alertdisplay li:first-child').prepend('<div class="box"><h4>Client ' + client + ' closed a short position of ' + qty + ' qty at rate ' + rate + '</h4></div>');
});


/*cancel position*/
$(document).on('click', '.openPositionCancel', function (e) {
    e.preventDefault();
    var raw = $(this).attr('id');
    var client = $(this).parent().parent().parent().children('td:nth-child(2)').html();
    $('#modal-cancel-position').modal('toggle');
    $('#modal-cancel-position .position_cancel_name').val(raw);
    $('#modal-cancel-position .position_cancel_name').attr('id', client);
});


$(document).on('click', '.confirm-open-position-cancel', function (e) {
    e.preventDefault();
    var raw = $('#modal-cancel-position .position_cancel_name').val();
    var client = $('#modal-cancel-position .position_cancel_name').attr('id');
    $('#modal-cancel-position').modal('toggle');
    $('tr.' + raw + 'Raw').remove();
    $('.alertdisplay li').prepend('<div class="box"><h4> Client ' + client + ' canceled open order</h4></div>');
});



/*Edit inventory mgmt*/
$(document).on('click', '.edit-inventory-mgmt', function (e) {
    e.preventDefault();
    var inv_id = $(this).parent().parent().parent().children('td:first-child').text().toLowerCase().trim();
    var client = $(this).parent().parent().parent().children('td:nth-child(2)').html();
    var qty = $(this).parent().parent().parent().children('td:nth-child(3)').html();
    var rate = $(this).parent().parent().parent().children('td:nth-child(4)').html();
    $('#modal-edit-inventory-manage .inventory-client').val(client);
    $('#modal-edit-inventory-manage .inventory-qty').val(qty);
    $('#modal-edit-inventory-manage .inventory-rate').val(rate);
    $('#modal-edit-inventory-manage .inventory-id').val(inv_id);
    $('#modal-edit-inventory-manage').modal('toggle');

});

$(document).on('click', '.update-inventory', function (e) {
    e.preventDefault();
    var qty = $('#modal-edit-inventory-manage .inventory-qty').val();
    var client = $('#modal-edit-inventory-manage .inventory-client').val().toLowerCase();
    var rate = $('#modal-edit-inventory-manage .inventory-rate').val();
    var inv_id = $('#modal-edit-inventory-manage .inventory-id').val();
    var clients = $('.' + inv_id + '-inventory:first-child td:nth-child(2)').text().toLowerCase();
    if (clients == 'multiple') {
        $('.child-' + inv_id + '.' + inv_id + '-inventory.child-' + client + ' td:nth-child(3)').text(qty);
        $('.child-' + inv_id + '.' + inv_id + '-inventory.child-' + client + ' td:nth-child(4)').text(rate);
        var total_child = $('.child-' + inv_id).length;
        var total_qty = 0;
        var total_rate = 0;
        for (var i = 2; i < total_child + 2; i++) {
            total_qty = total_qty + parseInt($('.child-' + inv_id + '.' + inv_id + '-inventory:nth-child(' + i + ') td:nth-child(3)').text());
            total_rate = total_rate + parseFloat($('.child-' + inv_id + '.' + inv_id + '-inventory:nth-child(' + i + ') td:nth-child(4)').text());
        }
        var avg_rate = Math.round((total_rate / total_child) * 100) / 100;
        $('.parent-' + inv_id + '.' + inv_id + '-inventory td:nth-child(3)').text(total_qty);
        $('.parent-' + inv_id + '.' + inv_id + '-inventory td:nth-child(4)').text(avg_rate);


        $('.inv-child-' + inv_id + '.inv-child-' + client + ' td:nth-child(3)').text(qty);
        $('.inv-child-' + inv_id + '.inv-child-' + client + ' td:nth-child(4)').text(rate);
        var total_child = $('.inv-child-' + inv_id).length;
        var total_qty = 0;
        var total_rate = 0;
        for (var i = 2; i < total_child + 2; i++) {
            total_qty = total_qty + parseInt($('.inv-child-' + inv_id + '.inv-' + inv_id + ':nth-child(' + i + ') td:nth-child(3)').text());
            total_rate = total_rate + parseFloat($('.inv-child-' + inv_id + '.inv-' + inv_id + ':nth-child(' + i + ') td:nth-child(4)').text());
        }
        var avg_rate = Math.round((total_rate / total_child) * 100) / 100;
        $('.inv-parent-' + inv_id + '.inv-' + inv_id + ' td:nth-child(3)').text(total_qty);
        $('.inv-parent-' + inv_id + '.inv-' + inv_id + ' td:nth-child(4)').text(avg_rate);


    } else {
        $('.' + inv_id + '-inventory td:nth-child(3)').text(qty);
        $('.' + inv_id + '-inventory td:nth-child(4)').text(rate);
        $('.inv-' + inv_id + ' td:nth-child(3)').text(qty);
        $('.inv-' + inv_id + ' td:nth-child(4)').text(rate);
    }
    $('#modal-edit-inventory-manage').modal('toggle');
});

/* Recall Positions*/
$(document).on('click', '.recall-inventory', function (e) {
    e.preventDefault();
    var inv_recall_id = $(this).parent().parent().parent().children('td:first-child').text().toLowerCase().trim();
    var inv_recall_client = $(this).parent().parent().parent().children('td:nth-child(2)').text().toLowerCase().trim();
    var inv_recall_qty = $(this).parent().parent().parent().children('td:nth-child(3)').text();
    var inv_recall_rate = $(this).parent().parent().parent().children('td:nth-child(4)').text();
    $('.inv-recall-id').val(inv_recall_id);
    $('.inv-recall-qty').val(inv_recall_qty);
    $('.inv-recall-rate').val(inv_recall_rate);
    $('.inv-recall-client').val(inv_recall_client);
    $('#modal-recall').modal('toggle');
});

$(document).on('click', '.recall-confirm', function (e) {
    e.preventDefault();
    var inv_recall_id = $('.inv-recall-id').val();
    var inv_recall_qty = $('.inv-recall-qty').val();
    var inv_recall_rate = $('.inv-recall-rate').val();
    var inv_recall_client = $('.inv-recall-client').val();
    var clients = $('.inv-' + inv_recall_id + ':first-child td:nth-child(2)').text().toLowerCase().trim();
    if (clients == 'multiple') {
//        var old_qty = $('.inv-child-' + inv_recall_client + ' td:nth-child(3)').text();
//        var old_rate = $('.inv-child-' + inv_recall_client + ' td:nth-child(4)').text();
//        var new_qty = parseInt(inv_recall_qty) + parseInt(old_qty);
//        var new_rate = (parseFloat(inv_recall_rate) + parseFloat(old_rate)) / 2;
//        $('.inv-child-' + inv_recall_client + ' td:nth-child(3)').text(new_qty);
//        $('.inv-child-' + inv_recall_client + ' td:nth-child(4)').text(new_rate);
        $('.inv-child-' + inv_recall_client).remove();
        var total_child = $('.inv-child-' + inv_recall_id).length;
        var total_qty = 0;
        var total_rate = 0;
        for (var i = 2; i < total_child + 2; i++) {
            total_qty = total_qty + parseInt($('.inv-child-' + inv_recall_id + ':nth-child(' + i + ') td:nth-child(3)').text());
            total_rate = total_rate + parseFloat($('.inv-child-' + inv_recall_id + ':nth-child(' + i + ') td:nth-child(4)').text());
        }
        var avg_rate = Math.round((total_rate / total_child) * 100) / 100;
        $('.inv-parent-' + inv_recall_id + '.inv-' + inv_recall_id + ' td:nth-child(3)').text(total_qty);
        $('.inv-parent-' + inv_recall_id + '.inv-' + inv_recall_id + ' td:nth-child(4)').text(avg_rate);
        $('.' + inv_recall_id + '-inventory.child-' + inv_recall_client).remove();
        var total_child = $('.child-' + inv_recall_id).length;
        var total_qty = 0;
        var total_rate = 0;
        for (var i = 2; i < total_child + 2; i++) {
            total_qty = total_qty + parseInt($('.child-' + inv_recall_id + '.' + inv_recall_id + '-inventory:nth-child(' + i + ') td:nth-child(3)').text());
            total_rate = total_rate + parseFloat($('.child-' + inv_recall_id + '.' + inv_recall_id + '-inventory:nth-child(' + i + ') td:nth-child(4)').text());
        }
        var avg_rate = Math.round((total_rate / total_child) * 100) / 100;
        $('.parent-' + inv_recall_id + '.' + inv_recall_id + '-inventory td:nth-child(3)').text(total_qty);
        $('.parent-' + inv_recall_id + '.' + inv_recall_id + '-inventory td:nth-child(4)').text(avg_rate);

    } else {
        $('.inv-' + inv_recall_id).remove();
//        var old_qty = $('.inv-' + inv_recall_id + ' td:nth-child(3)').text();
//        var old_rate = $('.inv-' + inv_recall_id + ' td:nth-child(4)').text();
//        var new_qty = parseInt(inv_recall_qty) + parseInt(old_qty);
//        var new_rate = (parseFloat(inv_recall_rate) + parseFloat(old_rate)) / 2;
//        $('.inv-' + inv_recall_id + ' td:nth-child(3)').text(new_qty);
//        $('.inv-' + inv_recall_id + ' td:nth-child(4)').text(new_rate);
        if ($('.' + inv_recall_id + '-inventory').hasClass('child' + inv_recall_id) == true) {
            $('.' + inv_recall_id + '-inventory.child-' + inv_recall_id).remove();
        } else {
            $('.' + inv_recall_id + '-inventory').remove();
        }
    }
    $('#modal-recall').modal('toggle');
});


/*Edit open orders*/

$(document).on('click', '.editOpenPosition', function (e) {
    e.preventDefault();
    var symbol = $(this).parent().parent().parent().children('td:first-child').text().toLowerCase().trim();
    var client = $(this).parent().parent().parent().children('td:nth-child(2)').text();
    var qty = $(this).parent().parent().parent().children('td:nth-child(3)').text();
    var rate = $(this).parent().parent().parent().children('td:nth-child(4)').text();
    var limit = $(this).parent().parent().parent().children('td:nth-child(5)').text().toLowerCase();
    $('.order-symbol').val(symbol.toUpperCase());
    $('.order-qty').val(qty);
    $('.order-client').val(client);
    if (limit == 'mkt') {
        $('#inlineRadio1').attr('checked', 'checked');
        $('.order-limit').attr('disabled', 'disabled');
    } else {
        $('#inlineRadio2').attr('checked', 'checked');
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
    var order_type = $('#inlineRadio2').is(':checked');
    $('.' + symbol + '-open-order td:nth-child(2)').text(client.toUpperCase());
    $('.' + symbol + '-open-order td:nth-child(3)').text(qty);
    if (order_type == true) {
        var limit = $('.order-limit').val();
        $('.' + symbol + '-open-order td:nth-child(5)').text(limit);
    } else {
        $('.' + symbol + '-open-order td:nth-child(5)').text('MKT');
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