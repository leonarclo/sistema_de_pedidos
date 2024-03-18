UPDATE co_itens SET co_itens.pedido_id = (SELECT co_pedidos.id FROM co_pedidos WHERE co_pedidos.chave = co_itens.chaveB);

UPDATE co_arquivos SET co_arquivos.pedido_id = (SELECT co_pedidos.id FROM co_pedidos WHERE co_pedidos.chave = co_arquivos.chaveC);

UPDATE co_pedidos SET co_pedidos.created_by = (SELECT co_acesso.id FROM co_acesso WHERE co_acesso.username = co_pedidos.consultor);