import { disallow } from 'feathers-hooks-common';

export default {
    before: {
        all: [disallow('external')],
    },
};
