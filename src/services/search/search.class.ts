import { Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { filterQuery } from '@feathersjs/adapter-commons';
import { Application } from '../../declarations';
import {
    SearchEngineBase,
    SearchEngineResult,
    SearchEngineResultItemData,
} from '../private/search-engine/search-engine-base.class';

interface ServiceOptions {
    paginate: {
        default?: number;
        max?: number;
    };
    searchEngines: Record<string, Record<string, any>>;
}

type ResultItem = Array<SearchEngineResultItemData>;

export class Search implements Partial<ServiceMethods<ResultItem>> {
    constructor(private options: ServiceOptions, private app: Application) {
        this.options = options;
        this.app = app;
    }

    async find(params: Params): Promise<ResultItem[] | Paginated<ResultItem>> {
        const { query, filters } = filterQuery(params.query, this.options);

        const searchEngineNames: Array<string> = Object.keys(
            this.options.searchEngines
        );

        let resultItems: Array<ResultItem> = [];

        // Go over all search engine services and build a lookup with the different ranks of the result.
        await Promise.all(
            searchEngineNames.map(async (searchEngine) => {
                const service: SearchEngineBase = this.app.service(
                    `search-engine/${searchEngine}`
                );

                const searchEngineResult: SearchEngineResult = await service.find(
                    {
                        query: {
                            searchQuery: query.searchQuery,
                        },
                    }
                );

                if (searchEngineResult.total > 0) {
                    searchEngineResult.items.forEach(
                        (item: SearchEngineResultItemData, index: number) => {
                            if (resultItems[index]) {
                                resultItems[index].push(item);
                            } else {
                                resultItems.push([item]);
                            }
                        }
                    );
                }
            })
        );

        const total: number = resultItems.length;

        if (filters.$skip !== undefined) {
            resultItems = resultItems.slice(filters.$skip);
        }

        if (filters.$limit !== undefined) {
            resultItems = resultItems.slice(0, filters.$limit);
        }

        const result = {
            total,
            limit: filters.$limit,
            skip: filters.$skip || 0,
            data: resultItems,
        };

        return result;
    }
}
