import app from '../../src/app';

describe('"search" service', () => {
    it('registered the service', () => {
        const service = app.service('search');
        expect(service).toBeTruthy();
    });

    // TODO Add more test cases for the search service.
    // TODO Find a solution for the API-Call to the search engines in the background.
});
