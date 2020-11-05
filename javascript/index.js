var dollarEnabled = false;
var dollarExchange = 0;
var salariesTotal = 0;
var aguinaldoColonesTotal = 0;
var aguinaldoDollarsTotal = 0;
var baseMoneyMount = '0.00';

$(document).ready(function () {
    $('#calculator').submit(function (e) {
        e.preventDefault();

        $('.month').each(function (index, monthSalary) {
            salariesTotal = salariesTotal + Number(monthSalary.value);
        });

        if (dollarEnabled) {
            aguinaldoDollarsTotal = (salariesTotal / 12);
            $('#aguinaldo-total-dollars').html(aguinaldoDollarsTotal.toLocaleString('en'));

            aguinaldoColonesTotal = (salariesTotal / 12) * dollarExchange;
            $('#aguinaldo-total-colones').html(aguinaldoColonesTotal.toLocaleString('en'));
        } else {
            aguinaldoColonesTotal = salariesTotal / 12;
            $('#aguinaldo-total-colones').html(aguinaldoColonesTotal.toLocaleString('en'));
        }
    });

    $('#calculator-reset').click(function (e) {
        e.preventDefault();
        document.getElementById('calculator').reset()
        $('#aguinaldo-total-dollars').html(baseMoneyMount);
        $('#aguinaldo-total-colones').html(baseMoneyMount)
    });

    $('#btn-salary-add').click(function (e) {
        e.preventDefault();

        var from = $("#select-from").val();
        var to = $("#select-to").val();
        var salary = $("#salary-period").val();

        addSalaryToMultipleMonths(from, to, salary);

        $('#exampleModal').modal('hide');
    });

    $('#dollar-toggle').change(function (e) {
        e.preventDefault();
        if (e.target.checked) {
            dollarEnabled = true;
            $('.dollar-display').show();
            $('.month').each(function (index, monthSalary) {
                monthSalary.placeholder = 'USD 0.00';
                monthSalary.step = '100';
            });
        } else {
            dollarEnabled = false;
            $('.dollar-display').hide();
            $('.month').each(function (index, monthSalary) {
                monthSalary.placeholder = 'CRC 0.00';
                monthSalary.step = '10000';
            });
        }
    });

    $('#exchange-input').change(function (e) {
        e.preventDefault();
        dollarExchange = e.target.value;
    });
});

function addSalaryToMultipleMonths(from, to, salary) {
    var fromNumber = Number(from.split('-')[1]);
    var toNumber = Number(to.split('-')[1]);

    $('.month').each(function (index, monthSalary) {
        const monthNumber = Number(monthSalary.id.split('-')[2]);

        if (monthNumber >= fromNumber && monthNumber <= toNumber) {
            $(monthSalary).val(salary);
        }
    });
}