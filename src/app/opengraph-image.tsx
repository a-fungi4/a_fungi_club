import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'A Fungi Club — Khaled Momani Portfolio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6366f1, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            A Fungi Club
          </div>
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#9ca3af',
            textAlign: 'center',
          }}
        >
          Khaled Momani — Design, Development & Creative Direction
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '24px',
            color: '#4b5563',
          }}
        >
          a-fungi.club
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
