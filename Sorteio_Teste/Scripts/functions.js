var table;
var jogos = [];

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

$(document).ready(function () {

    table = $('table').DataTable({
        data: jogos,
        "language": {
            "lengthMenu": "Mostrar _MENU_ linhas por página",
            "infoEmpty": "Sem registro",
            "zeroRecords": "Sem registro",
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            }
        },
        bFilter: false
    });


    /*$('#n1').val(1);
    $('#n2').val(2);
    $('#n3').val(3);
    $('#n4').val(4);
    $('#n5').val(5);
    $('#n6').val(6);*/

    $('#btnSalvar').click(function () {

        

        var n1 = $('#n1').val();
        var n2 = $('#n2').val();
        var n3 = $('#n3').val();
        var n4 = $('#n4').val();
        var n5 = $('#n5').val();
        var n6 = $('#n6').val();


        if (n1 == "" || n2 == "" || n3 == "" || n4 == "" || n5 == "" || n6 == "") {
            alert('Por favor preencha todos os campos!')
            return;
        }

        var array = [''];
        var s = '';

        for (var i = 1; i <= 6; i++) {
           
            if (s.indexOf($('#n' + i).val()) > -1) {

                if (s[s.indexOf($('#n' + i).val() - 1)] == "|" || s[s.indexOf($('#n' + i).val() + 1)] == "|") {

                }
                else {
                    alert('Não pode repetir números no mesmo jogo.');
                    $('#n' + i).focus();
                    return;
                }

               
            }

            if ($('#n' + i).val() > 60 || $('#n' + i).val() < 0) {
                alert('Utilize apenas números entre 0 e 60.');
                $('#n' + i).focus();
                return;
            }

            s += $('#n' + i).val();
            if (i != 6)
                s += "|";

            
        }

        array[0] = s;

        

        jogos.push(array);

        var button = '<a class="btn btn-danger" href="#" onclick="removeLinha(\'' + array + '\');">Apagar</a>';

        table.row.add([jogos.length, n1 + " | " + n2 + " | " + n3 + " | " + n4 + " | " + n5 + " | " + n6, new Date().toLocaleString(), button]).draw();


    });

    $('#btnLimpar').click(function () {

        


        $('#n1').val('');
        $('#n2').val('');
        $('#n3').val('');
        $('#n4').val('');
        $('#n5').val('');
        $('#n6').val('');

    });

    $('#btnSortear').click(function () {

        if (!jogos.length > 0) {
            alert('Faça pelo menos um jogo!');
            return;
        }

        $.ajax({
            type: "POST",
            url: "Sorteio/Sortear",
            traditional: true,
            data: { 'lista': jogos },
            success: function (data) {
                $('#resposta').html(data);
            }
        });

    });





});

function removeLinha(a) {

    //jogos.splice(a, 1);
    var x;



    for (var i = 0; i < jogos.length; i++) {

        if (jogos[i] == a) {
            jogos.splice(i, 1);
            table.row(i).remove().draw();
            return;
        }
    }





}