<div id="item-container">
    <button class="btn btn-primary" id="btn-novo-item" onclick="adicionarNovoItem()">+ Novo Item</button>
    <div class="item-block">
        <div class="row mb-3">
            <div class="col-md-3">
                <div class="form-group">
                    <label>Categoria:</label>
                    <select size='1' class='filterSelect form-control' data-target='produto' name='categoria[]' id='categoria' required>
                        <option hidden disabled selected value>Selecione...</option>
                        <option value='Venda' data-reference='1'>Venda</option>
                        <option value='Contrato' data-reference='2'>Contrato</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <label>Produto:</label>
                <select size='1' class='list filterSelect form-control' name='produto[]' id='produto' required>
                    <option hidden disabled selected value>Selecione...</option>
                    <!-- VENDA -->
                    <option value="BOBINA TERMICA 55MM X300M" data-belongsto="1">BOBINA TERMICA 55MM X300M</option>
                    <option value="CHAPEIRA 10 LUGARES" data-belongsto="1">CHAPEIRA 10 LUGARES</option>
                    <option value="CHAPEIRA 15 LUGARES" data-belongsto="1">CHAPEIRA 15 LUGARES</option>
                    <option value="CHAPEIRA 25 LUGARES" data-belongsto="1">CHAPEIRA 25 LUGARES</option>
                    <option value="CHAPEIRA 5 LUGARES" data-belongsto="1">CHAPEIRA 5 LUGARES</option>
                    <option value="CHAPEIRA 50 LUGARES" data-belongsto="1">CHAPEIRA 50 LUGARES</option>
                    <option value="FECHADURA SOBREPOR DIGITAL BIOMETRIA + SMARTCARD +TECLADO PORTA DE MADEIRA" data-belongsto="1">FECHADURA SOBREPOR DIGITAL BIOMETRIA + SMARTCARD +TECLADO PORTA DE MADEIRA</option>
                    <option value="FITA DE IMPRESSAO PRINTNOX" data-belongsto="1">FITA DE IMPRESSAO PRINTNOX</option>
                    <option value="CARTAO CARTOLINA" data-belongsto="1">CARTAO CARTOLINA</option>
                    <option value="HORA TECNICA" data-belongsto="1">HORA TECNICA</option>
                    <option value="CARTAO DE PROXIMIDADE ISO CARD FINO" data-belongsto="1">CARTAO DE PROXIMIDADE ISO CARD FINO</option>
                    <option value="REL PONTO INFO DIXI IREP FACIAL PROX WIFI" data-belongsto="1">REL PONTO INFO DIXI IREP FACIAL PROX WIFI</option>
                    <option value="REL PONTO INFO DIXI IREP I4 BIO VERDE PROX WIFI" data-belongsto="1">REL PONTO INFO DIXI IREP I4 BIO VERDE PROX WIFI</option>
                    <option value="REL PONTO INFO DIXI IREP I4 BIO VERMELHO 4M PROX WIFI" data-belongsto="1">REL PONTO INFO DIXI IREP I4 BIO VERMELHO 4M PROX WIFI</option>
                    <option value="REL PONTO INFO DIXI IREP I4 BIO VERMELHO PROX WIFI" data-belongsto="1">REL PONTO INFO DIXI IREP I4 BIO VERMELHO PROX WIFI</option>
                    <option value="REL PONTO INFO DIXI SINDNOX BIO/PROX" data-belongsto="1">REL PONTO INFO DIXI SINDNOX BIO/PROX</option>
                    <option value="REL PONTO INFO DIXI SINDNOX FACIAL PROX WIFI" data-belongsto="1">REL PONTO INFO DIXI SINDNOX FACIAL PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY HEXA ADV B BIO VERDE  PROX WIFI" data-belongsto="1">REL PONTO INFO HENRY HEXA ADV B BIO VERDE PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY HEXA ADV B BIO VERMELHA  PROX WIFI" data-belongsto="1">REL PONTO INFO HENRY HEXA ADV B BIO VERMELHA PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY HEXA ADV B BIO VERMELHA 4M PROX WIFI" data-belongsto="1">REL PONTO INFO HENRY HEXA ADV B BIO VERMELHA 4M PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY PONTO E ADV D BIO VERDE PROX COM WIFI" data-belongsto="1">REL PONTO INFO HENRY PONTO E ADV D BIO VERDE PROX COM WIFI</option>
                    <option value="REL PONTO INFO HENRY PONTO E ADV D BIO VERMELHO PROX COM WIFI" data-belongsto="1">REL PONTO INFO HENRY PONTO E ADV D BIO VERMELHO PROX COM WIFI</option>
                    <option value="REL PONTO INFO HENRY SF ADV R2 BIO VERDE PROX WIFI" data-belongsto="1">REL PONTO INFO HENRY SF ADV R2 BIO VERDE PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY SF ADV R2 BIO VERMELHO 4M PROX  WIFI" data-belongsto="1">REL PONTO INFO HENRY SF ADV R2 BIO VERMELHO 4M PROX WIFI</option>
                    <option value="REL PONTO INFO HENRY SF ADV R2 BIO VERMELHO PROX WIFI" data-belongsto="1">REL PONTO INFO HENRY SF ADV R2 BIO VERMELHO PROX WIFI</option>
                    <option value="RELOGIO DE PONTO DIXI PRINTNOX" data-belongsto="1">RELOGIO DE PONTO DIXI PRINTNOX</option>
                    <option value="SIRENE 110/220V" data-belongsto="1">SIRENE 110/220V</option>
                    <option value="TROCA DE PLACA" data-belongsto="1">TROCA DE PLACA</option>
                    <option value="VIGIA BLUE" data-belongsto="1">VIGIA BLUE</option>
                    <option value="VIGIA ONLINE" data-belongsto="1">VIGIA ONLINE</option>
                    <option value='BATERIA PARA CARTOGRAFICO' data-belongsto="1">BATERIA PARA CARTOGRAFICO</option>
                    <option value='BATERIA PARA VIGIA BLUE' data-belongsto="1">BATERIA PARA VIGIA BLUE</option>
                    <option value='BUTTON' data-belongsto="1">BUTTON</option>
                    <option value='CARTAO DE PROXIMIDADE PERSONALIZADO' data-belongsto="1">CARTÃO DE PROXIMIDADE PERSONALIZADO</option>
                    <option value='CORDAO PERSONALIZADO' data-belongsto="1">CORDÃO PERSONALIZADO</option>
                    <option value='FONTE IREP' data-belongsto="1">FONTE IREP</option>
                    <option value='GUILHOTINA' data-belongsto="1">GUILHOTINA</option>
                    <option value='NOBREAK' data-belongsto="1">NOBREAK</option>
                    <option value='PORTA CRACHA' data-belongsto="1">PORTA CRACHÁ</option>
                    <option value='TAGS PROXIMIDADE' data-belongsto="1">TAGS PROXIMIDADE</option>
                    <option value='VIGIA BASTAO BLUE' data-belongsto="1">VIGIA BASTÃO BLUE</option>
                    <option value='VIGIA PROX (L8)' data-belongsto="1">VIGIA PROX (L8)</option>
                    <option value='COLETOR DIXI FACIAL' data-belongsto="1">COLETOR DIXI FACIAL</option>
                    <option value='ROLETE' data-belongsto="1">ROLETE</option>
                    <option value='VISITA TECNICA' data-belongsto="1">VISITA TÉCNICA</option>
                    <option value='CONTROLE DE ACESSO FACIAL' data-belongsto="1">CONTROLE DE ACESSO FACIAL</option>
                    <!-- CONTRATO -->
                    <option value="PACK de Implantacao Premium" data-belongsto="2">PACK de Implantação Premium</option>
                    <option value="ADITIVO DE CONTRATO" data-belongsto="2">ADITIVO DE CONTRATO</option>
                    <option value="CARTOGRAFICO + SUPORTE" data-belongsto="2">CARTOGRAFICO + SUPORTE</option>
                    <option value="CARTOGRAFICO SEM SUPORTE" data-belongsto="2">CARTOGRAFICO SEM SUPORTE</option>
                    <option value="IREP + SOFTWARE STANDARD + SUPORTE" data-belongsto="2">IREP + SOFTWARE STANDARD + SUPORTE</option>
                    <option value="IREP + SOFTWARE STANDARD SEM SUPORTE" data-belongsto="2">IREP + SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value="IREP + SOFTWARE PREMIUM + SUPORTE" data-belongsto="2">IREP + SOFTWARE PREMIUM + SUPORTE</option>
                    <option value="IREP + SOFTWARE PREMIUM" data-belongsto="2">IREP + SOFTWARE PREMIUM</option>
                    <option value="IREP FACIAL + SOFTWARE STANDARD + SUPORTE" data-belongsto="2">IREP FACIAL + SOFTWARE STANDARD + SUPORTE</option>
                    <option value="IREP FACIAL + SOFTWARE STANDARD SEM SUPORTE" data-belongsto="2">IREP FACIAL + SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value="IREP FACIAL + SOFTWARE PREMIUM + SUPORTE" data-belongsto="2">IREP FACIAL + SOFTWARE PREMIUM + SUPORTE</option>
                    <option value="IREP FACIAL + SOFTWARE PREMIUM SEM SUPORTE " data-belongsto="2">IREP FACIAL + SOFTWARE PREMIUM SEM SUPORTE</option>
                    <option value="IREP FACIAL" data-belongsto="2">IREP FACIAL</option>
                    <option value="IREP" data-belongsto="2">IREP</option>
                    <option value="MOBILE + SUPORTE" data-belongsto="2">MOBILE + SUPORTE</option>
                    <option value="MOBILE SEM SUPORTE" data-belongsto="2">MOBILE SEM SUPORTE</option>
                    <option value="PACK IMPLANTACAO" data-belongsto="2">PACK IMPLANTAÇÃO</option>
                    <option value="SINDNOX + SOFTWARE STANDARD + SUPORTE" data-belongsto="2">SINDNOX + SOFTWARE STANDARD + SUPORTE</option>
                    <option value="SINDNOX + SOFTWARE STANDARD SEM SUPORTE" data-belongsto="2">SINDNOX + SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value="SINDNOX + SOFTWARE PREMIUM + SUPORTE" data-belongsto="2">SINDNOX + SOFTWARE PREMIUM + SUPORTE</option>
                    <option value="SINDNOX + SOFTWARE PREMIUM SEM SUPORTE" data-belongsto="2">SINDNOX + SOFTWARE PREMIUM SEM SUPORTE</option>
                    <option value="SINDNOX FACIAL + SOFTWARE STANDARD + SUPORTE" data-belongsto="2">SINDNOX FACIAL + SOFTWARE STANDARD + SUPORTE</option>
                    <option value="SINDNOX FACIAL + SOFTWARE STANDARD SEM SUPORTE" data-belongsto="2">SINDNOX FACIAL + SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value="SINDNOX FACIAL + SOFTWARE PREMIUM + SUPORTE" data-belongsto="2">SINDNOX FACIAL + SOFTWARE PREMIUM + SUPORTE</option>
                    <option value="SINDNOX FACIAL + SOFTWARE PREMIUM SEM SUPORTE " data-belongsto="2">SINDNOX FACIAL + SOFTWARE PREMIUM SEM SUPORTE</option>
                    <option value="SINDNOX FACIAL" data-belongsto="2">SINDNOX FACIAL</option>
                    <option value="SINDNOX" data-belongsto="2">SINDNOX</option>
                    <option value="SOFTWARE CORPORATIVO + MOBILE + SUPORTE" data-belongsto="2">SOFTWARE CORPORATIVO + MOBILE + SUPORTE</option>
                    <option value="SOFTWARE CORPORATIVO + MOBILE SEM SUPORTE" data-belongsto="2">SOFTWARE CORPORATIVO + MOBILE SEM SUPORTE</option>
                    <option value="SOFTWARE DIXI STANDARD COM SUPORTE" data-belongsto="2">SOFTWARE DIXI STANDARD COM SUPORTE</option>
                    <option value="SOFTWARE DIXI STANDARD SEM SUPORTE" data-belongsto="2">SOFTWARE DIXI STANDARD SEM SUPORTE</option>
                    <option value="SOFTWARE STANDARD + SUPORTE" data-belongsto="2">SOFTWARE STANDARD + SUPORTE</option>
                    <option value="SOFTWARE STANDARD SEM SUPORTE" data-belongsto="2">SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value="SOFTWARE PREMIUM + MOBILE + SUPORTE" data-belongsto="2">SOFTWARE PREMIUM + MOBILE + SUPORTE</option>
                    <option value="SOFTWARE PREMIUM + MOBILE SEM SUPORTE" data-belongsto="2">SOFTWARE PREMIUM + MOBILE SEM SUPORTE</option>
                    <option value="SOFTWARE PREMIUM + SUPORTE" data-belongsto="2">SOFTWARE PREMIUM + SUPORTE</option>
                    <option value="SOFTWARE PREMIUM SEM SUPORTE" data-belongsto="2">SOFTWARE PREMIUM SEM SUPORTE</option>
                    <option value="SUPORTE" data-belongsto="2">SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL' data-belongsto="2">COLETOR DIXI FACIAL</option>
                    <option value='COLETOR DIXI FACIAL + SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE STANDARD' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE STANDARD</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE STANDARD SEM SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE STANDARD SEM SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE STANDARD + SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE STANDARD + SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE PREMIUM' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE PREMIUM</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE PREMIUM SEM SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE PREMIUM SEM SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE PREMIUM + SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE PREMIUM + SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO SEM SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO SEM SUPORTE</option>
                    <option value='COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO + SUPORTE' data-belongsto="2">COLETOR DIXI FACIAL + SOFTWARE CORPORATIVO + SUPORTE</option>
                    <option value='SOFTWARE CORPORATIVO + SUPORTE' data-belongsto="2">SOFTWARE CORPORATIVO + SUPORTE</option>
                    <option value='SOFTWARE CORPORATIVO SEM SUPORTE' data-belongsto="2">SOFTWARE CORPORATIVO SEM SUPORTE</option>
                    <option value='SUPORTE CORPORATIVO' data-belongsto="2">SUPORTE CORPORATIVO</option>
                    <option value='VIGIA BLUE' data-belongsto="2">VIGIA BLUE</option>
                    <option value='VIGIA PROX (L8)' data-belongsto="2">VIGIA PROX (L8)</option>
                </select>
            </div>
            <div class="col-md-2">
                <label>Preço Unitário:</label>
                <input type="text" name="preco[]" id="preco" class="form-control real" required />
            </div>
            <div class="col-md-1">
                <label>Qtde:</label>
                <input type="text" name="qtde[]" id="qtde" class="form-control" required />
            </div>
        </div>


        <div class="row mb-3">
            <div class="col-md-3">
                <label>Preço Total:</label>
                <input type="text" name="precototal[]" id="precototal" class="form-control real" required />
            </div>
            <div class="col-md-2">
                <label>Funcionários:</label>
                <input type="text" name="nfuncionarios[]" id="nfuncionarios" class="form-control" required />
            </div>
            <div class="col-md-3">
                <label>Forma Pagamento:</label>
                <input type="text" name="forma_pgto[]" id="forma_pgto" class="form-control" required />
            </div>
            <div class="col-md-2">
                <label>Venc. do 1º boleto</label>
                <input type="date" name="venc_1_boleto[]" id="venc_1_boleto" class="form-control" required />
            </div>
            <div class="col-md-2">
                <label>Pagamento</label>
                <select class="form-control" name="pagamentotipo[]" id="pagamentotipo">
                    <option></option>
                    <option value="anual">Anual</option>
                    <option value="mensal">Mensal</option>
                </select>
            </div>
        </div>

        <div class="row mb-3" data-belongsto="1">
            <div class="col-md-3">
                <label>Software:</label>
                <select class="form-control" id="sofware" name="sofware[]">
                    <option></option>
                    <option value="Com Sofware">Com Sofware</option>
                    <option value="Sem Sofware">Sem Sofware</option>
                </select>
            </div>
        </div>

        <div class="row mb-3" data-belongsto="2">
            <div class="col-md-3">
                <label>Valor Mensal:</label>
                <input type="text" name="valor_mensal[]" id="valor_mensal" class="form-control real" />
            </div>
            <div class="col-md-3">
                <label>Duração</label>
                <select class="form-control" name="duracao[]" id="duracao">
                    <option></option>
                    <option value="12 meses">12 meses</option>
                    <option value="36 meses">36 meses</option>
                </select>
            </div>
            <div class="col-md-6">
                <div class="leadVigencia">
                    <div class="row">
                        <div class="col-md-6">
                            <label>Vigência (Início)</label>
                            <input type="date" name="vigenciaIn[]" id="vigenciaIn" class="form-control" />
                        </div>
                        <div class="col-md-6">
                            <label>Vigência (Fim)</label>
                            <input type="date" name="vigenciaOut[]" id="vigenciaOut" class="form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" name="chaveB[]" id="chaveB" class="form-control" value="<?php echo $chave; ?>" />
        </div>
        <button class="btn btn-danger remove-block" disabled>Remover</button>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", () => {
        const elementsRef = document.querySelectorAll("[data-belongsto]");

        elementsRef.forEach(function(el) {
            el.style.display = "none"
        })


        const categoria = document.querySelector("#categoria");
        categoria.addEventListener("input", (e) => {
            e.preventDefault();

            if (categoria.value == "Venda") {
                console.log(categoria.value);
                elementsRef.forEach(function(el) {
                    const elementValue = el.getAttribute('data-belongsto');
                    if (elementValue == 1) {
                        el.style.display = "flex"
                    } else {
                        el.style.display = "none"
                    }
                })
            }

            if (categoria.value == "Contrato") {
                console.log(categoria.value);
                elementsRef.forEach(function(el) {
                    const elementValue = el.getAttribute('data-belongsto');
                    if (elementValue == 2) {
                        el.style.display = "flex"
                    } else {
                        el.style.display = "none"
                    }
                })
            }
        })
    })
</script>