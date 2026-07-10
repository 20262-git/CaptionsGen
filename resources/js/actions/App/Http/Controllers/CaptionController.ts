import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: 'http://captionsgen.test/caption',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CaptionController::index
 * @see app/Http/Controllers/CaptionController.php:17
 * @route 'http://captionsgen.test/caption'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\CaptionController::generate
 * @see app/Http/Controllers/CaptionController.php:25
 * @route 'http://captionsgen.test/caption'
 */
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: 'http://captionsgen.test/caption',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CaptionController::generate
 * @see app/Http/Controllers/CaptionController.php:25
 * @route 'http://captionsgen.test/caption'
 */
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CaptionController::generate
 * @see app/Http/Controllers/CaptionController.php:25
 * @route 'http://captionsgen.test/caption'
 */
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CaptionController::generate
 * @see app/Http/Controllers/CaptionController.php:25
 * @route 'http://captionsgen.test/caption'
 */
    const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CaptionController::generate
 * @see app/Http/Controllers/CaptionController.php:25
 * @route 'http://captionsgen.test/caption'
 */
        generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(options),
            method: 'post',
        })
    
    generate.form = generateForm
const CaptionController = { index, generate }

export default CaptionController