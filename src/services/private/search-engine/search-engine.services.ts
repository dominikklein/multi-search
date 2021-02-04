// Initializes the `search` service on path `/search`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import privateHooks from '../private.hooks';
import { SearchEngineGoogle } from './search-engine-google.class';
import { SearchEngineBing } from './search-engine-bing.class';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'search-engine/Google': SearchEngineGoogle & ServiceAddons<any>;
        'search-engine/Bing': SearchEngineBing & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    // Add search engine 'Google' to the available search engine services.
    app.use('/search-engine/Google', new SearchEngineGoogle(app));

    const searchEngineGoogleService = app.service('search-engine/Google');
    searchEngineGoogleService.hooks(privateHooks);

    // Add search engine 'Bing' to the available search engine services.
    app.use('/search-engine/Bing', new SearchEngineBing(app));

    const searchEngineBingService = app.service('search-engine/Bing');
    searchEngineBingService.hooks(privateHooks);
}
