import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

// Turbo frames doesn't emit events when a frame loads, which means
// React doesn't know when their components should be re-rendered.
// This Hack below uses MutationObserver to simulate the missing event
// and load react components when needed.
//
// See more: https://github.com/reactjs/react-rails/issues/1113
document.addEventListener("DOMContentLoaded", () => {
  const findComponents = (childNodes, testFn, nodes = []) => {
    for (let child of childNodes) {
      if (child.childNodes.length > 0) {
        nodes = findComponents(child.childNodes, testFn, nodes)
      } else if (testFn(child)) {
        nodes = nodes.concat([child])
      }
    }

    return nodes
  }

  const mountComponents = (nodes) => {
    for (let child of nodes) {
      const className = child.getAttribute(ReactRailsUJS.CLASS_NAME_ATTR)
      if (className) {
        // Taken from ReastRailsUJS as is.
        const constructor = ReactRailsUJS.getConstructor(className)
        const propsJson = child.getAttribute(ReactRailsUJS.PROPS_ATTR)
        const props = propsJson && JSON.parse(propsJson)

        // Improvement:
        // Was this component already rendered? Just hydrate it with the props coming in.
        // This is currently acceptable since all our components are expected to be reset
        // on page navigation.
        const component = React.createElement(constructor, props)
        createRoot(child).render(component)
      }
    }
  }

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0) {
          const mountableNodes = findComponents(mutation.addedNodes, (child) => {
            return !!child.dataset?.reactClass
          })

          mountComponents(mountableNodes)
        }
      }
    }
  };

  const observer = new MutationObserver(callback)
  observer.observe(document, { childList: true, subtree: true })
})
