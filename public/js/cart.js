/* Filtro per aggiunta dei prodotti nel Carrello e per la gestione grafica del Pop-up */
$(document).ready(function(){
    $('.js-addcart-detail').click(function(e){
        e.preventDefault();
        $nome = $(this).parent().parent().parent().parent().find('.js-name-detail').text();
        $value = $(this).attr('value');
        $numb = $('.num-product').val();
        $(this).click(false);
        console.log($value);
        console.log($numb);
        $(this).addClass('js-addedwish-b2');
        swal( $nome, "Aggiunto Al Carrello", "success");
        console.log($value);
        $.ajax({
            url : "/addtocart",
            type: "GET",
            data: {'id': $value, 'num': $numb}
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


