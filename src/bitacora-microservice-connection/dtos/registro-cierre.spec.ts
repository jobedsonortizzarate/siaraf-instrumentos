import { Validator } from "class-validator";
import { RegistroCierre } from "./registro-cierre";

const validator = new Validator();
const SERVICE_NAME = 'Test RegistroCierre DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model = new RegistroCierre(
            null,
            null,
            null,
            null,
            null,
        );
        return validator.validate(model).then(errors => {
            if (errors.length < 5) {
                
            }
            //expect(errors.length).toEqual(0);
            expect(errors.length).toBeGreaterThanOrEqual(5);
        });
    });

    it('Test Object Class without error', async () => {
        const model = new RegistroCierre(
            110,
            //new Date('28-10-2022'),
            new Date(),
            '10:35pm',
            'Texto de Registro',
            'TEST PROC',
        );
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})