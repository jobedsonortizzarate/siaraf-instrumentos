import { Logger } from '@nestjs/common';
import { Order } from 'src/commons/constants';
import { QueryParams } from 'src/commons/dtos/query-params';
import { Wrapper } from 'src/commons/dtos/wrapper';
import { RepositoryMessages } from 'src/commons/services/base-repository.messagess';
import { RegistroCierre } from '../dtos/registro-cierre';

export class BitacoraServiceMock {
  async saveBitacora(
    cveEncomienda: number,
    error: string,
    programa: string,
  ): Promise<Wrapper<RegistroCierre>> {
    Logger.debug(
      "Test Error Bitacora encomienda '" +
        cveEncomienda +
        "' Message ERROR [" +
        programa +
        ']: ',
      error,
    );
    return Promise.resolve(
      new Wrapper<RegistroCierre>(
        new QueryParams(Order.DESC, 1, 1),
        1,
        {
          id: 1,
          fnencomienda: cveEncomienda,
          fdfecha: new Date('15/07/2022'),
          fchora: '12:00',
          fcregistro: 'Test',
          fcprocedimiento: programa,
        },
        true,
        RepositoryMessages.CreateSuccess,
        null,
      ),
    );
  }
}
