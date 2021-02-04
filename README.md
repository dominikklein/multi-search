# multi-search

> A search interface to search in multiple search engines with one search query.
> For example to compare the different result positions.

## About

The project is about a small REST-API, which can be used to search with multiple search engines at the same time.
At the moment the route `/search/?serchQuery=Test` can be used to search for a query and the ranking from the different
search engines can be compared:

```
    {
        "total": 10,
        "limit": 10,
        "skip": 0,
        "data": [
            [
                {
                    "link": "https://www.test.de/",
                    "displayLink": "www.test.de",
                    "title": "Stiftung Warentest",
                    "searchEngineName": "Google"
                },
                {
                    "link": "https://www.test.de/",
                    "displayLink": "https://www.test.de",
                    "title": "Stiftung Warentest - Aktuell auf test.de",
                    "searchEngineName": "Bing"
                }
            ],
            ...
        ]
    }
```

In the current state the search engines the following search engines are available: Google, Bing.
It's easily possible to add additional search engines.

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/multi-search
    npm install
    ```

3. Copy the `config/local.json.dist` to `config/local.json` and add the needed config options for the search engines.

4. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.
