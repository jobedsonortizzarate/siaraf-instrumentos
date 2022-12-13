import { Logger, Query } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QueryParams } from './dtos/query-params';
import { Wrapper } from './dtos/wrapper';
import { BaseService } from './services/service.commons';

export abstract class BaseController<T> {
  abstract getService(): BaseService<T>;

  @Post()
  create(@Body() dto: T) {
    Logger.debug(`Legando a Create generico con: ${dto}`);
    return this.getService().create(dto);
  }
  @Get()
  findAll(@Query() queryParams: QueryParams): Promise<Wrapper<T>> {
    Logger.debug(queryParams);
    return this.getService().findAll(queryParams);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getService().findOneById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: T) {
    Logger.debug(`Legando a update id ${id} generico con: ${dto}`);
    return this.getService().update(id, dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.getService().remove(id);
  }
}
