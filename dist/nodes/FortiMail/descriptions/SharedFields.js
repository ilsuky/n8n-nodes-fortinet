"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSimpleField = exports.domainAdditionalFieldsOptions = void 0;
exports.domainAdditionalFieldsOptions = [
    {
        displayName: 'Family Name',
        name: 'family_name',
        type: 'string',
        default: '',
        description: 'Person’s last name',
    },
];
const makeSimpleField = (resource, operation) => ({
    displayName: 'Simplify',
    name: 'simple',
    type: 'boolean',
    displayOptions: {
        show: {
            resource: [
                resource,
            ],
            operation: [
                operation,
            ],
        },
    },
    default: true,
    description: 'Whether to return a simplified version of the response instead of the raw data',
});
exports.makeSimpleField = makeSimpleField;
//# sourceMappingURL=SharedFields.js.map