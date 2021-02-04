import { Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../../declarations';

export interface SearchEngineResultItemData {
    title: string;
    link: string;
    displayLink: string;
    searchEngineName: string;
}

export interface SearchEngineResult {
    total: number;
    items: SearchEngineResultItemData[];
}

interface ServiceSearchEngineOptions {
    searchEngineConfig: Record<string, any>;
}

export abstract class SearchEngineBase
    implements Partial<ServiceMethods<SearchEngineResult>> {
    options: ServiceSearchEngineOptions = {
        searchEngineConfig: this.app.get('searchEngines')[
            this.getSearchEngineType()
        ],
    };

    constructor(private app: Application) {
        this.app = app;
    }

    async find(params: Params): Promise<SearchEngineResult> {
        let searchEngineResult: SearchEngineResult;

        if (params.query && params.query.searchQuery) {
            searchEngineResult = await this._searchEngineFind(
                params.query.searchQuery
            );
        } else {
            searchEngineResult = {
                total: 0,
                items: [],
            };
        }

        return searchEngineResult;
    }

    abstract getSearchEngineType(): string;
    abstract _searchEngineFind(
        searchQuery: string
    ): Promise<SearchEngineResult>;
}
