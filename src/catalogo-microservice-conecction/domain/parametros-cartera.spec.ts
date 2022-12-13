import { Validator } from "class-validator";
import { ParametrosCartera } from "./parametros-cartera";



const validator = new Validator();
const SERVICE_NAME = 'Test ParametrosCartera DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: ParametrosCartera = new ParametrosCartera();
        return validator.validate(model).then(errors => {
            if (errors.length < 1) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('Test Object Class without error', async () => {
        const model: ParametrosCartera = new ParametrosCartera();
        model.fnencomienda = 1;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})