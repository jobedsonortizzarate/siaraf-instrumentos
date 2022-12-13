import { Validator } from "class-validator";
import { Comparison, Order } from "../constants";
import { Sort } from "./sort";


const validator = new Validator();
const SERVICE_NAME = 'Test Sort DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: Sort = new Sort();
        model.property = null;
        model.direction = null;
        return validator.validate(model).then(errors => {
            if (errors.length < 2) {
                
            }
            // expect(errors.length).toEqual(4);
            expect(errors.length).toBeGreaterThanOrEqual(2);
            //expect(errors.length).toBeGreaterThan(0);
        });
    });

    it('Test Object Class without error', async () => {
        const model: Sort = {
            property: 'col',
            direction: Order.ASC,
        };
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})