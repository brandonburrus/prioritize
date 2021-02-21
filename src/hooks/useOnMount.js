import React, { useEffect } from "react";

const EMPTY_ARR = [];

export default function useOnMount(cb) {
  return useEffect(cb, EMPTY_ARR);
}
