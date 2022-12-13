import { Validator } from "class-validator";
import { TasasLider } from "./tasas-lider";



const validator = new Validator();
const SERVICE_NAME = 'Test TasasLider DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: TasasLider = new TasasLider();
        return validator.validate(model).then(errors => {
            if (errors.length < 5) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(5);
        });
    });

    it('Test Object Class without error', async () => {
        const model: TasasLider = new TasasLider();
        model.fnencomienda = 1;
        model.fntasalider = 1;
        model.fntipoplazo = 1;
        model.fnplazo = 1;
        model.fndia = 1;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})