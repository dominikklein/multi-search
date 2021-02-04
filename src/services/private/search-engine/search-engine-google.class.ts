import {
    SearchEngineBase,
    SearchEngineResultItemData,
    SearchEngineResult,
} from './search-engine-base.class';
import fetch from 'node-fetch';

export class SearchEngineGoogle extends SearchEngineBase {
    private url = `${this.options.searchEngineConfig.baseUrl}?gl=de&key=${this.options.searchEngineConfig.apiKey}&cx=${this.options.searchEngineConfig.searchEngineID}`;

    getSearchEngineType(): string {
        return 'Google';
    }

    async _searchEngineFind(searchQuery: string): Promise<SearchEngineResult> {
        const response = await fetch(`${this.url}&q=${searchQuery}`);
        const body = await response.json();

        if (!body.items) {
            return {
                total: 0,
                items: [],
            };
        }

        const items: SearchEngineResultItemData[] = [];

        body.items.forEach((item: Record<string, any>) => {
            items.push({
                link: item.link,
                displayLink: item.displayLink,
                title: item.title,
                searchEngineName: this.getSearchEngineType(),
            });
        });

        return {
            total: parseInt(body.searchInformation.totalResults, 10),
            items: items,
        };
    }
}
