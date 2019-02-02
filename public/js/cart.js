/* Filtro per aggiunta dei prodotti nel Carrello e per la gestione grafica del Pop-up */
$(document).ready(function(){
    $('.js-addcart-detail').click(function(e){
        e.preventDefault();
        $nome = $(this).parent().parent().parent().parent().parent().find('.js-name-detail').text();
        console.log($nome);
        $value = $(this).attr('value');
        $taglia = $('#taglieselct').val();
        $numb = $('.num-product').val();
        $color = $('#colorselect').val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url : "/addtocart",
            type: "POST",
            data: {'id': $value, 'num': $numb, 'colore': $color, 'taglia': $taglia},
            success: function (data) {
                console.log($nome);
                if($.isEmptyObject(data.error)){
                    $(".print-error-msg").css('display', 'none');
                    $(this).click(false);
                    $(this).addClass('js-addedwish-b2');
                    swal( $nome, "Aggiunto Al Carrello", "success");
                }
                else {
                    $(".print-error-msg").find("ul").html('');
                    $.each(data.error, function (key, value) {
                        $('.print-error-msg').find('ul').append('<li>' + value + '</li>');
                        $('.print-error-msg').css('display', 'block');
                    });
                }
            },
            error: function () {
              console.log('errore');
            }
        });
        $.ajax({
            url : '/getnumberitemcart',
            type: "GET",
            success: function(data) {
                $('.js-show-cart').attr('data-notify', data['count']);
            }
        });
    });
});

$(document).ready(function(){
    $.ajax({
        url : '/getnumberitemcart',
        type: "GET",
        success: function(data) {
            console.log(data);
            $('.js-show-cart').attr('data-notify', data['count']);
        }
    });
});

$(document).ready(function(){
    $('.header-cart-content').on('click', '.header-cart-item-img', function(e){
        e.preventDefault();
        $id = $(this).attr('value');
        console.log($id);
        $.ajax({
            url: '/eliminaprodottocarrello',
            type: "GET",
            dataType: "json",
            data: {'id': $id},
            success: function (data) {
                console.log(data["msg"]);
            },
            error: function() {
                console.log('Errore inserimento');
            }
        });
        $.ajax({
            url : '/getnumberitemcart',
            type: "GET",
            success: function(data) {
                console.log(data);
                $('.js-show-cart').attr('data-notify', data['count']);
            }
        });
        $.ajax({
            url : "/listacarrello",
            type: "GET",
            dataType: "html",
            success: function(data) {
                console.log('funziona, prodotto Inserito');
                $('.header-cart-content').html(data);
            },
            error: function() {
                console.log('Errore inserimento');
            }
        });
    });
});

$(document).ready(function(){
    $('.how-itemcart1').on('click', function(e){
        e.preventDefault();
        $id = $(this).attr('value');
        console.log($id);
        $.ajax({
            url: '/eliminaprodottocarrello',
            type: "GET",
            dataType: "json",
            data: {'id': $id},
            success: function (data) {
                console.log(data["msg"]);
                location.reload();
            },
            error: function() {
                console.log('Errore inserimento');
            }
        });
        $.ajax({
            url : '/getnumberitemcart',
            type: "GET",
            success: function(data) {
                console.log(data);
                $('.js-show-cart').attr('data-notify', data['count']);
            }
        });
    });
});

/*Aggiornamento Carrelo view Carrello.blade*/
$(document).ready(function() {
    $('.js-cartupdate').on('click', function(e){
        e.preventDefault();
        $('.table_row').each(function () {
            $num = $(this).find('.num-product').val();
            $id = $(this).find('.how-itemcart1').attr('value');
            console.log($num, $id);
            $.ajax({
                url: '/modificanumitems',
                type: "GET",
                data: {'id': $id, 'num': $num},
            });
        });
        location.reload();
    });
    $.ajax({
        url: '/getnumberitemcart',
        type: "GET",
        succes: function (data) {

        }
    })
});


