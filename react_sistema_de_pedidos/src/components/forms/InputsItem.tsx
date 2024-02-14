/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  produtoContratoOptions,
  produtoVendaOptions,
} from "@/constants/produtosOptions";
import { InputBRL } from "../ui/input-brl";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useAppSelector } from "@/redux/store";
import { useFieldArray, useFormContext } from "react-hook-form";
import moment from "moment";
import { IItemPedido } from "@/types";

function InputsItem() {
  const form = useFormContext();
  const itens = useAppSelector((state) => state.itensPedidoState.itens);
  const editando = useAppSelector((state) => state.modalState.modals["edit"]);

  const { fields, append, remove } = useFieldArray({
    name: "itens",
  });

  useEffect(() => {
    if (itens && itens.length < 1) append({});
  }, [append, itens, itens.length]);

  useEffect(() => {
    fields.forEach((_, index) => {
      const precoUnitario = form.watch(`itens.${index}.preco`);
      const quantidade = form.watch(`itens.${index}.quantidade`);

      if (precoUnitario && quantidade) {
        const precoUnitarioFloat = parseFloat(
          precoUnitario.replace(/[^\d,-]/g, "").replace(",", ".")
        );
        const total = precoUnitarioFloat * quantidade;

        form.setValue(`itens.${index}.precoTotal`, total.toFixed(2).toString());
      }
    });
  }, [fields, form]);

  useEffect(() => {
    if (editando) {
      itens.forEach((item: any, index: number) => {
        Object.keys(item).forEach((key) => {
          const typedKey = key as keyof IItemPedido;
          form.setValue(`itens.${index}.${typedKey}`, item[key]);
        });
      });
    }
  }, [itens, editando]);

  return (
    <div>
      {itens.length < 1 && (
        <div>
          <div className="flex items-center justify-end p-2">
            <Button className="border" onClick={() => append({})}>
              Adicionar Item
            </Button>
          </div>
        </div>
      )}
      {editando &&
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
                      {form.watch(`categoria-${index}`) === "Venda" ? (
                        <>
                          {produtoVendaOptions.map((status) => (
                            <SelectItem key={status.name} value={status.name}>
                              {status.name}
                            </SelectItem>
                          ))}
                          {itens.map((item, index) => {
                            if (
                              !produtoVendaOptions.some(
                                (status) => status.name === item.produto
                              )
                            ) {
                              return (
                                <SelectItem
                                  key={`custom-venda--${index}`}
                                  value={item.produto}
                                >
                                  {item.produto}
                                </SelectItem>
                              );
                            }
                            return null;
                          })}
                        </>
                      ) : (
                        <>
                          {produtoContratoOptions.map((status) => (
                            <SelectItem key={status.name} value={status.name}>
                              {status.name}
                            </SelectItem>
                          ))}
                          {itens.map((item, index) => {
                            if (
                              !produtoContratoOptions.some(
                                (status) => status.name === item.produto
                              )
                            ) {
                              return (
                                <SelectItem
                                  key={`custom-categoria--${index}`}
                                  value={item.produto}
                                >
                                  {item.produto}
                                </SelectItem>
                              );
                            }
                            return null;
                          })}
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
                    <Input type="number" {...field} />
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
                    <InputBRL {...field} readOnly={true} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`itens.${index}.vencimento1Boleto`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="pb-[6px]">
                    Vencimento do 1 Boleto
                  </FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            moment(field.value).format("YYYY-MM-DD")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                            {produtoVendaOptions.map((status) => (
                              <SelectItem key={status.name} value={status.name}>
                                {status.name}
                              </SelectItem>
                            ))}
                          </>
                        ) : (
                          <>
                            {produtoContratoOptions.map((status) => (
                              <SelectItem key={status.name} value={status.name}>
                                {status.name}
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
                      <Input type="number" {...field} />
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
                      <InputBRL {...field} readOnly={true} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`itens.${index}.vencimento1Boleto`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pb-[6px]">
                      Vencimento do 1 Boleto
                    </FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("YYYY-MM-DD")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
              {form.watch(`itens.${index}.categoria`) === "Venda" && (
                <>
                  <FormField
                    control={form.control}
                    name={`itens.${index}.software`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Software</FormLabel>
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
                            <SelectItem value="Com Sofware">
                              Com Sofware
                            </SelectItem>
                            <SelectItem value="Sem Sofware">
                              Sem Sofware
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {form.watch(`itens.${index}.categoria`) === "Contrato" && (
                <>
                  <FormField
                    control={form.control}
                    name={`itens.${index}.valorMensal`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Mensal (R$)</FormLabel>
                        <FormControl className="rounded">
                          <InputBRL {...field} />
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
                      <FormItem className="flex flex-col">
                        <FormLabel className="pb-[6px]">
                          Vigência (Início)
                        </FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format("YYYY-MM-DD")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`itens.${index}.vigenciaFim`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="pb-[6px]">
                          Vigência (Fim)
                        </FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format("YYYY-MM-DD")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              locale={ptBR}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex items-center justify-end p-2">
                <Button className="border" onClick={() => remove(index)}>
                  Remover Item
                </Button>
              </div>
            </div>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default InputsItem;
