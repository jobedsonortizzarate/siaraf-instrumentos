import { Injectable, Logger } from '@nestjs/common';
import { FechaUtiles } from '../commons/utiles/date.util';
import { RegistroCierre } from './dtos/registro-cierre';
import { ClientProxyIndep } from '../commons/proxy/client-proxy';
import { BitacoraMSGs } from '../commons/constants';

@Injectable()
export class BitacoraService {
  constructor(
    private readonly clientProxy: ClientProxyIndep
  ) { }
  private _clientProxyBitacoras = this.clientProxy.clientProxyInstrumentos();
  async saveBitacora(
    cveEncomienda: number,
    error: string,
    programa: string,
  ): Promise<void> {
    const now = FechaUtiles.getNow();
    const bitacora = new RegistroCierre(
      cveEncomienda,
      now,
      FechaUtiles.getTimeFormat(now),
      error,
      programa,
    );
    Logger.debug(`hora local = ${now}`);
    try {
      this._clientProxyBitacoras
        .send(BitacoraMSGs.BITACORA_SAVE, bitacora)
        .subscribe((response) => response);
    } catch (error) {
      Logger.log('Error al mandar a bitacora: ', error);
    }
  }
}
