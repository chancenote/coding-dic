import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "찬스노트-코딩용어사전";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        {/* Decorative circles */}
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
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(96, 165, 250, 0.1)",
            display: "flex",
          }}
        />

        {/* Logo icon */}
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

        {/* Title */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#60A5FA",
              letterSpacing: "-0.02em",
            }}
          >
            찬스노트
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#94A3B8",
              letterSpacing: "-0.02em",
            }}
          >
            -코딩용어사전
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "#94A3B8",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          쉬운 비유와 예시 코드로 배우는 프로그래밍 용어사전
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12 }}>
          {["60개 용어", "쉬운 비유", "코드 예시", "다크모드"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                background: "rgba(96, 165, 250, 0.15)",
                color: "#60A5FA",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Quote at bottom */}
        <p
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "#475569",
            fontStyle: "italic",
          }}
        >
          &quot;충분히 발달한 기술은 마법과 구별할 수 없다.&quot;
        </p>
      </div>
    ),
    { ...size }
  );
}
