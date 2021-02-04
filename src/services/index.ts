import { Application } from '../declarations';
import search from './search/search.service';
import searchEngineServices from './private/search-engine/search-engine.services';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(search);
    app.configure(searchEngineServices);
}
