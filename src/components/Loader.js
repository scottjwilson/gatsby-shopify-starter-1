import React, { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { animated, useTransition } from "react-spring"

const Loader = () => {
  const { isLoading } = useContext(StoreContext)
  //   const isLoading = true
  const transitions = useTransition(isLoading, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999999,
            background: "var(--blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...props,
          }}
        >
         <svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ripple"><circle cx="50" cy="50" r="20.6082" fill="none" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-width="{{config.width}}" stroke="#d2aa5c" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1" keySplines="0 0.2 0.8 1" begin="-0.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1" keySplines="0.2 0 0.8 1" begin="-0.5s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="37.8205" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" stroke="#d2aa5c" stroke-width="2"><animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate></circle></svg>
        </animated.div>
      )
  )
}

export default Loader
