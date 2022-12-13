import { Validator } from "class-validator";
import { Comparison, Order } from "../constants";
import { Filter } from "./filter";
import { QueryParams } from "./query-params";

const validator = new Validator();
const SERVICE_NAME = 'Test QueryParams DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model = new QueryParams(
            null,
            null,
            null,
            null,
        );
        return validator.validate(model).then(errors => {
            // if (errors.length > 0) {
            //     
            // }
            // expect(errors.length).toEqual(4);
            expect(errors.length).toBeGreaterThanOrEqual(2);
            //expect(errors.length).toBeGreaterThan(0);
        });
    });

    it('Test Object Class without error', async () => {
        const filter = new Filter(
            'Prop1',
            Comparison.EQUAL,
            '1',
            1,
        );

        const model = new QueryParams(
            Order.ASC,
            1,
            10,
            [filter],
            'test',
        );

        expect(model.page).toEqual(Number(1));
        expect(model.take).toEqual(Number(10));

        expect(model.skip).toEqual(0);

        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})