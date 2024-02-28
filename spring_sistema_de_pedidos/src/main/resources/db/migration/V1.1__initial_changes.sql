START TRANSACTION;
-- ALTER TABLE for co_acesso table
ALTER TABLE co_acesso 
    MODIFY COLUMN password VARCHAR(100) NOT NULL,
    MODIFY imagem VARCHAR(200) NULL,
    DROP COLUMN nivelVenda,
    DROP COLUMN nivelServico,
    DROP COLUMN chaveA,
    DROP COLUMN cadastro,
    DROP COLUMN data_insercao,
    DROP COLUMN resp_insercao,
    MODIFY fator INT DEFAULT 0;

-- ALTER TABLE for co_itens table
ALTER TABLE co_itens
    MODIFY nfuncionarios VARCHAR(30) NULL,
    MODIFY valor_mensal VARCHAR(20) NULL,
    MODIFY duracao VARCHAR(20) NULL,
    MODIFY vigenciaIn VARCHAR(20) NULL,
    DROP COLUMN obs,
    MODIFY vigenciaOut VARCHAR(20) NULL;


-- ALTER TABLE for co_pedidos table
ALTER TABLE co_pedidos
    MODIFY fone1 VARCHAR(20),    
    MODIFY fone2 VARCHAR(20) NULL,
    MODIFY bairro VARCHAR(100),
    MODIFY complemento VARCHAR(100) NULL,
    MODIFY transportadora VARCHAR(50) NULL,
    MODIFY frete VARCHAR(30) NULL,
    DROP COLUMN contato,
    DROP COLUMN razao_social,
    DROP COLUMN categoria,
    DROP COLUMN produto,
    DROP COLUMN preco,
    DROP COLUMN qtde,
    DROP COLUMN precototal,
    DROP COLUMN nfuncionarios,
    DROP COLUMN valor_mensal,
    DROP COLUMN forma_pgto,
    DROP COLUMN venc_1_boleto,
    DROP COLUMN pagamentotipo,
    DROP COLUMN duracao,
    DROP COLUMN vigenciaIn,
    DROP COLUMN vigenciaOut,
    MODIFY planilhavendas VARCHAR(1) DEFAULT '0',
    MODIFY licencaGerada INT DEFAULT 0,
    MODIFY assinatura INT DEFAULT 0,
    MODIFY chat INT DEFAULT 0,
    MODIFY posVenda INT DEFAULT 0,
    MODIFY notaFiscal VARCHAR(30) NULL,
    MODIFY UnidadeNegocio VARCHAR(60) NULL,
    MODIFY PrevisaoEntrega VARCHAR(30) NULL,
    MODIFY NumeroSerie TEXT NULL,
    MODIFY codigoRastreio VARCHAR(20) NULL,
    MODIFY obs TEXT NULL,
    MODIFY emailLogin VARCHAR(100) NULL;
COMMIT;
