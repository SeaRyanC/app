/**
 * Color utility functions using ICtCp and CIEDE2000 perceptual color algorithms
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Lab {
  L: number;
  a: number;
  b: number;
}

export interface ICtCp {
  I: number;
  Ct: number;
  Cp: number;
}

/**
 * Convert sRGB (0-255) to linear RGB (0-1)
 */
function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Convert RGB to XYZ (D65 illuminant)
 */
function rgbToXyz(rgb: RGB): { X: number; Y: number; Z: number } {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  return {
    X: 0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    Y: 0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
    Z: 0.0193339 * r + 0.1191920 * g + 0.9503041 * b
  };
}

/**
 * Convert XYZ to Lab (D65 illuminant)
 */
function xyzToLab(xyz: { X: number; Y: number; Z: number }): Lab {
  // D65 reference white
  const Xn = 0.95047;
  const Yn = 1.0;
  const Zn = 1.08883;

  const f = (t: number): number => {
    const delta = 6 / 29;
    return t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
  };

  const fx = f(xyz.X / Xn);
  const fy = f(xyz.Y / Yn);
  const fz = f(xyz.Z / Zn);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz)
  };
}

/**
 * Convert RGB to Lab
 */
export function rgbToLab(rgb: RGB): Lab {
  return xyzToLab(rgbToXyz(rgb));
}

/**
 * CIEDE2000 color difference formula
 * Returns a perceptual color distance value
 */
export function ciede2000(lab1: Lab, lab2: Lab): number {
  const { L: L1, a: a1, b: b1 } = lab1;
  const { L: L2, a: a2, b: b2 } = lab2;

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const Cab = (C1 + C2) / 2;

  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cab, 7) / (Math.pow(Cab, 7) + Math.pow(25, 7))));
  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);

  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  const h1p = Math.atan2(b1, a1p) * 180 / Math.PI + (b1 < 0 ? 360 : 0);
  const h2p = Math.atan2(b2, a2p) * 180 / Math.PI + (b2 < 0 ? 360 : 0);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp: number;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    dhp = h2p - h1p;
  } else if (h2p - h1p > 180) {
    dhp = h2p - h1p - 360;
  } else {
    dhp = h2p - h1p + 360;
  }

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(dhp * Math.PI / 360);

  const Lp = (L1 + L2) / 2;
  const Cp = (C1p + C2p) / 2;

  let Hp: number;
  if (C1p * C2p === 0) {
    Hp = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    Hp = (h1p + h2p) / 2;
  } else if (h1p + h2p < 360) {
    Hp = (h1p + h2p + 360) / 2;
  } else {
    Hp = (h1p + h2p - 360) / 2;
  }

  const T = 1 
    - 0.17 * Math.cos((Hp - 30) * Math.PI / 180) 
    + 0.24 * Math.cos(2 * Hp * Math.PI / 180) 
    + 0.32 * Math.cos((3 * Hp + 6) * Math.PI / 180) 
    - 0.20 * Math.cos((4 * Hp - 63) * Math.PI / 180);

  const dTheta = 30 * Math.exp(-Math.pow((Hp - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * Math.pow(Lp - 50, 2)) / Math.sqrt(20 + Math.pow(Lp - 50, 2));
  const Sc = 1 + 0.045 * Cp;
  const Sh = 1 + 0.015 * Cp * T;
  const Rt = -Math.sin(2 * dTheta * Math.PI / 180) * Rc;

  const kL = 1, kC = 1, kH = 1;

  const deltaE = Math.sqrt(
    Math.pow(dLp / (kL * Sl), 2) +
    Math.pow(dCp / (kC * Sc), 2) +
    Math.pow(dHp / (kH * Sh), 2) +
    Rt * (dCp / (kC * Sc)) * (dHp / (kH * Sh))
  );

  return deltaE;
}

/**
 * PQ transfer function (used in ICtCp)
 */
function pq(x: number): number {
  const m1 = 0.1593017578125;
  const m2 = 78.84375;
  const c1 = 0.8359375;
  const c2 = 18.8515625;
  const c3 = 18.6875;

  const xm1 = Math.pow(Math.max(0, x), m1);
  return Math.pow((c1 + c2 * xm1) / (1 + c3 * xm1), m2);
}

/**
 * Convert RGB to ICtCp
 */
export function rgbToICtCp(rgb: RGB): ICtCp {
  // Convert to linear RGB (0-1)
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  // RGB to LMS
  const L = 0.412109375 * r + 0.523925781 * g + 0.063964844 * b;
  const M = 0.166748047 * r + 0.720458984 * g + 0.112792969 * b;
  const S = 0.024047852 * r + 0.075439453 * g + 0.900512695 * b;

  // Apply PQ transfer function
  const Lp = pq(L);
  const Mp = pq(M);
  const Sp = pq(S);

  // LMS to ICtCp
  const I = 0.5 * Lp + 0.5 * Mp;
  const Ct = 1.613769531 * Lp - 3.323486328 * Mp + 1.709716797 * Sp;
  const Cp = 4.378173828 * Lp - 4.245605469 * Mp - 0.132568359 * Sp;

  return { I, Ct, Cp };
}

/**
 * ICtCp color difference
 */
export function ictcpDistance(ictcp1: ICtCp, ictcp2: ICtCp): number {
  const dI = ictcp1.I - ictcp2.I;
  const dCt = ictcp1.Ct - ictcp2.Ct;
  const dCp = ictcp1.Cp - ictcp2.Cp;
  
  // Weighted euclidean distance (weights from Rec. ITU-R BT.2124)
  return Math.sqrt(dI * dI + dCt * dCt + dCp * dCp);
}

/**
 * Combined color distance using both CIEDE2000 and ICtCp
 * Returns a normalized value where lower = more similar
 */
export function colorDistance(rgb1: RGB, rgb2: RGB): number {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);
  const ciede = ciede2000(lab1, lab2);

  const ictcp1 = rgbToICtCp(rgb1);
  const ictcp2 = rgbToICtCp(rgb2);
  const ictcp = ictcpDistance(ictcp1, ictcp2);

  // Combine both metrics (CIEDE2000 is typically 0-100, ICtCp is smaller)
  // Weight them to get a reasonable combined metric
  return (ciede + ictcp * 50) / 2;
}

/**
 * Check if two colors are "the same" given a threshold
 */
export function colorsMatch(rgb1: RGB, rgb2: RGB, threshold: number): boolean {
  return colorDistance(rgb1, rgb2) < threshold;
}

/**
 * Get the median color from an array of RGB values
 */
export function medianColor(colors: RGB[]): RGB {
  if (colors.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }

  const sortedR = [...colors].sort((a, b) => a.r - b.r);
  const sortedG = [...colors].sort((a, b) => a.g - b.g);
  const sortedB = [...colors].sort((a, b) => a.b - b.b);

  const mid = Math.floor(colors.length / 2);

  return {
    r: sortedR[mid].r,
    g: sortedG[mid].g,
    b: sortedB[mid].b
  };
}

/**
 * K-means clustering for color reduction
 */
export function kMeansCluster(colors: RGB[], k: number, maxIterations = 50): RGB[] {
  if (colors.length <= k) {
    return [...colors];
  }

  // Initialize centroids using k-means++ initialization
  const centroids: RGB[] = [];
  centroids.push(colors[Math.floor(Math.random() * colors.length)]);

  for (let i = 1; i < k; i++) {
    const distances = colors.map(color => {
      let minDist = Infinity;
      for (const centroid of centroids) {
        const dist = colorDistance(color, centroid);
        if (dist < minDist) minDist = dist;
      }
      return minDist * minDist;
    });

    const totalDist = distances.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalDist;
    
    for (let j = 0; j < colors.length; j++) {
      random -= distances[j];
      if (random <= 0) {
        centroids.push(colors[j]);
        break;
      }
    }
  }

  // Iterate
  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign colors to clusters
    const clusters: RGB[][] = Array.from({ length: k }, () => []);
    
    for (const color of colors) {
      let minDist = Infinity;
      let minIdx = 0;
      for (let i = 0; i < centroids.length; i++) {
        const dist = colorDistance(color, centroids[i]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = i;
        }
      }
      clusters[minIdx].push(color);
    }

    // Update centroids
    let changed = false;
    for (let i = 0; i < k; i++) {
      if (clusters[i].length > 0) {
        const newCentroid = medianColor(clusters[i]);
        if (newCentroid.r !== centroids[i].r || 
            newCentroid.g !== centroids[i].g || 
            newCentroid.b !== centroids[i].b) {
          centroids[i] = newCentroid;
          changed = true;
        }
      }
    }

    if (!changed) break;
  }

  return centroids;
}

/**
 * Map a color to the nearest cluster centroid
 */
export function mapToCluster(color: RGB, centroids: RGB[]): RGB {
  let minDist = Infinity;
  let nearest = centroids[0];

  for (const centroid of centroids) {
    const dist = colorDistance(color, centroid);
    if (dist < minDist) {
      minDist = dist;
      nearest = centroid;
    }
  }

  return nearest;
}
