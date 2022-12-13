import { Logger } from '@nestjs/common';

export class BitacoraServiceMock {
  async saveBitacora(
    cveEncomienda: number,
    error: string,
    programa: string,
  ): Promise<void> {
    Logger.debug(
      "Test Error Bitacora encomienda '" +
        cveEncomienda +
        "' Message ERROR [" +
        programa +
        ']: ',
      error,
    );
  }
}
