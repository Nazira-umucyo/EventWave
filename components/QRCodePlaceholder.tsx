import { StyleSheet, View } from 'react-native';

import { Colors, Radius } from '@/constants/theme';

/**
 * Renders a QR-code-*styled* grid, built entirely from Views.
 *
 * No QR-generation library is in package.json and we were told not to add
 * dependencies, so this draws a deterministic pseudo-random module grid
 * (seeded from `value`) with the three finder squares real QR codes use,
 * so it reads visually as a ticket QR code. It does NOT encode `value` in
 * a scannable way.
 *
 * When ticket verification is wired up (Firebase-issued ticket IDs), swap
 * this for a real generator, e.g. `react-native-qrcode-svg`, passing the
 * same `value` prop in - no other change needed at the call site.
 */
type QRCodePlaceholderProps = {
  value: string;
  size?: number;
};

const GRID = 21;

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

function isFinderZone(row: number, col: number) {
  const inCorner = (r: number, c: number) => row >= r && row < r + 7 && col >= c && col < c + 7;
  return inCorner(0, 0) || inCorner(0, GRID - 7) || inCorner(GRID - 7, 0);
}

function FinderSquare({ moduleSize }: { moduleSize: number }) {
  return (
    <View style={{ width: moduleSize * 7, height: moduleSize * 7 }}>
      <View style={[styles.finderOuter, { borderWidth: moduleSize }]}>
        <View style={[styles.finderInner, { margin: moduleSize }]} />
      </View>
    </View>
  );
}

export function QRCodePlaceholder({ value, size = 180 }: QRCodePlaceholderProps) {
  const moduleSize = size / GRID;
  const random = seededRandom(hashString(value));
  const modules: boolean[][] = Array.from({ length: GRID }, () =>
    Array.from({ length: GRID }, () => random() > 0.55)
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {Array.from({ length: GRID }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: GRID }).map((_, col) => {
            if (row < 7 && col < 7) return col === 0 ? <FinderSquare key={col} moduleSize={moduleSize} /> : null;
            if (row < 7 && col >= GRID - 7)
              return col === GRID - 7 ? <FinderSquare key={col} moduleSize={moduleSize} /> : null;
            if (row >= GRID - 7 && col < 7)
              return col === 0 ? <FinderSquare key={col} moduleSize={moduleSize} /> : null;
            if (isFinderZone(row, col)) return null;

            return (
              <View
                key={col}
                style={{
                  width: moduleSize,
                  height: moduleSize,
                  backgroundColor: modules[row][col] ? Colors.textPrimary : 'transparent',
                }}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: Radius.md,
  },
  row: {
    flexDirection: 'row',
  },
  finderOuter: {
    flex: 1,
    borderColor: Colors.textPrimary,
  },
  finderInner: {
    flex: 1,
    backgroundColor: Colors.textPrimary,
  },
});
