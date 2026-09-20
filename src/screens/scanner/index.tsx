import React, { useEffect, useRef, useState, useCallback } from "react";
import { Animated, Vibration, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useRouter, useFocusEffect } from "expo-router";
import { X } from "lucide-react-native";

import { Colors } from "@/theme/colors";

import * as S from "./styles";

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  // isScanningEnabled mirrors isScanning.current for reactive JSX reads.
  // The ref is still used for instant mutation inside callbacks (no re-render
  // needed for the debounce guard). State is used only where JSX must react.
  const isScanning = useRef(true);
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);

  // Keep the Animated.Value in state so we don't access a ref.current during render.
  const [scanAnim] = useState(() => new Animated.Value(0));

  /* ---------------- PERMISSION ---------------- */
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  /* ---------------- RESET ON SCREEN FOCUS ---------------- */
  useFocusEffect(
    useCallback(() => {
      isScanning.current = true;
      setIsScanningEnabled(true);
    }, []),
  );

  /* ---------------- SCAN LINE ANIMATION ---------------- */
  useEffect(() => {
    const anim = scanAnim;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 220,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [scanAnim]);

  /* ---------------- BARCODE SCANNER HANDLER ---------------- */
  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (!isScanning.current) return;

      const value = result.data;
      if (!value) return;

      isScanning.current = false;
      setIsScanningEnabled(false);
      Vibration.vibrate(80);

      setTimeout(() => {
        router.push({
          pathname: "/scan-result",
          params: { code: value },
        });
      }, 400);
    },
    [router],
  );

  /* ---------------- UI STATES ---------------- */
  if (!permission || !permission.granted) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>Requesting camera permission…</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128"],
        }}
        onBarcodeScanned={isScanningEnabled ? handleBarcodeScanned : undefined}
      />

      {/* Overlay */}
      <S.Overlay>
        <S.ScanBox>
          <Animated.View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#00FF9C",
              transform: [{ translateY: scanAnim }],
            }}
          />
        </S.ScanBox>
        <S.Hint>Align barcode within frame</S.Hint>
      </S.Overlay>

      {/* Close button */}
      <S.CloseButton onPress={() => router.back()}>
        <X size={20} color={Colors.white} />
      </S.CloseButton>
    </S.Container>
  );
}
