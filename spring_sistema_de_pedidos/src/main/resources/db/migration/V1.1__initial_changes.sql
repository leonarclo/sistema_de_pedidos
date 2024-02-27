

-- ALTER TABLE for co_acesso table
ALTER TABLE co_acesso 
    MODIFY COLUMN password VARCHAR(100) NOT NULL,
    MODIFY nivelVenda INT DEFAULT 0,
    MODIFY nivelServico INT DEFAULT 0,
    MODIFY imagem VARCHAR(200) NULL,
    MODIFY fator INT DEFAULT 0,
    DROP COLUMN IF EXISTS chaveA,
    DROP COLUMN IF EXISTS cadastro,
    DROP COLUMN IF EXISTS data_insercao,
    DROP COLUMN IF EXISTS resp_insercao;


-- ALTER TABLE for co_itens table
ALTER TABLE co_itens
    MODIFY nfuncionarios VARCHAR(30) NULL,
    MODIFY valor_mensal VARCHAR(20) NULL,
    MODIFY duracao VARCHAR(20) NULL,
    MODIFY vigenciaIn VARCHAR(20) NULL,
    MODIFY vigenciaOut VARCHAR(20) NULL,
    DROP COLUMN IF EXISTS obs;


-- ALTER TABLE for co_pedidos table
ALTER TABLE co_pedidos
    DROP COLUMN IF EXISTS contato,
    DROP COLUMN IF EXISTS razao_social,
    MODIFY fone1 VARCHAR(20),    
    MODIFY fone2 VARCHAR(20) NULL,
    MODIFY bairro VARCHAR(100),
    MODIFY complemento VARCHAR(100) NULL,
    MODIFY transportadora VARCHAR(50) NULL,
    MODIFY frete VARCHAR(30) NULL,
    DROP COLUMN IF EXISTS categoria,
    DROP COLUMN IF EXISTS produto,
    DROP COLUMN IF EXISTS preco,
    DROP COLUMN IF EXISTS qtde,
    DROP COLUMN IF EXISTS precototal,
    DROP COLUMN IF EXISTS nfuncionarios,
    DROP COLUMN IF EXISTS valor_mensal,
    DROP COLUMN IF EXISTS forma_pgto,
    DROP COLUMN IF EXISTS venc_1_boleto,
    DROP COLUMN IF EXISTS pagamentotipo,
    DROP COLUMN IF EXISTS duracao,
    DROP COLUMN IF EXISTS vigenciaIn,
    DROP COLUMN IF EXISTS vigenciaOut,
    MODIFY planilhavendas VARCHAR(5) DEFAULT '0',
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
    