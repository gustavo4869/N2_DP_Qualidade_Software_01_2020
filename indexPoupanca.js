$().ready(function(){
    $("#calcular").click(function() {
        
        var salario = $("#salario").val().replace(',', '.');
        var custosFixos = $("#custosFixo").val().replace(',', '.');
        var numeroMeses = $("#meses").val();
        var total;

        var validaEntradas = validaEntrada(salario, custosFixos, numeroMeses);
    
        if(validaEntradas){
            total = CalcularPrevisaoPoupanca(salario, custosFixos, numeroMeses);
        } 
        console.log(total)
        $("#totalPoupanca").val(total.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}))
    })    
})

function validaEntrada(sal, cf, nm){
    
    if(!parseFloat(sal)){
        $("#msgErro").text('Digite um salário válido! (entre 0 e 100.000,00)');
        $("#myModal").modal('show');        
        $("#salario").focus();
        return false;
    } else if(sal < 0){
        $("#msgErro").text('Digite um número positivo para o salário! (entre 0 e 100.000,00)');
        $("#myModal").modal('show');
        $("#salario").focus();
        return false;
    } else if(sal > 100000){
        $("#msgErro").text('Digite um salário menor que R$ 100.000,00!');
        $("#myModal").modal('show');
        $("#salario").focus();
        return false;
    } 

    if(!parseFloat(cf)){
        $("#msgErro").text('Digite um valor válido para os custos fixos (entre 0 e o valor do seu salário)!');
        $("#myModal").modal('show');
        $("#custosFixo").focus();        
        return false;
    } else if(cf < 0){
        $("#msgErro").text('Digite um número positivo!');
        $("#myModal").modal('show');
        $("#custosFixo").focus();        
        return false;
    } else if(cf > 100000){
        $("#msgErro").text('Digite um valor para os custos fixos menor que R$ 100.000,00!');
        $("#myModal").modal('show');
        $("#custosFixo").focus();        
        return false;
    } else if(cf >= sal){
        $("#msgErro").text('Digite um valor para custos fixos menor que seu salário (R$ ' + sal.toLocaleString('pt-BR', { style: "currency" , currency:"BRL"}) + ')');
        $("#myModal").modal('show');
        $("#custosFixo").focus();        
        return false;
    }

    if(!parseInt(nm)){
        $("#msgErro").text('Digite um número de meses válido! (entre 1 e 120)');
        $("#myModal").modal('show');                
        $("#meses").focus();        
        return false;
    } else if(nm < 1 || nm > 120){
        $("#msgErro").text('Digite um número de meses válido! (entre 1 e 120)');
        $("#myModal").modal('show');                
        $("#meses").focus();        
        return false;
    }
    
    return true;
}

function CalcularPrevisaoPoupanca(sal, cf, meses){
    var total = (sal - cf) * meses;
    return total;
}
