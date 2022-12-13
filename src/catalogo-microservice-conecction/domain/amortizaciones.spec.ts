import { Validator } from "class-validator";
import { TipoAmortizacion } from "./amortizaciones";



const validator = new Validator();
const SERVICE_NAME = 'Test TipoAmortizacion DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: TipoAmortizacion = new TipoAmortizacion();
        return validator.validate(model).then(errors => {
            if (errors.length < 1) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('Test Object Class without error', async () => {
        const model: TipoAmortizacion = new TipoAmortizacion();
        model.fntipoamortizacion = 1;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})