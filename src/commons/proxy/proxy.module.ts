import { Module } from '@nestjs/common';
import { ClientProxyIndep } from './client-proxy';

@Module({
  providers: [ClientProxyIndep],
  exports: [ClientProxyIndep],
})
export class ProxyModule {}
