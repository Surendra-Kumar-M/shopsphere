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

  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const isScanning = useRef(true);
  const scanAnim = useRef(new Animated.Value(0)).current;

  /* ---------------- PERMISSION ---------------- */
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  /* ---------------- RESET ON SCREEN FOCUS ---------------- */
  useFocusEffect(
    useCallback(() => {
      setScannedValue(null);
      isScanning.current = true;
    }, []),
  );

  /* ---------------- SCAN LINE ANIMATION ---------------- */
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 220,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
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
      setScannedValue(value);
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
        onBarcodeScanned={isScanning.current ? handleBarcodeScanned : undefined}
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
