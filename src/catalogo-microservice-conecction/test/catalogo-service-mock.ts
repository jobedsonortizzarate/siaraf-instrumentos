import { Logger } from '@nestjs/common';
import { Order } from 'src/commons/constants';
import { QueryParams } from 'src/commons/dtos/query-params';
import { Wrapper } from 'src/commons/dtos/wrapper';
import { RepositoryMessages } from 'src/commons/services/base-repository.messagess';
import { TipoAmortizacion } from '../domain/amortizaciones';
import { BmgEncomienda } from '../domain/bmg-encomienda';
import { Calendario } from '../domain/calendario';
import { Cliente } from '../domain/cliente';
import { TipoCotizacion } from '../domain/cotizaciones';
import { ParametrosCartera } from '../domain/parametros-cartera';
import { TasasLider } from '../domain/tasas-lider';

const calendarioMock: Calendario = {
  fnencomienda: 1,
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
};

const encomiendaMock: BmgEncomienda = {
  fnencomienda: 1,
  fcnombre: 'test',
  fcbasefisica: 'test',
  fcservicio: 'test',
  fccvegv: 'test',
  fcnombre2: 'test',
};

const parametrosCarteraMock: ParametrosCartera = {
  fnencomienda: 1,
  fnbanco: 100,
  fcnumerodisp: 'TEST',
  fnmesesdereut: 100,
  fcrecordcntl: 'TEST',
  fniva: 10,
  fntasadeimpuesto1: 10,
  fntasadeimpuesto2: 10,
  fcregion: 'TEST',
  fgcalintegrado: 10,
  fnminimoparacgo: 10,
  fntasabaseisrpf: 10,
  fntasabaseisrpm: 10,
  fntasadelisrpf: 10,
  fntasadelisrpm: 10,
  fntasaisrudispf: 10,
  fntasaisrudispm: 10,
  fnsalariomingral: 10,
  fcanioacalcsmg: 'TEST',
  fntasadelaunion: 10,
  fgejecutadobackup: 10,
  fnoficina: 10,
  fcdigitosucursal: 'TEST',
  fnnumeros: 10,
  fcmonedanacional: 'TEST',
  fcidrespaldo: 'TEST',
};

const tasasLiderMock: TasasLider = {
  fnencomienda: 1,
  fntasalider: 1,
  fntipoplazo: 1,
  fnplazo: 1,
  fndia: 1,
};

const tipoAmortizacionMock: TipoAmortizacion = {
  fntipoamortizacion: 1,
  fcdescripcion: 'TEST',
  fnperiodoanual: 1,
  fcabreviatura: 'TEST',
  fntipoperiodo: 1,
  fnperiodo: 1,
};

const tipoCotizacionMock: TipoCotizacion = {
  fnmoneda: 1,
  fdfechacotizacion: new Date(),
  fncotizacioncompra: 1,
  fncotizacionventa: 1,
};

const clientMock: Cliente = {
  fnencomienda: 1,
  fnbanco: 1,
  fncliente: 1,
  fnsujeto: 1,
  fncveorg: 1,
  fcnombrefull: '1',
  fcnombre: '1',
  fcnombre2: '1',
  fcapellido: '1',
  fcapellido2: '1',
  fchomonimo: '1',
  fchomonimosec: '1',
  fcrepresentante: '1',
  fctpident: '1',
  fcnumident: '1',
  fcdireccion1: '1',
  fcdireccion2: '1',
  fcdirecc2bis1: '1',
  fcdirecc2bis2: '1',
  fccodigopostal: '1',
  fccolonia: '1',
  fnactividad: 1,
  fncodpais: 1,
  fncodciudad: 1,
  fctelex: '1',
  fcfax: '1',
  fcsexo: '1',
  fcestadocivil: '1',
  fnnacionalidad: 1,
  fcinscrpp: '1',
  fcescriturapub: '1',
  fdfechaescpub: new Date('28/07/2022'),
  fncapitalsocial: 1,
  fctelefono1: '1',
  fctelefono2: '1',
  fcrfc1: '1',
  fntpcliente: 1,
  fgintegracion: 1,
  fcocupacion: '1',
  fgmasdireccion: 1,
  fnfechanacimto: 1,
  fnoficinaresp: 1,
  fcencargado: '1',
  fcdepresp: '1',
  fccorrespond: '1',
  fctipodefirma: '1',
  fcdiv: '1',
  fnsegmento: 1,
  fcpoblacion: '1',
  fnsector: 1,
  fcestimulo1: '1',
  fcestimulo2: '1',
  fnfigjuridica: 1,
  fnsectorten: 1,
  fntpoproductor1: 1,
  fntpoproductor2: 1,
  fnsuperficie: 1,
  fccvefte1: '1',
  fccvefte2: '1',
  fccvefte3: '1',
  fccvefte4: '1',
  fccvefte5: '1',
  fnnumfte1: 1,
  fnnumfte2: 1,
  fnnumfte3: 1,
  fnnumfte4: 1,
  fnnumfte5: 1,
  fcnivel12: '1',
  fgprotect: 1,
  fgguarda: 1,
  fnsistema1: 1,
  fnsistema2: 1,
  fnsistema3: 1,
  fgforo: 1,
  fcrefcobro: '1',
  fnentidadfederativa: 1,
  fccurp: '1',
  fdfechaautforo: new Date('28/07/2022'),
  fdfechaplazoforo: new Date('28/07/2022'),
  fnpagopropforo: 1,
  fntipodev: 1,
};

export class CatalogoServiceMock {
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
    queryParams: QueryParams,
  ): Promise<Wrapper<Calendario[]>> {
    return Promise.resolve(
      new Wrapper<Calendario[]>(
        queryParams,
        1,
        [calendarioMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCalendariosById(id: number): Promise<Wrapper<Calendario>> {
    calendarioMock.fnencomienda = id;
    return Promise.resolve(
      new Wrapper<Calendario>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        calendarioMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getCalendariosByEncomiendaId(
    // eslint-disable-next-line
    fnencomienda: number,
  ): Promise<Wrapper<Calendario[]>> {
    return Promise.resolve(
      new Wrapper<Calendario[]>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [calendarioMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getEncomiendasAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<BmgEncomienda[]>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda[]>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [encomiendaMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getEncomiendasById(id: number): Promise<Wrapper<BmgEncomienda>> {
    encomiendaMock.fnencomienda = id;
    return Promise.resolve(
      new Wrapper<BmgEncomienda>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        encomiendaMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getAll(queryParams: QueryParams): Promise<Wrapper<BmgEncomienda[]>> {
    return Promise.resolve(
      new Wrapper<BmgEncomienda[]>(
        queryParams,
        1,
        [encomiendaMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getParametrosCarteraAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<ParametrosCartera[]>> {
    return Promise.resolve(
      new Wrapper<ParametrosCartera[]>(
        queryParams,
        1,
        [parametrosCarteraMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getParametrosCarteraById(
    id: number,
  ): Promise<Wrapper<ParametrosCartera>> {
    parametrosCarteraMock.fnencomienda = id;
    return Promise.resolve(
      new Wrapper<ParametrosCartera>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        parametrosCarteraMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTasasLiderAll(
    // eslint-disable-next-line
    queryParams: QueryParams,
  ): Promise<Wrapper<TasasLider[]>> {
    return Promise.resolve(
      new Wrapper<TasasLider[]>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        [tasasLiderMock],
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
    tasasLiderMock.fnencomienda = fnencomienda;
    tasasLiderMock.fntasalider = fntasalider;
    tasasLiderMock.fntipoplazo = fntipoplazo;
    return Promise.resolve(
      new Wrapper<TasasLider>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        tasasLiderMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoAmortizacionAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoAmortizacion[]>> {
    return Promise.resolve(
      new Wrapper<TipoAmortizacion[]>(
        queryParams,
        1,
        [tipoAmortizacionMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoAmortizacionById(
    id: number,
  ): Promise<Wrapper<TipoAmortizacion>> {
    tipoAmortizacionMock.fntipoamortizacion = id;
    return Promise.resolve(
      new Wrapper<TipoAmortizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        tipoAmortizacionMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getTipoCotizacionAll(
    queryParams: QueryParams,
  ): Promise<Wrapper<TipoCotizacion[]>> {
    return Promise.resolve(
      new Wrapper<TipoCotizacion[]>(
        queryParams,
        1,
        [tipoCotizacionMock],
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
    tipoCotizacionMock.fnmoneda = fnmoneda;
    tipoCotizacionMock.fdfechacotizacion = fdfechacotizacion;
    tipoCotizacionMock.fncotizacioncompra = fncotizacioncompra;
    tipoCotizacionMock.fncotizacionventa = fncotizacionventa;

    return Promise.resolve(
      new Wrapper<TipoCotizacion>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        tipoCotizacionMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getClienteAll(queryParams: QueryParams): Promise<Wrapper<Cliente[]>> {
    return Promise.resolve(
      new Wrapper<Cliente[]>(
        queryParams,
        1,
        [clientMock],
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }

  async getClienteById(
    fnencomienda: number,
    fnbanco: number,
    fncliente: number,
  ): Promise<Wrapper<Cliente>> {
    clientMock.fnencomienda = fnencomienda;
    clientMock.fnbanco = fnbanco;
    clientMock.fncliente = fncliente;
    return Promise.resolve(
      new Wrapper<Cliente>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        clientMock,
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
}
