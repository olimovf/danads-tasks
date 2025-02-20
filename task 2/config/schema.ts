const listsSchema = {
    type: "object",
    properties: {
        results: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    description: { type: "string" },
                    favorite_count: { type: "integer" },
                    id: { type: "integer" },
                    item_count: { type: "integer" },
                    iso_639_1: { type: "string" },
                    list_type: { type: "string" },
                    name: { type: "string" },
                    poster_path: { type: ["string", "null"] },
                },
            },
        },
        page: { type: "integer" },
        total_pages: { type: "integer" },
        total_results: { type: "integer" },
    },
};

const listDetailsSchema = {
    type: "object",
    properties: {
        created_by: { type: "string" },
        description: { type: "string" },
        favorite_count: { type: "integer" },
        id: { type: "integer" },
        items: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    adult: { type: "boolean" },
                    backdrop_path: { type: ["string", "null"] },
                    genre_ids: { type: "array", items: { type: "integer" } },
                    id: { type: "integer" },
                    media_type: { type: "string" },
                    original_language: { type: "string" },
                    original_title: { type: "string" },
                    overview: { type: "string" },
                    popularity: { type: "number" },
                    poster_path: { type: ["string", "null"] },
                    release_date: { type: "string" },
                    title: { type: "string" },
                    video: { type: "boolean" },
                    vote_average: { type: "number" },
                    vote_count: { type: "integer" },
                },
            },
        },
        item_count: { type: "integer" },
        iso_639_1: { type: "string" },
        name: { type: "string" },
        poster_path: { type: ["string", "null"] },
    },
};

export const SCHEMAS = {
    LISTS_SCHEMA: listsSchema,
    LIST_DETAILS_SCHEMA: listDetailsSchema,
};
