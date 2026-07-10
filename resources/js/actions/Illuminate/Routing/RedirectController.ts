import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
const RedirectController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController.url(options),
    method: 'get',
})

RedirectController.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.url = (options?: RouteQueryOptions) => {
    return RedirectController.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
RedirectController.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
    const RedirectControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route 'https://unhearing-ragweed-flatbed.ngrok-free.dev/settings'
 */
        RedirectControllerForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController.form = RedirectControllerForm
export default RedirectController