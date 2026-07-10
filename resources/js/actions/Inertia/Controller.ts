import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
const Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url(options),
    method: 'get',
})

Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.definition = {
    methods: ["get","head"],
    url: 'http://captionsgen.test',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url = (options?: RouteQueryOptions) => {
    return Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
    const Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
        Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test'
 */
        Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5.form = Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5Form
    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
const Controller2ed329837fe32c545d46fc47580b1f04 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller2ed329837fe32c545d46fc47580b1f04.url(options),
    method: 'get',
})

Controller2ed329837fe32c545d46fc47580b1f04.definition = {
    methods: ["get","head"],
    url: 'http://captionsgen.test/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
Controller2ed329837fe32c545d46fc47580b1f04.url = (options?: RouteQueryOptions) => {
    return Controller2ed329837fe32c545d46fc47580b1f04.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
Controller2ed329837fe32c545d46fc47580b1f04.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller2ed329837fe32c545d46fc47580b1f04.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
Controller2ed329837fe32c545d46fc47580b1f04.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller2ed329837fe32c545d46fc47580b1f04.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
    const Controller2ed329837fe32c545d46fc47580b1f04Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller2ed329837fe32c545d46fc47580b1f04.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
        Controller2ed329837fe32c545d46fc47580b1f04Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller2ed329837fe32c545d46fc47580b1f04.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'http://captionsgen.test/settings/appearance'
 */
        Controller2ed329837fe32c545d46fc47580b1f04Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller2ed329837fe32c545d46fc47580b1f04.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller2ed329837fe32c545d46fc47580b1f04.form = Controller2ed329837fe32c545d46fc47580b1f04Form

/**
* Multiple routes resolve to \Inertia\Controller::Controller, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `Controller['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
const Controller = {
    'http://captionsgen.test': Controllerf1dd89ebea9aa6a9d9fdc7dd224013a5,
    'http://captionsgen.test/settings/appearance': Controller2ed329837fe32c545d46fc47580b1f04,
}

export default Controller