import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

// This is an Isomorphic link
// The server-side rendered markup will include an `href` tab
const IsomorphicLink = props => {
  const [hasMounted, setHasMounted] = useState(false)

  // This is effectively `componentDidMount`
  useEffect(() => setHasMounted(true), [])

  // Trigger the `onClick()` of the Link when hitting the space or enter key
  const clickOnEnterOrSpaceKey = useCallback(ev => {
    if (props.onKeyDown) props.onKeyDown(ev)
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault()
      ev.target.click()
    }
  })

  // Add the `href` attribute when not mounted to enable navigation
  if (!hasMounted) {
    return (
      <Link href={props.href}>
        {React.cloneElement(props.children, {
          href: props.href,
        })}
      </Link>
    )
  }

  // Remove the `href` attribute when mounted to enable client-side routing
  return (
    <Link href={props.href}>
      {React.cloneElement(props.children, {
        onKeyDown: clickOnEnterOrSpaceKey,
        tabIndex: 0,
      })}
    </Link>
  )
}

export default IsomorphicLink
