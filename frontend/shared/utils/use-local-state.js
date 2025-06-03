import React from 'react'

const { useState, useEffect, useCallback } = React

export default function useLocalState(identifier) {
  const [state, setLocalState] = useState(null)

  useEffect(() => {
    const value = localStorage.getItem(identifier)

    if (!value) return

    setLocalState(JSON.parse(value))
  }, [identifier])


  const setState = useCallback(value => {
    localStorage.setItem(identifier, JSON.stringify(value))
    setLocalState(value)
  }, [setLocalState, identifier])

  return [state, setState]
}
