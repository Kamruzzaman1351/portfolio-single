import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#080B11',
            fontSize: 20,
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px',
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
