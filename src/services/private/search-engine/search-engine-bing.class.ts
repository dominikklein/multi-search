import {
    SearchEngineBase,
    SearchEngineResultItemData,
    SearchEngineResult,
} from './search-engine-base.class';
import fetch from 'node-fetch';

export class SearchEngineBing extends SearchEngineBase {
    private url = `${this.options.searchEngineConfig.baseUrl}?cc=de&offset=0&count=10`;

    getSearchEngineType(): string {
        return 'Bing';
    }

    async _searchEngineFind(searchQuery: string): Promise<SearchEngineResult> {
        const response = await fetch(`${this.url}&q=${searchQuery}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': this.options.searchEngineConfig
                    .apiKey,
            },
        });
        const body = await response.json();

        if (!body.webPages.value) {
            return {
                total: 0,
                items: [],
            };
        }

        const items: SearchEngineResultItemData[] = [];

        body.webPages.value.forEach((item: Record<string, any>) => {
            items.push({
                link: item.url,
                displayLink: item.displayUrl,
                title: item.name,
                searchEngineName: this.getSearchEngineType(),
            });
        });

        return {
            total: parseInt(body.webPages.totalEstimatedMatches, 10),
            items: items,
        };
    }
}
