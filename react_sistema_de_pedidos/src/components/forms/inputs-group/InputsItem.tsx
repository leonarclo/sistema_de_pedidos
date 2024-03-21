/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { InputBRL } from "../../ui/input-brl";
import { Button } from "../../ui/button";
import { useAppSelector } from "@/redux/store";
import { useFieldArray, useFormContext } from "react-hook-form";
import moment from "moment";
import { useBuscarProdutosQuery } from "@/redux/api/pedidoApi";

function InputsItem() {
  const form = useFormContext();
  const itens = useAppSelector((state) => state.itensPedidoState.itens);
  const editando = useAppSelector((state) => state.modalState.modals["edit"]);

  const { fields, append, remove } = useFieldArray({
    name: "itens",
  });

  const { data: produtoList } = useBuscarProdutosQuery();

  useEffect(() => {
    if (itens && itens.length < 1) append({});
  }, [append, itens, itens.length]);

  useEffect(() => {
    itens.forEach((_, index) => {
      const precoUnitario = form.watch(`itens.${index}.preco`);
      const quantidade = form.watch(`itens.${index}.quantidade`);

      if (precoUnitario && quantidade) {
        const precoUnitarioFloat = parseFloat(
          precoUnitario.replace(/[^\d,-]/g, "").replace(",", ".")
        );
        const total = precoUnitarioFloat * quantidade;

        const formattedTotal = total
          .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          .replace("R$", "")
          .trim();
        form.setValue(`itens.${index}.precoTotal`, formattedTotal);
      }
    });
    fields.forEach((_, index) => {
      const precoUnitario = form.watch(`itens.${index}.preco`);
      const quantidade = form.watch(`itens.${index}.quantidade`);

      if (precoUnitario && quantidade) {
        const precoUnitarioFloat = parseFloat(
          precoUnitario.replace(/[^\d,-]/g, "").replace(",", ".")
        );
        const total = precoUnitarioFloat * quantidade;

        const formattedTotal = total
          .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
          .replace("R$", "")
          .trim();
        form.setValue(`itens.${index}.precoTotal`, formattedTotal);
      }
    });
  }, [fields, itens, form]);

  useEffect(() => {
    if (editando && itens) {
      itens.forEach((item: any, index: number) => {
        Object.keys(item).forEach((key) => {
          form.setValue(`itens.${index}.${key}`, item[key]);
        });
      });
    }
  }, [itens, editando]);

  return (
    <div>
      {itens.length < 1 ? (
        <div>
          <div className="flex items-center justify-end p-2">
            <Button
              className="border bg-blue-500 text-white hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                append({});
              }}
            >
              Adicionar Item
            </Button>
          </div>
        </div>
      ) : null}

      {editando &&
        produtoList &&
        itens.map((_, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-6 justify-start items-center pb-7"
          >
            <FormField
              control={form.control}
              name={`itens.${index}.categoria`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      form.setValue(`itens.${index}.produto`, null);
                      field.onChange(e);
                    }}
                  >
                    <FormControl className="rounded w-64">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white ">
                      <SelectItem value="Venda">Venda</SelectItem>
                      <SelectItem value="Contrato">Contrato</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.produto`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="rounded w-64">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    {form.getValues(`itens.${index}.categoria`) !== "Venda" && (
                      <SelectContent className="bg-white">
                        {produtoList
                          .filter((item) => item.categoria === 2)
                          .map((item) => {
                            return (
                              <SelectItem key={item.id} value={item.produto}>
                                {item.produto}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    )}
                    {form.getValues(`itens.${index}.categoria`) !=
                      "Contrato" && (
                      <SelectContent className="bg-white">
                        {produtoList
                          .filter((item) => item.categoria === 1)
                          .map((item) => (
                            <SelectItem key={item.id} value={item.produto}>
                              {item.produto}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.preco`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Unitário (R$)</FormLabel>
                  <FormControl className="rounded">
                    <InputBRL {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.quantidade`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl className="rounded">
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.precoTotal`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Total (R$)</FormLabel>
                  <FormControl className="rounded">
                    <InputBRL
                      {...field}
                      readOnly={true}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.formaPagamento`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <FormControl className="rounded">
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.vencimento1Boleto`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vencimento do 1 Boleto</FormLabel>
                  <FormControl className="rounded">
                    <Input
                      {...field}
                      value={
                        field.value
                          ? moment.utc(field.value).format("YYYY-MM-DD")
                          : "" || ""
                      }
                      type="date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              defaultValue="Aberta"
              control={form.control}
              name={`itens.${index}.tipoPagamento`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pagamento</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="rounded w-64">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white ">
                      <SelectItem value="mensal">mensal</SelectItem>
                      <SelectItem value="anual">anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch(`itens.${index}.categoria`) === "Contrato" && (
              <>
                <FormField
                  control={form.control}
                  name={`itens.${index}.valorMensal`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Mensal (R$)</FormLabel>
                      <FormControl className="rounded">
                        <InputBRL {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itens.${index}.duracaoContrato`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (Contrato)</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="rounded w-64">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white ">
                          <SelectItem value="12 meses">12 meses</SelectItem>
                          <SelectItem value="36 meses">36 meses</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itens.${index}.vigenciaInicio`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Vigência (Início)</FormLabel>
                      <FormControl className="rounded">
                        <Input
                          {...field}
                          value={
                            field.value
                              ? moment.utc(field.value).format("YYYY-MM-DD")
                              : "" || ""
                          }
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`itens.${index}.vigenciaFim`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Vigência (Fim)</FormLabel>
                      <FormControl className="rounded">
                        <Input
                          {...field}
                          value={
                            field.value
                              ? moment.utc(field.value).format("YYYY-MM-DD")
                              : "" || ""
                          }
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        ))}

      {itens.length < 1 &&
        fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex flex-wrap gap-6 justify-start items-center pb-7">
              <FormField
                control={form.control}
                name={`itens.${index}.categoria` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(e) => {
                        form.setValue(`itens.${index}.produto`, null);
                        field.onChange(e);
                      }}
                    >
                      <FormControl className="rounded w-64">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white ">
                        <SelectItem value="Venda">Venda</SelectItem>
                        <SelectItem value="Contrato">Contrato</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.produto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="rounded w-64">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {form.watch(`itens.${index}.categoria`) === "Venda" ? (
                          <>
                            {produtoList &&
                              produtoList
                                .filter((item) => item.categoria == 1)
                                .map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.produto}
                                  >
                                    {item.produto}
                                  </SelectItem>
                                ))}
                          </>
                        ) : (
                          <>
                            {produtoList &&
                              produtoList
                                .filter((item) => item.categoria == 2)
                                .map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.produto}
                                  >
                                    {item.produto}
                                  </SelectItem>
                                ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.preco`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Unitário (R$)</FormLabel>
                    <FormControl className="rounded">
                      <InputBRL {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.quantidade`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl className="rounded">
                      <Input
                        type="number"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.precoTotal`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Total (R$)</FormLabel>
                    <FormControl className="rounded">
                      <InputBRL
                        {...field}
                        readOnly={true}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.formaPagamento`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de Pagamento</FormLabel>
                    <FormControl className="rounded">
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.vencimento1Boleto`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vencimento do 1 Boleto</FormLabel>
                    <FormControl className="rounded">
                      <Input
                        {...field}
                        value={
                          field.value
                            ? moment.utc(field.value).format("YYYY-MM-DD")
                            : "" || ""
                        }
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.tipoPagamento`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pagamento</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="rounded w-64">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white ">
                        <SelectItem value="mensal">mensal</SelectItem>
                        <SelectItem value="anual">anual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch(`itens.${index}.categoria`) === "Contrato" && (
                <>
                  <FormField
                    control={form.control}
                    name={`itens.${index}.valorMensal`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Mensal (R$)</FormLabel>
                        <FormControl className="rounded">
                          <InputBRL {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itens.${index}.duracaoContrato`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração (Contrato)</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl className="rounded w-64">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white ">
                            <SelectItem value="12 meses">12 meses</SelectItem>
                            <SelectItem value="36 meses">36 meses</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itens.${index}.vigenciaInicio`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Vigência (Início)</FormLabel>
                        <FormControl className="rounded">
                          <Input
                            {...field}
                            value={
                              field.value
                                ? moment.utc(field.value).format("YYYY-MM-DD")
                                : "" || ""
                            }
                            type="date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itens.${index}.vigenciaFim`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Vigência (Fim)</FormLabel>
                        <FormControl className="rounded">
                          <Input
                            {...field}
                            value={
                              field.value
                                ? moment.utc(field.value).format("YYYY-MM-DD")
                                : "" || ""
                            }
                            type="date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex items-center justify-end p-2">
              <Button
                variant="ghost"
                size="sm"
                className=" bg-red-400 rounded text-white hover:text-white hover:bg-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
                disabled={fields.length < 2}
              >
                Remover Item
              </Button>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default InputsItem;
