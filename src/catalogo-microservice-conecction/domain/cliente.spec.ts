import { Validator } from "class-validator";
import { Cliente } from "./cliente";



const validator = new Validator();
const SERVICE_NAME = 'Test Cliente DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: Cliente = new Cliente();
        return validator.validate(model).then(errors => {
            if (errors.length < 4) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(4);
        });
    });

    it('Test Object Class without error', async () => {
        const model: Cliente = new Cliente();
        model.fnencomienda = 1;
        model.fnbanco = 1;
        model.fncliente = 1;
        model.fnsujeto = 1;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})