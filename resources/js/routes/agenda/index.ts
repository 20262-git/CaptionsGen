import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/agenda',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AgendaController::index
 * @see app/Http/Controllers/AgendaController.php:18
 * @route '/agenda'
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
* @see \App\Http\Controllers\AgendaController::store
 * @see app/Http/Controllers/AgendaController.php:30
 * @route '/agenda'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/agenda',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AgendaController::store
 * @see app/Http/Controllers/AgendaController.php:30
 * @route '/agenda'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::store
 * @see app/Http/Controllers/AgendaController.php:30
 * @route '/agenda'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AgendaController::store
 * @see app/Http/Controllers/AgendaController.php:30
 * @route '/agenda'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AgendaController::store
 * @see app/Http/Controllers/AgendaController.php:30
 * @route '/agenda'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
export const update = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/agenda/{agenda}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
update.url = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { agenda: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { agenda: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    agenda: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        agenda: typeof args.agenda === 'object'
                ? args.agenda.id
                : args.agenda,
                }

    return update.definition.url
            .replace('{agenda}', parsedArgs.agenda.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
update.put = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
update.patch = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
    const updateForm = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
        updateForm.put = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\AgendaController::update
 * @see app/Http/Controllers/AgendaController.php:44
 * @route '/agenda/{agenda}'
 */
        updateForm.patch = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\AgendaController::destroy
 * @see app/Http/Controllers/AgendaController.php:60
 * @route '/agenda/{agenda}'
 */
export const destroy = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/agenda/{agenda}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\AgendaController::destroy
 * @see app/Http/Controllers/AgendaController.php:60
 * @route '/agenda/{agenda}'
 */
destroy.url = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { agenda: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { agenda: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    agenda: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        agenda: typeof args.agenda === 'object'
                ? args.agenda.id
                : args.agenda,
                }

    return destroy.definition.url
            .replace('{agenda}', parsedArgs.agenda.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AgendaController::destroy
 * @see app/Http/Controllers/AgendaController.php:60
 * @route '/agenda/{agenda}'
 */
destroy.delete = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\AgendaController::destroy
 * @see app/Http/Controllers/AgendaController.php:60
 * @route '/agenda/{agenda}'
 */
    const destroyForm = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AgendaController::destroy
 * @see app/Http/Controllers/AgendaController.php:60
 * @route '/agenda/{agenda}'
 */
        destroyForm.delete = (args: { agenda: number | { id: number } } | [agenda: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const agenda = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default agenda