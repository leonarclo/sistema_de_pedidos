<style>
    .modal-dialog {
        min-width: 80vw !important;
    }

    #novo-pedido-form input,
    #novo-pedido-form select {
        padding: 5px !important;
    }
</style>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#novo-pedido-modal">+ Novo Pedido</button>

<div id="novo-pedido-modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-labelledby="novo-pedido-modal-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
        <form id="novo-pedido-form">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-md-11">
                        <h4 class="modal-title cabecalho">Novo Pedido</h4>
                    </div>
                    <div class="col-md-1 text-end px-2">
                        <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="row mb-3">
                        <input type="hidden" name="consultor" id="consultor" class="form-control" value="<?php echo $_SESSION['username']; ?>" />
                        <input type="hidden" name="chave" id="chave" class="form-control" value="<?php echo $chave; ?>" />
                        <input type="hidden" name="data" id="data" class="form-control" value="<?php echo date("Y-m-d H:i:s") ?>" />
                        <div class="col-md-3">
                            <label>Status:</label>
                            <?php include(__DIR__ . "/partials/status_options.php") ?>
                        </div>
                        <div class="col-md-5">
                            <div class="leadField">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Data do lead</label>
                                        <input type="date" name="lead-data" id="lead-data" class="form-control" required />
                                    </div>

                                    <div class="col-md-6">
                                        <label>Origem do lead</label>
                                        <input type="text" name="lead-origem" id="lead-origem" class="form-control" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label>Cargo:</label>
                            <select class="form-control" id="cargo" name="cargo" required>
                                <option hidden disabled selected value>Selecione...</option>
                                <option value="Dono">Dono</option>
                                <option value="Diretor de RH">Diretor de RH</option>
                                <option value="Compras">Compras</option>
                                <option value="Financeiro">Financeiro</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <label>Empresa:</label>
                            <input type="text" name="empresa" id="empresa" class="form-control" onkeyup="this.value = this.value.toUpperCase()" required />
                        </div>
                        <div class="col-md-2">
                            <label>CNPJ:</label>
                            <input type="text" name="cnpj" id="cnpj" class="form-control" onkeyup="this.value = mCNPJ(this.value)" maxlength="18" required />
                        </div>
                        <div class="col-md-2">
                            <label>Nome (Cliente):</label>
                            <input type="text" name="responsavel_nome" id="responsavel_nome" class="form-control" required />
                        </div>
                        <div class="col-md-2">
                            <label>CPF (Cliente):</label>
                            <input type="text" name="responsavel_cpf" id="responsavel_cpf" class="form-control" onkeyup="this.value = mCPF(this.value)" maxlength="14" required />
                        </div>
                        <div class="col-md-3">
                            <label>E-mail</label>
                            <input type="email" name="email" id="email" class="form-control" onkeyup="this.value = this.value.toLowerCase()" required />
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-2">
                            <label>Telefone 1:</label>
                            <input type="text" name="fone1" id="fone1" class="form-control" onkeyup="this.value = mTel(this.value)" maxlength="15" required />
                        </div>

                        <div class="col-md-2">
                            <label>Telefone 2:</label>
                            <input type="text" name="fone2" id="fone2" class="form-control" onkeyup="this.value = mTel(this.value)" maxlength="15" required />
                        </div>

                        <div class="col-md-4 leadField">
                            <div class="row ">
                                <div class="col-md-4">
                                    <label>Frete:</label>
                                    <input type="text" name="frete" id="frete" class="form-control real" required />
                                </div>
                                <div class="col-md-8">
                                    <label>Transportadora:</label>
                                    <input type="text" name="transportadora" id="transportadora" class="form-control" required />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 " style="background-color: #4aaadc63; padding: 0 10px 10px 10px;">
                            <label class="fw-bold">Email Login (Sistema ponto):</label>
                            <input type="email" name="email_login" id="email_login" class="form-control" />
                        </div>

                    </div>
                    <br>
                    <p class="error-message m-0 p-0"></p>
                    <div class="row">
                        <div class="col-md-1">
                            <label>CEP:</label>
                            <input type="text" name="cep" id="cep" class="form-control" maxlength="10" onblur="cepApi()" onkeyup="this.value = mCEP(this.value)" required />
                        </div>
                        <div class="col-md-2">
                            <label>Logradouro:</label>
                            <input type="text" name="rua" id="rua" class="form-control" required />
                        </div>
                        <div class="col-md-1">
                            <label>Número:</label>
                            <input type="text" name="numero" id="numero" class="form-control" required />
                        </div>
                        <div class="col-md-2">
                            <label>Complemento:</label>
                            <input type="text" name="complemento" id="complemento" class="form-control" />
                        </div>

                        <div class="col-md-2">
                            <label>Bairro:</label>
                            <input type="text" name="bairro" id="bairro" class="form-control" required />
                        </div>

                        <div class="col-md-3">
                            <label>Cidade:</label>
                            <input type="text" name="cidade" id="cidade" class="form-control" required />
                        </div>

                        <div class="col-md-1">
                            <div class="form-group">
                                <label>UF:</label>
                                <select class="form-control" name="uf" id="uf" required>
                                    <option hidden disabled selected value>Selecione...</option>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr>

                    <?php include(__DIR__ . '/partials/produtos_options.php') ?>

                    <script>
                        const itemContainer = document.getElementById('item-container');

                        function adicionarNovoItem() {
                            const itemBlock = document.querySelector('.item-block');
                            const newItemBlock = itemBlock.cloneNode(true);
                            itemContainer.appendChild(newItemBlock);
                            updateRemoveButtonState();
                        }

                        document.addEventListener('click', function(e) {
                            if (e.target && e.target.classList.contains('remove-block')) {
                                const itemBlock = e.target.closest('.item-block');
                                if (itemContainer.children.length > 1) {
                                    itemBlock.remove();
                                }
                                updateRemoveButtonState();
                            }
                        });

                        function updateRemoveButtonState() {
                            const btnRemove = document.querySelectorAll('.remove-block');

                            if (itemContainer.children.length >= 3) {
                                btnRemove.forEach(function(button) {
                                    button.removeAttribute('disabled');
                                });
                            } else {
                                btnRemove.forEach(function(button) {
                                    button.setAttribute('disabled', 'disabled');
                                });
                            }
                        }
                    </script>

                    <hr>

                    <div class="row">
                        <div class="col-md-4 ml-2">
                            <div id="arquivo-anexo">
                                <div class="rowX">
                                    <label>Adicionar Arquivo(s):</label>
                                    <input type="file" name="arquivos[]" id="arquivos" multiple accept="image/*,.pdf" />
                                </div>
                            </div>
                            <hr>
                            <script>
                                const fileInput = document.querySelector("#arquivos");
                                fileInput.addEventListener("change", function(e) {
                                    e.preventDefault();
                                    const files = event.target.files;
                                    console.log(files);
                                }, false)
                            </script>
                        </div>
                    </div>

                    <hr>
                    <!-- observações -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <label>Observações:</label>
                            </div>
                            <textarea class="form-control" id="obs" name="obs" rows="8"></textarea>
                        </div>
                        <div class="col-md-6">
                            <!-- itens -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <input type="hidden" name="usuario_id" id="usuario_id" />
                    <input type="hidden" name="operacao" id="operacao" />
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
    // CEP 
    const cepInput = document.querySelector("#cep");
    const bairroInput = document.querySelector("#bairro");
    const cidadeInput = document.querySelector("#cidade");
    const logradouroInput = document.querySelector("#rua");
    const ufInput = document.querySelector("#uf");
    const errorMessage = document.querySelector(".error-message");
    const btnClose = document.querySelector(".btn-close");

    const cepApi = async () => {
        const cep = cepInput.value;
        if (cep.length == 10) {
            try {
                const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    bairroInput.value = data.neighborhood;
                    cidadeInput.value = data.city;
                    ufInput.value = data.state;
                    logradouroInput.value = data.street;
                    errorMessage.textContent = "";
                } else if (response.status === 404) {
                    errorMessage.textContent = "CEP não encontrado!";
                } else {
                    errorMessage.textContent = "Erro desconhecido no serviço de CEP.";
                }
            } catch (error) {
                errorMessage.textContent = "Erro na consulta de CEP: " + error;
            }
        } else if (cep.length === 0) {
            errorMessage.textContent = "";
        } else if (cep.length != 8) {
            errorMessage.textContent = "O CEP precisa conter 8 números.";
        }
    };

    btnClose.addEventListener("click", () => {
        errorMessage.textContent = "";
    })
</script>

<script></script>

<script type="text/javascript">
    $(function() {
        var divContent = $('#produtosEnter');
        var botaoAdicionar = $('a[data-id="1"]');
        var numero = 1;

        //Ao clicar em adicionar ele cria uma linha com novos campos
        $(botaoAdicionar).click(function() {
            var newId = 2 + $('.conteudoIndividual').length;
            var linha = $(`<div class="fundoCinza conteudoIndividual">
														<br>
														<hr>
														<div class="col-md-12">
															<?php
                                                            include('select_pedidos.php');
                                                            ?>
														</div>
														<a href="#" id="linkRemover">
														<button type="button" class="btn btn-danger">remover este item</button>
														</a>
													</div>`).appendTo(divContent);

            $('#removehidden').remove();

            $('<input type="hidden" name="quantidadeCampos" value="' + <?php echo $i ?> + '" id="removehidden">').appendTo(divContent);
            linha.find("a").on("click", function() {
                $(this).parent(".conteudoIndividual").remove();
                // i--;
            });

            var valorX = numero++;

            // alert(i);

            $(".filterSelect" + valorX).filterSelect();


            $(".real").maskMoney({
                thousands: '.',
                decimal: ','
            })


            function esconderCampos() {
                let campo = $("#categoria" + valorX).val();
                let colValorMensal = $("#valor_mensal" + valorX).closest('.col-md-3');
                let colVigencia = $("#vigenciaIn" + valorX).closest('.leadVigencia');
                let colSoftware = $("#sofware" + valorX).closest('.col-md-3');
                let colDuracao = $("#duracao" + valorX).closest('.col-md-4');

                if (campo != "Contrato") {
                    $(colDuracao).hide();
                    $(colVigencia).hide();
                    $(colValorMensal).hide();

                    $("#vigenciaIn" + valorX).removeAttr("required").hide();
                    $("#vigenciaOut" + valorX).removeAttr("required").hide();
                    $("#valor_mensal" + valorX).removeAttr("required").hide();
                    $("#duracao" + valorX).removeAttr("required");


                } else {

                    $(colDuracao).show();
                    $(colVigencia).show();
                    $(colValorMensal).show();

                    $("#vigenciaIn" + valorX).show().attr("required", "req");
                    $("#vigenciaOut" + valorX).show().attr("required", "req");
                    $("#valor_mensal" + valorX).show().attr("required", "req");
                    $("#duracao" + valorX).show().attr("required", "req");

                }

                if (campo == "Venda") {
                    $(colSoftware).show();
                    $("#sofware" + valorX).show().attr("required", "req");

                } else {

                    $(colSoftware).hide();
                    $("#sofware" + valorX).removeAttr("required");
                }

            }


            function calculoPrecoTotal() {
                let preco = $('#preco' + valorX).maskMoney('unmasked')[0]
                let qtde = parseFloat($('#qtde' + valorX).val())
                if (!isNaN(preco) && !isNaN(qtde)) {
                    $('#precototal' + valorX).val((preco * qtde).toLocaleString('pt-BR', format))
                }
            }
            $(document).on('keyup', '#preco' + valorX, calculoPrecoTotal)
            $(document).on('keyup', '#qtde' + valorX, calculoPrecoTotal)
            $(document).on('keyup', '#valor_mensal' + valorX, calculoPrecoTotal)
            $(document).on('click', '#categoria' + valorX, calculoPrecoTotal) //ver depois 
            $(document).on('click', '#categoria' + valorX, esconderCampos)


        });
    });
</script>

<!-- Filter Select ===================== -->
<script type="text/javascript">
    $('.filterSelect').filterSelect();
</script>


<!-- Mascara Moeda ===================== -->

<script type="text/javascript">
    $(".real").maskMoney({
        thousands: '.',
        decimal: ','
    })

    const format = {
        minimumFractionDigits: 2,
        currency: 'BRL'
    }

    function calculoPrecoTotal() {
        let preco = $('#preco').maskMoney('unmasked')[0]
        let qtde = parseFloat($('#qtde').val())
        if (!isNaN(preco) && !isNaN(qtde)) {
            $('#precototal').val((preco * qtde).toLocaleString('pt-BR', format))
        }
    }

    function esconderCampos() {
        let campo = $("#categoria").val();
        let colValorMensal = $("#valor_mensal").closest('.col-md-3');
        let colVigencia = $("#vigenciaIn").closest('.leadVigencia');
        let colSoftware = $("#sofware").closest('.col-md-3');
        let colDuracao = $("#duracao").closest('.col-md-4');

        if (campo != "Contrato") {

            $(colDuracao).hide();
            $(colVigencia).hide();
            $(colValorMensal).hide();

            $("#vigenciaIn").removeAttr("required").hide();
            $("#vigenciaOut").removeAttr("required").hide();
            $("#valor_mensal").removeAttr("required").hide();
            $("#duracao").removeAttr("required");

        } else {

            $(colDuracao).show();
            $(colVigencia).show();
            $(colValorMensal).show();

            $("#vigenciaIn").show().attr("required", "req");
            $("#vigenciaOut").show().attr("required", "req");
            $("#valor_mensal").show().attr("required", "req");
            $("#duracao").show().attr("required", "req");

        }

        if (campo == "Venda") {

            $(colSoftware).show();
            $("#sofware").show().attr("required", "req");

        } else {

            $(colSoftware).hide();
            $("#sofware").removeAttr("required").hide();;

        }
    }

    $(document).on('keyup', '#preco', calculoPrecoTotal)
    $(document).on('keyup', '#qtde', calculoPrecoTotal)
    $(document).on('keyup', '#valor_mensal', calculoPrecoTotal)
    $(document).on('keyup', '#frete', calculoPrecoTotal)
    $(document).on('keyup', '.real', calculoPrecoTotal)
    $(document).on('click', '#categoria', esconderCampos)
</script>

<script type="text/javascript">
    const input = document.getElementById('transportadora');

    input.addEventListener('input', function() {
        const valor = this.value;

        // Define a expressão regular para verificar caracteres repetidos consecutivos
        const regex = /(.)\1{2,}/; // Verifica se há 3 ou mais caracteres repetidos

        if (regex.test(valor)) {
            this.setCustomValidity('preencha corretamente, leve a sério o trabalho!');
        } else {
            this.setCustomValidity('');
        }
    });


    const inputs = document.querySelectorAll('.dontRepeat');

    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const valor = this.value;

            const regex = /(.)\1{2,}/;

            if (regex.test(valor)) {
                this.setCustomValidity('preenchimento incorreto.');
            } else {
                this.setCustomValidity('');
            }
        });
    });
</script>