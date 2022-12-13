import { Logger } from '@nestjs/common';
import { TipoAmortizacion } from '../../catalogo-microservice-conecction/domain/amortizaciones';
import { BmgEncomienda } from '../../catalogo-microservice-conecction/domain/bmg-encomienda';
import { Calendario } from '../../catalogo-microservice-conecction/domain/calendario';
import { Cliente } from '../../catalogo-microservice-conecction/domain/cliente';
import { TipoCotizacion } from '../../catalogo-microservice-conecction/domain/cotizaciones';
import { ParametrosCartera } from '../../catalogo-microservice-conecction/domain/parametros-cartera';
import { TasasLider } from '../../catalogo-microservice-conecction/domain/tasas-lider';
import { Order } from '../../commons/constants';
import { QueryParams } from '../../commons/dtos/query-params';
import { Wrapper } from '../../commons/dtos/wrapper';
import { RepositoryMessages } from '../../commons/services/base-repository.messagess';

export class CatalogoServiceMock {
  public static payloadBmgEncomienda: BmgEncomienda[] = [
    {
      fnencomienda: 1,
      fcnombre: 'BANRURAL Mandato',
      fcbasefisica: 'siac',
      fcservicio: 'cartera1',
      fccvegv: 'BRN',
      fcnombre2: 'BANCO NACIONAL DE CREDITO RURAL S.N.C.',
    },
  ] as BmgEncomienda[];

  async updateCalendario(calendario: Calendario): Promise<Wrapper<Calendario>> {
    Logger.debug("Test: Calendario encomienda '" + calendario.fnencomienda);
    return Promise.resolve(
      new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        calendario,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCalendariosAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<Calendario>> {
    return Promise.resolve(
      new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new Calendario(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCalendariosById(id: string): Promise<Wrapper<Calendario>> {
    return Promise.resolve(
      new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          fnencomienda: +id,
          fdfechahoy: new Date('28/07/2022'),
          fcfechahoyinput: '28/07/2022',
          fcnombredia: 'jueves',
          fcdia: '27',
          fdfechatemp: new Date('28/07/2022'),
          fnnrotrimestre: 1,
          fdproximafecha: new Date('29/07/2022'),
          fdfechaanterior: new Date('27/07/2022'),
          fdprihabmes: new Date('28/07/2022'),
          fdulthabmes: new Date('28/07/2022'),
          fdpridiames: new Date('28/07/2022'),
          fdultdiames: new Date('28/07/2022'),
          fdpridiatri: new Date('28/07/2022'),
          fdprihabtri: new Date('28/07/2022'),
          fdultdiatri: new Date('28/07/2022'),
          fnmesinictri: 1,
          fdulthabtri: new Date('28/07/2022'),
          fndiadesem: 5,
          fnmesdesem: 6,
          fnanodesem: 7,
          fncentdesem: 4,
          fnmesdesemnrco: 3,
          fnc: 2,
          fcz: 'test',
          fndiadelasemana: 1,
          fdultdiamesant: new Date('28/07/2022'),
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCalendariosByEncomiendaId(
    fnencomienda: number,
  ): Promise<Wrapper<Calendario>> {
    return Promise.resolve(
      new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          fnencomienda: fnencomienda,
          fdfechahoy: new Date('28/07/2022'),
          fcfechahoyinput: '28/07/2022',
          fcnombredia: 'jueves',
          fcdia: '27',
          fdfechatemp: new Date('28/07/2022'),
          fnnrotrimestre: 1,
          fdproximafecha: new Date('29/07/2022'),
          fdfechaanterior: new Date('27/07/2022'),
          fdprihabmes: new Date('28/07/2022'),
          fdulthabmes: new Date('28/07/2022'),
          fdpridiames: new Date('28/07/2022'),
          fdultdiames: new Date('28/07/2022'),
          fdpridiatri: new Date('28/07/2022'),
          fdprihabtri: new Date('28/07/2022'),
          fdultdiatri: new Date('28/07/2022'),
          fnmesinictri: 1,
          fdulthabtri: new Date('28/07/2022'),
          fndiadesem: 5,
          fnmesdesem: 6,
          fnanodesem: 7,
          fncentdesem: 4,
          fnmesdesemnrco: 3,
          fnc: 2,
          fcz: 'test',
          fndiadelasemana: 1,
          fdultdiamesant: new Date('28/07/2022'),
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getEncomiendasAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<BmgEncomienda>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        CatalogoServiceMock.payloadBmgEncomienda,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoPrograma(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<BmgEncomienda>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCata(
  ): Promise<Wrapper<any>> {
    return Promise.resolve(
      new Wrapper<any>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async sinRegistrosEncomienda(
  ): Promise<Wrapper<BmgEncomienda>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  // eslint-disable-next-line
  async getEncomiendasById(id: string): Promise<Wrapper<BmgEncomienda>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new BmgEncomienda(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getParametrosCarteraAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<ParametrosCartera>> {
    return Promise.resolve(
      new Wrapper<ParametrosCartera>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new ParametrosCartera(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getParametrosCarteraById(
    // eslint-disable-next-line
    id: number,
  ): Promise<Wrapper<ParametrosCartera>> {
    return Promise.resolve(
      new Wrapper<ParametrosCartera>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new ParametrosCartera(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTasasLiderAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<TasasLider>> {
    return Promise.resolve(
      new Wrapper<TasasLider>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new TasasLider(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTasasLiderById(
    fnencomienda: number,
    fntasalider: number,
    fntipoplazo: number,
  ): Promise<Wrapper<TasasLider>> {
    return Promise.resolve(
      new Wrapper<TasasLider>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          fnencomienda: fnencomienda,
          fntasalider: fntasalider,
          fntipoplazo: fntipoplazo,
          fnplazo: 1,
          fndia: 1,
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoAmortizacionAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoAmortizacion>> {
    return Promise.resolve(
      new Wrapper<TipoAmortizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new TipoAmortizacion(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoAmortizacionById(
    id: number,
  ): Promise<Wrapper<TipoAmortizacion>> {
    return Promise.resolve(
      new Wrapper<TipoAmortizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          fntipoamortizacion: id,
          fcdescripcion: 'test amortizacion',
          fnperiodoanual: 1,
          fcabreviatura: '1',
          fntipoperiodo: 1,
          fnperiodo: 1,
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoCotizacionAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoCotizacion>> {
    return Promise.resolve(
      new Wrapper<TipoCotizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new TipoCotizacion(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoCotizacionById(
    fnmoneda: number,
    fdfechacotizacion: Date,
    fncotizacioncompra: number,
    fncotizacionventa: number,
  ): Promise<Wrapper<TipoCotizacion>> {
    return Promise.resolve(
      new Wrapper<TipoCotizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          fnmoneda: fnmoneda,
          fdfechacotizacion: fdfechacotizacion,
          fncotizacioncompra: fncotizacioncompra,
          fncotizacionventa: fncotizacionventa,
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
  // eslint-disable-next-line
  async getClienteAll(queryParams: QueryParams): Promise<Wrapper<Cliente>> {
    return Promise.resolve(
      new Wrapper<Cliente>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new Cliente(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getClienteById(
    // eslint-disable-next-line
    fnencomienda: number,
    // eslint-disable-next-line
    fnbanco: number,
    // eslint-disable-next-line
  // eslint-disable-next-line
    fncliente: string,
  ): Promise<Wrapper<Cliente>> {
    return Promise.resolve(
      new Wrapper<Cliente>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new Cliente(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
  // eslint-disable-next-line
  async getAll(queryParams: QueryParams): Promise<Wrapper<BmgEncomienda>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        new BmgEncomienda(),
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
}
