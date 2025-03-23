import React from "react"

const { useState, useEffect } = React

const dispatcher = window.dispatcher

const defaultConfig = {
  identifier: "id",
  initialState: []
}

/**
 * A custom hook that manages a syncable resource state with real-time updates through a dispatcher.
 * It handles creation, updates, and deletion of resources automatically.
 *
 * @param {Object} overrideConfig - Configuration object for the syncable resource
 * @param {string} overrideConfig.scope - The resource type identifier (e.g., "column", "issue")
 * @param {string} [overrideConfig.identifier="id"] - The unique identifier field name for the resource
 * @param {Array} [overrideConfig.initialState=[]] - Initial array of resources
 * @param {Array} [overrideConfig.resources] - Alternative way to provide resources (must be used with setResources)
 * @param {Function} [overrideConfig.setResources] - Alternative setter function for resources (must be used with resources)
 *
 * @returns {[Array, Function]} A tuple containing:
 *   - resources: Array of current resources
 *   - setResources: Function to update the resources state
 *
 * @example
 * // Using with initial state
 * const [columns, setColumns] = useSyncableResource({
 *   scope: "column",
 *   initialState: initialColumns
 * });
 *
 * @example
 * // Using with custom identifier
 * const [issues, setIssues] = useSyncableResource({
 *   scope: "issue",
 *   identifier: "issueId",
 *   initialState: initialIssues
 * });
 *
 * @throws {Error} When neither initialState nor both resources and setResources are provided
 */
export function useSyncableResource(overrideConfig) {
  const config = { ...defaultConfig, ...overrideConfig }

  let resources, setResources
  const { scope, identifier, initialState } = config

  if (initialState) {
    [resources, setResources] = useState(initialState)
  } else if (config.resources && config.setResources) {
    ({ resources, setResources } = config)
  } else {
    throw new Error(
      `useSyncableResource: You must provide either 'initialState' or both 'resources' and 'setResources' for scope "${scope}"`
    )
  }

  useEffect(() => {
    return dispatcher.on(`${scope}:created`, ({ data: createdResource }) => {
      // Created event may happen more than one time, so a idempotent method
      // is required
      setResources(
        resources.filter(resource => resource[identifier] != createdResource[identifier])
          .concat(createdResource)
      )
    })
  }, [resources])

  useEffect(() => {
    return dispatcher.on(`${scope}:updated`, ({ data: updatedResource }) => {
      setResources(
        resources.map(resource => {
          if (resource[identifier] != updatedResource[identifier]) return resource

          return updatedResource
        })
      )
    })
  }, [resources])

  useEffect(() => {
    return dispatcher.on(`${scope}:deleted`, ({ data: deletedResource }) => {
      setResources(resources.filter(resource => resource[identifier] != deletedResource[identifier]))
    })
  }, [resources])

  useEffect(() => {
    return dispatcher.on(`${scope}:mass_updated`, ({ data: updatedResources }) => {
      setResources(
        resources.map(resource => {
          const updatedResource = updatedResources.find(updatedResource => {
            return updatedResource[identifier] == resource[identifier]
          })

          if (updatedResource) return updatedResource

          return resource
        })
      )
    })
  }, [resources])

  return [resources, setResources]
}
