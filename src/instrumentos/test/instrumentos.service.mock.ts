import { Order } from '../../commons/constants';
import { QueryParams } from '../../commons/dtos/query-params';
import { Wrapper } from '../../commons/dtos/wrapper';
// import { InstrumentosEntity } from 'src/commons/entities/postgres-db-siaraf/Instrumentos.entity';
import { InstrumentosEntity } from '../../commons/entities/mssql-db-siaraf/Instrumentos.entity';
import { CRUDMessages } from '../../commons/messages.enum';

// export class InstrumentosServiceMock extends BaseRepositoryMock<InstrumentosEntity, InstrumentosEntity> {
export class InstrumentosServiceMock {
  public static payload: InstrumentosEntity[] = [
    {
      fnencomienda: 1,
      fninstrumento: 3160,
      fnfuentefinanciera: 0,
      fcdescripcion: 'FONHAPO',
      fcdestino: 'ENAJENACIÓN',
      fntipocredito: 25,
      fnprograma: 0,
      fnmonedacredito: 1,
      fncobrointereses: 1,
      fcmodalidadcobint: '1',
      fctipodescuento: '0',
      fctipocalendario: '2',
      fnmontomaximo: '500000.00',
      fnmonedamontomax: 1,
      fnplazomaximo: 1,
      fntipoplazomax: 1,
      fnplazograciacap: 0,
      fnplazograciaint: 0,
      fntipoplazogracia: 0,
      fcpagosanticipados: '2',
      fntipopagos1: 1,
      fntipopagos2: 2,
      fntipopagos3: 0,
      fntipopagos4: 0,
      fctipodisposicion1: '1',
      fctipodisposicion2: null,
      fctipodisposicion3: null,
      fgcondcontrato: 1,
      fntasalider: 14,
      fcoperadortasa1: '+',
      fcoperadortasa2: null,
      fnvaloroperador1: '0.0000',
      fnvaloroperador2: '0.0000',
      fcredondeotasa: '4',
      fnrevisiontasa: 3,
      fctiporevisiontas: '3',
      fcoperadortasamor: '*',
      fnvaloroptasamor: '0.0000',
      fctratamientos1: null,
      fctratamientos2: null,
      fctratamientos3: null,
      fctratamientos4: null,
      fctratamientos5: null,
      fctratamientos6: null,
      fctipoproductor1: null,
      fctipoproductor2: null,
      fctipoproductor3: null,
      fctipoproductor4: null,
      fcgarantiasclte1: '0',
      fcgarantiasclte2: '0',
      fcgarantiasclte3: '0',
      fcgarantiasclte4: '0',
      fccomisiones1: null,
      fccomisiones2: null,
      fccomisiones3: null,
      fccomisiones4: null,
      fccomisiones5: null,
      fncomisionesvalor1: '0.000',
      fncomisionesvalor2: '0.000',
      fncomisionesvalor3: '0.000',
      fncomisionesvalor4: '0.000',
      fncomisionesvalor5: '0.000',
      fncobrominimocom1: '0.00',
      fncobrominimocom2: '0.00',
      fncobrominimocom3: '0.00',
      fncobrominimocom4: '0.00',
      fncobrominimocom5: '0.00',
      fglineas: 0,
      fgcaracteristica1: 0,
      fgusuario: 1,
      fgunidad: 1,
      fgnumevaluacion: 1,
      fgconceptoinver: 0,
      fgindividualizable: 0,
      fgagrupable: 0,
      fgcobroiva: 1,
      fnpropdedescuento: '0.000000',
      fctipomargeninter: '4',
      fnmargenintermed1: 0.0,
      fnmargenintermed2: 0.0,
      fctipogarfuente1: null,
      fctipogarfuente2: null,
      fctipogarfuente3: null,
      fctipogarfuente4: null,
      fccomisionesfte1: null,
      fccomisionesfte2: null,
      fccomisionesfte3: null,
      fccomisionesfte4: null,
      fccomisionesfte5: null,
      fnvalorcomisfte1: '0.000',
      fnvalorcomisfte2: '0.000',
      fnvalorcomisfte3: '0.000',
      fnvalorcomisfte4: '0.000',
      fnvalorcomisfte5: '0.000',
      fntipocreditoorig: 0,
      fnfronteramaxima: 0.0,
      fnfronteraminima: 0.0,
      fntipo: 1,
      fcinstrumentofte: null,
    } as unknown as InstrumentosEntity,
  ];

  public findAll(queryParams: QueryParams): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<InstrumentosEntity[]>(
          queryParams,
          22517,
          InstrumentosServiceMock.payload,
          true,
          CRUDMessages.GetSuccess,
          null,
        ),
      );
    });
  }

  public sinRegistros(): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<InstrumentosEntity[]>(
          null,
          22517,
          [],
          true,
          CRUDMessages.GetSuccess,
          null,
        ),
      );
    });
  }

  public async error(): Promise<Wrapper<InstrumentosEntity>> {
    const wrapper = new Wrapper<InstrumentosEntity>(
      new QueryParams(Order.DESC, 1, 1),
      1,
      { hasError: -1 } as any,
      false,
      '',
      null,
    );
    return wrapper;
  }

  public findOneById(queryParams: QueryParams): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<InstrumentosEntity>(
          queryParams,
          22517,
          InstrumentosServiceMock.payload[0],
          true,
          CRUDMessages.GetSuccess,
          null,
        ),
      );
    });
  }
  // eslint-disable-next-line
  public create(dto: InstrumentosEntity): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<InstrumentosEntity>(
          new QueryParams(Order.DESC, 1, 1),
          1,
          new InstrumentosEntity(),
          true,
          CRUDMessages.CreateSuccess,
          null,
        ),
      );
    });
  }

  public remove(
    // eslint-disable-next-line
    fnencomienda: number,
    // eslint-disable-next-line
    fninstrumento: number,
  ): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<any>(
          new QueryParams(Order.DESC, 1, 1),
          1,
          new InstrumentosEntity(),
          true,
          CRUDMessages.DeleteSuccess,
          null,
        ),
      );
    });
  }

  public update(
    // eslint-disable-next-line
    fnencomienda: number,
    // eslint-disable-next-line
    fninstrumento: number,
    // eslint-disable-next-line
    dto: InstrumentosEntity,
  ): Promise<Wrapper<any>> {
    return new Promise((resolve) => {
      resolve(
        new Wrapper<any>(
          new QueryParams(Order.DESC, 1, 1),
          1,
          new InstrumentosEntity(),
          true,
          CRUDMessages.UpdateSuccess,
          null,
        ),
      );
    });
  }

  // public resetData(): void {
  //     this.setData(InstrumentosServiceMock.payload);
  // }

  // public modelToEntity(model: InstrumentosEntity): InstrumentosEntity {
  //     return model;
  // }

  // public entityToModel(entity: InstrumentosEntity): InstrumentosEntity {
  //     return entity;
  // }

  // Validador de Id compuesto o simple usado por findOneById
  // protected isEquals(ent1: InstrumentosEntity, ent2: InstrumentosEntity): boolean {
  //     return ent1.fnencomienda === ent2.fnencomienda &&
  //         ent1.fninstrumento === ent2.fninstrumento &&
  //         ent1.fnfuentefinanciera === ent2.fnfuentefinanciera &&
  //         ent1.fnprograma === ent2.fnprograma

  // }
}
