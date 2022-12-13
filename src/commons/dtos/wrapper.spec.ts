import { Validator } from "class-validator";
import { Comparison, Order } from "../constants";
import { QueryParams } from "./query-params";
import { Sort } from "./sort";
import { Wrapper } from "./wrapper";

const validator = new Validator();
const SERVICE_NAME = 'Test Wrapper DTO';

describe(SERVICE_NAME, () => {

    beforeEach(async () => {
    });

    it('Test Object Class with error', async () => {
        const model: Wrapper<Sort> = new Wrapper(
            null,
            null,
            null,
            null,
            null,
            null,
        );
        
        return validator.validate(model).then(errors => {
            if (errors.length < 1) {
                
            }
            expect(errors.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('Test Object Class without error', async () => {
        const res = new Sort();
        const model: Wrapper<Sort> = new Wrapper(
            new QueryParams(
                Order.ASC,
                1,
                10,
                [],
                null,
            ),
            10,
            res,
            true,
            'Message',
            'Inner msg',
        );
        return validator.validate(model).then(errors => {
            if (errors.length > 0) {
                
            }
            expect(errors.length).toEqual(0);
        });
    });
})