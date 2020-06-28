$().ready(function(){
    $("#calcular").click(function() {
        var aliquotaInss = 0;
        var salario = $("#salario").val().replace(',', '.');
        var valorValidaEntrada = validaEntrada(salario);
    
        console.log('Valida entrada: ' + valorValidaEntrada)

        if(valorValidaEntrada == 1){
            aliquotaInss = calcularAliquotaInss(salario);
        } else {
            switch(valorValidaEntrada){
                case -1:
                    $("#msgErro").text('Digite um número válido!');
                    $("#myModal").modal('show');
                    break;

                case -2:
                    $("#msgErro").text('Digite um número positivo!');
                    $("#myModal").modal('show');
                    break;

                case -3:
                    $("#msgErro").text('Digite um número menor que R$ 100.000,00!');
                    $("#myModal").modal('show');
                    break;
            }            
        }     

        $("#finss").val(aliquotaInss.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}))
    })    
})

function validaEntrada(salario){
    if(!parseFloat(salario)){
        return -1;
    } else if(salario < 0){
        return -2;
    } else if(salario > 100000){
        return -3;
    } else{
        return 1;
    }
}

function calcularAliquotaInss(salario){
    var totalAliquota = 0;
    var totalAliquota1;
    var totalAliquota2;
    var totalAliquota3;
    var totalAliquota4;    
    
    /*
    Taxa de desconto até R$ 1.045 (salário mínimo)	7,5%
    Taxa de desconto entre R$ 1.045,01 e R$ 2.089,60	9%
    Taxa de desconto entre R$ 2.089,61 e R$ 3.134,40	12%
    Taxa de desconto entre R$ 3.134,41 e R$ 6.101,06	14%
    >= 6101,06 713,08 
    */

    if(salario > 6101.06){        
        totalAliquota = 713.08;
        $("#tdDesconto1").text('R$ 0,00');
        $("#tdDesconto2").text('R$ 0,00');
        $("#tdDesconto3").text('R$ 0,00');
        $("#tdDesconto4").text('R$ 0,00');
        $("#tdDesconto5").text(totalAliquota.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
    } else if(salario <= 1045) {        
        totalAliquota = salario * 0.075;
        $("#tdDesconto1").text(totalAliquota.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto2").text('R$ 0,00');
        $("#tdDesconto3").text('R$ 0,00');
        $("#tdDesconto4").text('R$ 0,00');
        $("#tdDesconto5").text('R$ 0,00');
    } else if(salario >= 1045.01 && salario <= 2089.60){        
        totalAliquota1 = (1045 * 0.075);
        totalAliquota2 = ((salario - 1045) * 0.09);  
        totalAliquota = totalAliquota1 + totalAliquota2;

        $("#tdDesconto1").text(totalAliquota1.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto2").text(totalAliquota2.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto3").text('R$ 0,00');
        $("#tdDesconto4").text('R$ 0,00');
        $("#tdDesconto5").text('R$ 0,00');
    } else if(salario >= 2089.61 && salario <= 3134.40){        
        totalAliquota1 = (1045 * 0.075);
        totalAliquota2 = ((2089.60 - 1045.01) * 0.09);
        totalAliquota3 = ((salario - 2089.61) * 0.12);
        totalAliquota =  totalAliquota1 + totalAliquota2 + totalAliquota3;

        $("#tdDesconto1").text(totalAliquota1.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto2").text(totalAliquota2.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto3").text(totalAliquota3.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto4").text('R$ 0,00');
        $("#tdDesconto5").text('R$ 0,00');
    } else if(salario >= 3134.41 && salario <= 6101.06) {        
        totalAliquota1 = (1045 * 0.075);
        totalAliquota2 = ((2089.60 - 1045.01) * 0.09);
        totalAliquota3 = ((3134.4 - 2089.61) * 0.12);
        totalAliquota4 = ((salario - 3134.41) * 0.14);
        totalAliquota =  totalAliquota1 + totalAliquota2 + totalAliquota3 + totalAliquota4;
        
        $("#tdDesconto1").text(totalAliquota1.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto2").text(totalAliquota2.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto3").text(totalAliquota3.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto4").text(totalAliquota4.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}));
        $("#tdDesconto5").text('R$ 0,00');
    }

    return totalAliquota;
}
