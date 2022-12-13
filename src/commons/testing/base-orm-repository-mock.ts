export class BaseORMRepositoryMock {
  protected _auxInstance;
  protected getData(): any[] {
    return [];
  }
  //Añadir los métodos falseados (mockeados). estos deben de ser los mismos que tiene el repo y que requiere el servicio
  public save(instance: any): Promise<any> {
    return {
      // cveEncomienda: Math.random() * (1000 - 1) + 1,
      ...instance,
    };
  }

  update(id, instance): Promise<any> {
    this._auxInstance = instance;
    return {
      id,
      ...this._auxInstance,
    };
  }
  // eslint-disable-next-line
  findOne(id): Promise<any> {
    return {
      ...this.getData()[0],
    };
  }
  // eslint-disable-next-line
  delete(id): any {
    return {
      affected: 1,
    };
  }
}
