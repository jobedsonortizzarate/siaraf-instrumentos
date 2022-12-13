import { Validator } from "class-validator";
import { TipoCotizacion } from "./cotizaciones";



const validator = new Validator();
const SERVICE_NAME = 'Test TipoCotizacion DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: TipoCotizacion = new TipoCotizacion();
        return validator.validate(model).then(errors => {
            if (errors.length < 4) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(4);
        });
    });

    it('Test Object Class without error', async () => {
        const model: TipoCotizacion = new TipoCotizacion();
        model.fnmoneda = 1;
        model.fdfechacotizacion = new Date();
        model.fncotizacioncompra = 1;
        model.fncotizacionventa = 1;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})