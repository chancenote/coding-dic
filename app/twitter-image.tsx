import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "찬스노트-코딩용어사전";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            fontSize: 40,
          }}
        >
          📖
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#60A5FA" }}>찬스노트</span>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#94A3B8" }}>-코딩용어사전</span>
        </div>
        <p style={{ fontSize: 24, color: "#94A3B8", textAlign: "center" }}>
          쉬운 비유와 예시 코드로 배우는 프로그래밍 용어사전
        </p>
      </div>
    ),
    { ...size }
  );
}
