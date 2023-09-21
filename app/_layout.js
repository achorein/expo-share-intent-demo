import { useState, useEffect } from "react";

import { AppState } from "react-native";
import { Slot, usePathname, useRouter } from "expo-router";

import useShareIntent from "../hooks/useShareIntent";

export default function Layout() {
  const router = useRouter();
  const { shareIntent, resetShareIntent } = useShareIntent();

  useEffect(() => {
    if (shareIntent) {
      router.replace({ pathname: "shareintent", params: shareIntent });
      resetShareIntent();
    }
  }, [shareIntent]);

  return <Slot />;
}
