import { Validator } from "class-validator";
import { Comparison } from "../constants";
import { Filter } from "./filter";

const validator = new Validator();
const SERVICE_NAME = 'Test Filter DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model = new Filter(
            null,
            null,
            null,
            null,
        );
        return validator.validate(model).then(errors => {
            if (errors.length < 3) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(3);
        });
    });

    it('Test Object Class without error', async () => {
        const model = new Filter(
            'Prop1',
            Comparison.EQUAL,
            '1',
            1,
        );
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})