import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { QueryParams } from '../../commons/dtos/query-params';
import { Wrapper } from '../../commons/dtos/wrapper';
import { BmgEncomienda } from '../../catalogo-microservice-conecction/domain/bmg-encomienda';
import { Calendario } from '../domain/calendario';
import { ParametrosCartera } from '../domain/parametros-cartera';
import { TasasLider } from '../domain/tasas-lider';
import { TipoAmortizacion } from '../domain/amortizaciones';
import { TipoCotizacion } from '../domain/cotizaciones';
import { Cliente } from '../domain/cliente';
import { HttpService } from '@nestjs/axios';
import { Order } from '../../commons/constants';
import { RepositoryMessages } from '../../commons/services/base-repository.messagess';

@Injectable()
export class CatalogoService {
  constructor(
    // private readonly clientProxy: ClientProxyIndep,
    private readonly httpService: HttpService,
  ) { }
  // private _clientProxyCatalogos = this.clientProxy.clientProxyCatalogos();

  private readonly CATALOGOS_URL =
    process.env.CATALOGOS_HOST || 'http://catalogosms:4000/api-cat/v1';

  //variable para el manejo del cache de calendarios
  // private calendariosCache: Calendario[] = [];
  private calendarioCache: Calendario;
  private encomiendaCache: BmgEncomienda;

  private encomiendaControllerName = 'bmg-encomienda';
  private calendarioControllerName = 'sci-calendario';
  private parametroCarteraControllerName = 'parametros-cartera';
  private tasaLiderControllerName = 'tasa-lideres';
  private tipoAmortizacionControllerName = 'tipo-amortizaciones';
  private cataControllerName = 'cata';
  private cotizacionControllerName = 'cotizaciones';
  private clientesControllerName = 'clientes';
  private tipoProgramaControllerName = 'tipo-programa';

  async updateCalendario(calendario: Calendario): Promise<Wrapper<Calendario>> {
    const id = calendario.fnencomienda;
    // Logger.debug('Enviando a guardar(hacia catalogos) calendario: ', calendario);
    const response = await this.httpService.axiosRef.patch(
      `${this.CATALOGOS_URL}/${this.calendarioControllerName}/${id}`,
      calendario,
    );
    return Promise.resolve(response.data as Wrapper<Calendario>);
  }

  async getCalendariosById(id: string): Promise<Wrapper<Calendario>> {
    //revisar en memoria local si los datos existen se retornan
    // if (
    //   this.calendarioCache.some(
    //     (calendario) => calendario.fnencomienda === Number(id),
    //   )
    // ) {
    if (
      this.calendarioCache &&
      this.calendarioCache.fnencomienda === Number(id)
    ) {
      return new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        this.calendarioCache,
        true,
        RepositoryMessages.GetSuccess,
        null,
      );
    }
    const response = (
      await this.httpService.axiosRef.get(
        `${this.CATALOGOS_URL}/sci-calendario/${id}/`,
      )
    ).data as Wrapper<Calendario>;
    this.calendarioCache = response.result as Calendario;
    // Logger.debug(response);
    return response;
  }

  async getEncomiendasAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<BmgEncomienda>> {
    return this.baseGetCatalogo(queryParams, this.encomiendaControllerName);
  }
  async getEncomiendasById(id: string): Promise<Wrapper<BmgEncomienda>> {
    if (
      this.encomiendaCache &&
      this.encomiendaCache.fnencomienda === Number(id)
    ) {
      return new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        this.encomiendaCache,
        true,
        RepositoryMessages.GetSuccess,
        null,
      );
    }
    const response = (
      await this.httpService.axiosRef.get(
        `${this.CATALOGOS_URL}/${this.encomiendaControllerName}/${id}/`,
      )
    ).data as Wrapper<BmgEncomienda>;
    this.encomiendaCache = response.result as BmgEncomienda;
    // Logger.debug(response);
    return response;
  }

  async getParametrosCarteraAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<ParametrosCartera>> {
    return this.baseGetCatalogo(
      queryParams,
      this.parametroCarteraControllerName,
    );
  }

  async getParametrosCarteraById(
    id: number,
  ): Promise<Wrapper<ParametrosCartera>> {
    const response = (
      await this.httpService.axiosRef.get(
        `${this.CATALOGOS_URL}/${this.parametroCarteraControllerName}/${id}/`,
      )
    ).data as Wrapper<ParametrosCartera>;
    return response;
  }

  ///

  async getTasasLiderAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<TasasLider>> {
    return this.baseGetCatalogo(queryParams, this.tasaLiderControllerName);
  }

  async getTipoAmortizacionAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoAmortizacion>> {
    return this.baseGetCatalogo(
      queryParams,
      this.tipoAmortizacionControllerName,
    );
  }

  async getTipoAmortizacionById(
    id: number,
  ): Promise<Wrapper<TipoAmortizacion>> {
    const response = (
      await this.httpService.axiosRef.get(
        `${this.CATALOGOS_URL}/${this.tipoAmortizacionControllerName}/${id}/`,
      )
    ).data as Wrapper<TipoAmortizacion>;
    return response;
  }
  ////

  async getTipoPrograma(queryParams: QueryParams):
    Promise<Wrapper<any>> {
    return this.baseGetCatalogo(queryParams, this.tipoProgramaControllerName);
  }

  async getCata(
    fcidecat: string,
  ): Promise<Wrapper<any>> {
    const response = (
      await this.httpService.axiosRef.get(
        `${this.CATALOGOS_URL}/${this.cataControllerName}/${fcidecat}/`,
      )
    ).data as Wrapper<any>;
    return response;
  }

  async getTipoCotizacionAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoCotizacion>> {
    return this.baseGetCatalogo(queryParams, this.cotizacionControllerName);
  }
  ////

  async getClienteAll(queryParams: QueryParams): Promise<Wrapper<Cliente>> {
    return this.baseGetCatalogo(queryParams, this.clientesControllerName);
  }

  async baseGetCatalogo(
    queryParams: QueryParams,
    controllerName: string,
  ): Promise<Wrapper<any>> {
    if (queryParams.take > 50) {
      Logger.error(
        `Error, se mando llamar ${queryParams.take} datos en queryParams.take en llamado de catalogos en controller "${controllerName}", que son mas de 50`,
      );
    }
    let url = `${this.CATALOGOS_URL}/${controllerName}?page=${queryParams.page
      }&take=${queryParams.take}&order=${queryParams.order.toString()}`;
    //si existe ordenamiento
    if (queryParams.orderColumn) {
      url += `&orderColumn=${queryParams.orderColumn}`;
    }
    //iterar por cada una de las propiedades de busqueda
    if (queryParams.filters) {
      queryParams.filters.forEach((filter, idx) => {
        url += `&filters[${idx}]=${JSON.stringify(filter)}`;
      });
    }

    const response = (await this.httpService.axiosRef.get(url))
      .data as Wrapper<ParametrosCartera>;
    // Logger.debug(response);
    return response;
  }
  //////////////VERSIONES CON RABITMQ//////////////////////////////// // async updateCalendario(calendario: Calendario): Promise<Wrapper<Calendario>> {
  //   Logger.debug(`Enviando a guardar calendario: ${calendario.fnencomienda}`);
  //   const id = calendario.fnencomienda;
  //   return this._clientProxyCatalogos
  //     .send(CatalogoMSGs.CALENDARIOS_SAVE, { id, calendario })
  //     .toPromise()
  //     .then((response) => response);
  // }
}
