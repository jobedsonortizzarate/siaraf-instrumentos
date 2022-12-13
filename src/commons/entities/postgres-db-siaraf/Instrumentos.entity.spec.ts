import { Validator } from "class-validator";
import { InstrumentosEntity } from "./Instrumentos.entity";



const validator = new Validator();
const SERVICE_NAME = 'Test InstrumentosEntity Entity for PostgreSQL';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: InstrumentosEntity = new InstrumentosEntity();
        return validator.validate(model).then(errors => {
            if (errors.length < 4) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(4);
        });
    });

    it('Test Object Class without error', async () => {
        const model: InstrumentosEntity = new InstrumentosEntity();
        model.fnencomienda = 1;
        model.fninstrumento = 123;
        model.fnfuentefinanciera = 123;
        model.fnprograma = 11;
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})