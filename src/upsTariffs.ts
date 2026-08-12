// Generated from MBE UPS cjenik 2026, pages 3-4, 7-8 and 16.
// Package rates are used for all shipments; document and envelope rates are intentionally excluded.
import { EXPORT_COUNTRIES, type ExportRegion } from "./exportTariffs";

export type UpsTier = { max: number; price: number };
export type UpsOverWeightRate = { perKg: number; minimum: number };
export type UpsSaverZone = 703 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type UpsStandardZone = 703 | 1 | 2 | 3 | 4;
export type UpsCountry = {
  iso: string;
  label: string;
  region: ExportRegion;
  saverZone: UpsSaverZone | null;
  standardZone: UpsStandardZone | null;
  remotePossible: boolean;
  suspended: boolean;
  specialSaver: "BALKANS" | null;
};

// UPS Croatia fuel surcharge, effective 10 August 2026.
export const UPS_EXPRESS_SAVER_FUEL = 0.4825;
export const UPS_STANDARD_FUEL = 0.3125;
export const UPS_ADDITIONAL_HANDLING = 13.2;
export const UPS_LARGE_PACKAGE = 54.75;
export const UPS_OVER_MAXIMUM = 346.95;
export const UPS_EXPORT_CLEARANCE = 6;
export const UPS_NON_EXPRESS_CUSTOMS_BROKERAGE = 55;
export const UPS_REMOTE_RATE_PER_KG = 0.62;
export const UPS_REMOTE_MINIMUM = 31.5;

export const UPS_SAVER_PACKAGE_RATES = {
  "703": [
    {
      "max": 0.5,
      "price": 13.24
    },
    {
      "max": 1.0,
      "price": 15.51
    },
    {
      "max": 1.5,
      "price": 17.68
    },
    {
      "max": 2.0,
      "price": 19.86
    },
    {
      "max": 2.5,
      "price": 22.01
    },
    {
      "max": 3.0,
      "price": 23.65
    },
    {
      "max": 3.5,
      "price": 25.28
    },
    {
      "max": 4.0,
      "price": 26.91
    },
    {
      "max": 4.5,
      "price": 28.55
    },
    {
      "max": 5.0,
      "price": 30.18
    },
    {
      "max": 5.5,
      "price": 37.56
    },
    {
      "max": 6.0,
      "price": 39.11
    },
    {
      "max": 6.5,
      "price": 40.56
    },
    {
      "max": 7.0,
      "price": 42.11
    },
    {
      "max": 7.5,
      "price": 43.63
    },
    {
      "max": 8.0,
      "price": 45.11
    },
    {
      "max": 8.5,
      "price": 46.63
    },
    {
      "max": 9.0,
      "price": 48.19
    },
    {
      "max": 9.5,
      "price": 49.71
    },
    {
      "max": 10.0,
      "price": 51.16
    },
    {
      "max": 11.0,
      "price": 72.43
    },
    {
      "max": 12.0,
      "price": 75.47
    },
    {
      "max": 13.0,
      "price": 78.55
    },
    {
      "max": 14.0,
      "price": 81.59
    },
    {
      "max": 15.0,
      "price": 84.66
    },
    {
      "max": 16.0,
      "price": 87.71
    },
    {
      "max": 17.0,
      "price": 90.75
    },
    {
      "max": 18.0,
      "price": 93.84
    },
    {
      "max": 19.0,
      "price": 96.89
    },
    {
      "max": 20.0,
      "price": 99.96
    },
    {
      "max": 21.0,
      "price": 114.38
    },
    {
      "max": 22.0,
      "price": 117.24
    },
    {
      "max": 23.0,
      "price": 120.08
    },
    {
      "max": 24.0,
      "price": 122.96
    },
    {
      "max": 25.0,
      "price": 125.86
    },
    {
      "max": 26.0,
      "price": 128.72
    },
    {
      "max": 27.0,
      "price": 131.6
    },
    {
      "max": 28.0,
      "price": 134.42
    },
    {
      "max": 29.0,
      "price": 137.34
    },
    {
      "max": 30.0,
      "price": 140.19
    },
    {
      "max": 31.0,
      "price": 152.89
    },
    {
      "max": 32.0,
      "price": 155.82
    },
    {
      "max": 33.0,
      "price": 158.88
    },
    {
      "max": 34.0,
      "price": 161.94
    },
    {
      "max": 35.0,
      "price": 165.02
    },
    {
      "max": 40.0,
      "price": 179.06
    },
    {
      "max": 45.0,
      "price": 205.68
    },
    {
      "max": 50.0,
      "price": 220.6
    },
    {
      "max": 55.0,
      "price": 235.53
    },
    {
      "max": 60.0,
      "price": 250.44
    },
    {
      "max": 65.0,
      "price": 265.53
    },
    {
      "max": 70.0,
      "price": 280.44
    }
  ],
  "1": [
    {
      "max": 0.5,
      "price": 11.89
    },
    {
      "max": 1.0,
      "price": 14.03
    },
    {
      "max": 1.5,
      "price": 15.38
    },
    {
      "max": 2.0,
      "price": 17.38
    },
    {
      "max": 2.5,
      "price": 19.42
    },
    {
      "max": 3.0,
      "price": 20.59
    },
    {
      "max": 3.5,
      "price": 22.78
    },
    {
      "max": 4.0,
      "price": 24.03
    },
    {
      "max": 4.5,
      "price": 25.13
    },
    {
      "max": 5.0,
      "price": 26.36
    },
    {
      "max": 5.5,
      "price": 35.94
    },
    {
      "max": 6.0,
      "price": 37.54
    },
    {
      "max": 6.5,
      "price": 39.12
    },
    {
      "max": 7.0,
      "price": 40.92
    },
    {
      "max": 7.5,
      "price": 42.59
    },
    {
      "max": 8.0,
      "price": 44.4
    },
    {
      "max": 8.5,
      "price": 45.82
    },
    {
      "max": 9.0,
      "price": 47.22
    },
    {
      "max": 9.5,
      "price": 48.5
    },
    {
      "max": 10.0,
      "price": 49.88
    },
    {
      "max": 11.0,
      "price": 63.05
    },
    {
      "max": 12.0,
      "price": 65.8
    },
    {
      "max": 13.0,
      "price": 68.71
    },
    {
      "max": 14.0,
      "price": 71.61
    },
    {
      "max": 15.0,
      "price": 74.54
    },
    {
      "max": 16.0,
      "price": 77.3
    },
    {
      "max": 17.0,
      "price": 79.86
    },
    {
      "max": 18.0,
      "price": 82.63
    },
    {
      "max": 19.0,
      "price": 85.38
    },
    {
      "max": 20.0,
      "price": 88.13
    },
    {
      "max": 21.0,
      "price": 99.71
    },
    {
      "max": 22.0,
      "price": 102.56
    },
    {
      "max": 23.0,
      "price": 105.57
    },
    {
      "max": 24.0,
      "price": 108.57
    },
    {
      "max": 25.0,
      "price": 111.64
    },
    {
      "max": 26.0,
      "price": 114.44
    },
    {
      "max": 27.0,
      "price": 117.47
    },
    {
      "max": 28.0,
      "price": 120.47
    },
    {
      "max": 29.0,
      "price": 123.52
    },
    {
      "max": 30.0,
      "price": 126.51
    },
    {
      "max": 31.0,
      "price": 133.18
    },
    {
      "max": 32.0,
      "price": 136.29
    },
    {
      "max": 33.0,
      "price": 139.37
    },
    {
      "max": 34.0,
      "price": 142.52
    },
    {
      "max": 35.0,
      "price": 145.44
    },
    {
      "max": 40.0,
      "price": 160.28
    },
    {
      "max": 45.0,
      "price": 175.17
    },
    {
      "max": 50.0,
      "price": 190.0
    },
    {
      "max": 55.0,
      "price": 210.7
    },
    {
      "max": 60.0,
      "price": 225.82
    },
    {
      "max": 65.0,
      "price": 241.09
    },
    {
      "max": 70.0,
      "price": 256.38
    }
  ],
  "2": [
    {
      "max": 0.5,
      "price": 10.55
    },
    {
      "max": 1.0,
      "price": 12.59
    },
    {
      "max": 1.5,
      "price": 13.75
    },
    {
      "max": 2.0,
      "price": 15.66
    },
    {
      "max": 2.5,
      "price": 17.61
    },
    {
      "max": 3.0,
      "price": 18.44
    },
    {
      "max": 3.5,
      "price": 22.84
    },
    {
      "max": 4.0,
      "price": 23.94
    },
    {
      "max": 4.5,
      "price": 24.91
    },
    {
      "max": 5.0,
      "price": 25.99
    },
    {
      "max": 5.5,
      "price": 35.57
    },
    {
      "max": 6.0,
      "price": 37.08
    },
    {
      "max": 6.5,
      "price": 38.56
    },
    {
      "max": 7.0,
      "price": 40.01
    },
    {
      "max": 7.5,
      "price": 41.61
    },
    {
      "max": 8.0,
      "price": 43.1
    },
    {
      "max": 8.5,
      "price": 44.77
    },
    {
      "max": 9.0,
      "price": 46.11
    },
    {
      "max": 9.5,
      "price": 47.26
    },
    {
      "max": 10.0,
      "price": 48.45
    },
    {
      "max": 11.0,
      "price": 55.58
    },
    {
      "max": 12.0,
      "price": 58.27
    },
    {
      "max": 13.0,
      "price": 60.88
    },
    {
      "max": 14.0,
      "price": 63.46
    },
    {
      "max": 15.0,
      "price": 66.12
    },
    {
      "max": 16.0,
      "price": 66.12
    },
    {
      "max": 17.0,
      "price": 68.55
    },
    {
      "max": 18.0,
      "price": 70.98
    },
    {
      "max": 19.0,
      "price": 73.41
    },
    {
      "max": 20.0,
      "price": 75.71
    },
    {
      "max": 21.0,
      "price": 87.18
    },
    {
      "max": 22.0,
      "price": 89.94
    },
    {
      "max": 23.0,
      "price": 92.61
    },
    {
      "max": 24.0,
      "price": 95.31
    },
    {
      "max": 25.0,
      "price": 98.06
    },
    {
      "max": 26.0,
      "price": 100.64
    },
    {
      "max": 27.0,
      "price": 103.35
    },
    {
      "max": 28.0,
      "price": 106.08
    },
    {
      "max": 29.0,
      "price": 108.81
    },
    {
      "max": 30.0,
      "price": 111.51
    },
    {
      "max": 31.0,
      "price": 121.8
    },
    {
      "max": 32.0,
      "price": 124.55
    },
    {
      "max": 33.0,
      "price": 127.31
    },
    {
      "max": 34.0,
      "price": 130.07
    },
    {
      "max": 35.0,
      "price": 132.84
    },
    {
      "max": 40.0,
      "price": 145.85
    },
    {
      "max": 45.0,
      "price": 169.24
    },
    {
      "max": 50.0,
      "price": 183.25
    },
    {
      "max": 55.0,
      "price": 197.23
    },
    {
      "max": 60.0,
      "price": 211.07
    },
    {
      "max": 65.0,
      "price": 225.1
    },
    {
      "max": 70.0,
      "price": 239.07
    }
  ],
  "3": [
    {
      "max": 0.5,
      "price": 10.63
    },
    {
      "max": 1.0,
      "price": 13.04
    },
    {
      "max": 1.5,
      "price": 13.54
    },
    {
      "max": 2.0,
      "price": 15.59
    },
    {
      "max": 2.5,
      "price": 17.61
    },
    {
      "max": 3.0,
      "price": 19.15
    },
    {
      "max": 3.5,
      "price": 22.06
    },
    {
      "max": 4.0,
      "price": 23.68
    },
    {
      "max": 4.5,
      "price": 25.32
    },
    {
      "max": 5.0,
      "price": 26.95
    },
    {
      "max": 5.5,
      "price": 35.5
    },
    {
      "max": 6.0,
      "price": 37.12
    },
    {
      "max": 6.5,
      "price": 38.65
    },
    {
      "max": 7.0,
      "price": 40.28
    },
    {
      "max": 7.5,
      "price": 41.88
    },
    {
      "max": 8.0,
      "price": 43.44
    },
    {
      "max": 8.5,
      "price": 45.04
    },
    {
      "max": 9.0,
      "price": 46.68
    },
    {
      "max": 9.5,
      "price": 48.28
    },
    {
      "max": 10.0,
      "price": 49.8
    },
    {
      "max": 11.0,
      "price": 69.75
    },
    {
      "max": 12.0,
      "price": 72.92
    },
    {
      "max": 13.0,
      "price": 76.11
    },
    {
      "max": 14.0,
      "price": 79.26
    },
    {
      "max": 15.0,
      "price": 82.47
    },
    {
      "max": 16.0,
      "price": 82.45
    },
    {
      "max": 17.0,
      "price": 85.52
    },
    {
      "max": 18.0,
      "price": 88.58
    },
    {
      "max": 19.0,
      "price": 91.65
    },
    {
      "max": 20.0,
      "price": 94.7
    },
    {
      "max": 21.0,
      "price": 112.26
    },
    {
      "max": 22.0,
      "price": 115.23
    },
    {
      "max": 23.0,
      "price": 118.17
    },
    {
      "max": 24.0,
      "price": 121.14
    },
    {
      "max": 25.0,
      "price": 124.14
    },
    {
      "max": 26.0,
      "price": 127.09
    },
    {
      "max": 27.0,
      "price": 130.07
    },
    {
      "max": 28.0,
      "price": 132.99
    },
    {
      "max": 29.0,
      "price": 136.01
    },
    {
      "max": 30.0,
      "price": 138.96
    },
    {
      "max": 31.0,
      "price": 146.64
    },
    {
      "max": 32.0,
      "price": 149.57
    },
    {
      "max": 33.0,
      "price": 152.62
    },
    {
      "max": 34.0,
      "price": 155.7
    },
    {
      "max": 35.0,
      "price": 158.75
    },
    {
      "max": 40.0,
      "price": 172.79
    },
    {
      "max": 45.0,
      "price": 199.03
    },
    {
      "max": 50.0,
      "price": 213.96
    },
    {
      "max": 55.0,
      "price": 228.86
    },
    {
      "max": 60.0,
      "price": 243.77
    },
    {
      "max": 65.0,
      "price": 258.87
    },
    {
      "max": 70.0,
      "price": 273.77
    }
  ],
  "4": [
    {
      "max": 0.5,
      "price": 15.12
    },
    {
      "max": 1.0,
      "price": 18.85
    },
    {
      "max": 1.5,
      "price": 25.37
    },
    {
      "max": 2.0,
      "price": 29.45
    },
    {
      "max": 2.5,
      "price": 33.54
    },
    {
      "max": 3.0,
      "price": 36.74
    },
    {
      "max": 3.5,
      "price": 36.89
    },
    {
      "max": 4.0,
      "price": 39.84
    },
    {
      "max": 4.5,
      "price": 42.8
    },
    {
      "max": 5.0,
      "price": 45.76
    },
    {
      "max": 5.5,
      "price": 50.05
    },
    {
      "max": 6.0,
      "price": 52.34
    },
    {
      "max": 6.5,
      "price": 54.6
    },
    {
      "max": 7.0,
      "price": 56.87
    },
    {
      "max": 7.5,
      "price": 58.99
    },
    {
      "max": 8.0,
      "price": 61.31
    },
    {
      "max": 8.5,
      "price": 63.56
    },
    {
      "max": 9.0,
      "price": 65.81
    },
    {
      "max": 9.5,
      "price": 67.99
    },
    {
      "max": 10.0,
      "price": 70.2
    },
    {
      "max": 11.0,
      "price": 85.29
    },
    {
      "max": 12.0,
      "price": 89.95
    },
    {
      "max": 13.0,
      "price": 94.7
    },
    {
      "max": 14.0,
      "price": 99.4
    },
    {
      "max": 15.0,
      "price": 104.14
    },
    {
      "max": 16.0,
      "price": 119.74
    },
    {
      "max": 17.0,
      "price": 124.53
    },
    {
      "max": 18.0,
      "price": 129.53
    },
    {
      "max": 19.0,
      "price": 134.35
    },
    {
      "max": 20.0,
      "price": 139.14
    },
    {
      "max": 21.0,
      "price": 156.47
    },
    {
      "max": 22.0,
      "price": 160.91
    },
    {
      "max": 23.0,
      "price": 165.26
    },
    {
      "max": 24.0,
      "price": 169.5
    },
    {
      "max": 25.0,
      "price": 173.82
    },
    {
      "max": 26.0,
      "price": 178.1
    },
    {
      "max": 27.0,
      "price": 182.38
    },
    {
      "max": 28.0,
      "price": 186.69
    },
    {
      "max": 29.0,
      "price": 190.93
    },
    {
      "max": 30.0,
      "price": 195.22
    },
    {
      "max": 31.0,
      "price": 204.56
    },
    {
      "max": 32.0,
      "price": 208.3
    },
    {
      "max": 33.0,
      "price": 212.04
    },
    {
      "max": 34.0,
      "price": 215.73
    },
    {
      "max": 35.0,
      "price": 219.47
    },
    {
      "max": 40.0,
      "price": 238.78
    },
    {
      "max": 45.0,
      "price": 279.62
    },
    {
      "max": 50.0,
      "price": 300.42
    },
    {
      "max": 55.0,
      "price": 337.78
    },
    {
      "max": 60.0,
      "price": 359.77
    },
    {
      "max": 65.0,
      "price": 381.87
    },
    {
      "max": 70.0,
      "price": 403.86
    }
  ],
  "5": [
    {
      "max": 0.5,
      "price": 15.11
    },
    {
      "max": 1.0,
      "price": 19.16
    },
    {
      "max": 1.5,
      "price": 22.44
    },
    {
      "max": 2.0,
      "price": 26.05
    },
    {
      "max": 2.5,
      "price": 28.65
    },
    {
      "max": 3.0,
      "price": 29.8
    },
    {
      "max": 3.5,
      "price": 41.78
    },
    {
      "max": 4.0,
      "price": 43.34
    },
    {
      "max": 4.5,
      "price": 45.04
    },
    {
      "max": 5.0,
      "price": 46.57
    },
    {
      "max": 5.5,
      "price": 54.42
    },
    {
      "max": 6.0,
      "price": 56.14
    },
    {
      "max": 6.5,
      "price": 58.05
    },
    {
      "max": 7.0,
      "price": 59.78
    },
    {
      "max": 7.5,
      "price": 61.51
    },
    {
      "max": 8.0,
      "price": 63.4
    },
    {
      "max": 8.5,
      "price": 65.13
    },
    {
      "max": 9.0,
      "price": 67.01
    },
    {
      "max": 9.5,
      "price": 68.77
    },
    {
      "max": 10.0,
      "price": 70.64
    },
    {
      "max": 11.0,
      "price": 88.69
    },
    {
      "max": 12.0,
      "price": 92.89
    },
    {
      "max": 13.0,
      "price": 97.0
    },
    {
      "max": 14.0,
      "price": 101.15
    },
    {
      "max": 15.0,
      "price": 105.28
    },
    {
      "max": 16.0,
      "price": 119.91
    },
    {
      "max": 17.0,
      "price": 124.43
    },
    {
      "max": 18.0,
      "price": 128.73
    },
    {
      "max": 19.0,
      "price": 133.23
    },
    {
      "max": 20.0,
      "price": 137.8
    },
    {
      "max": 21.0,
      "price": 151.36
    },
    {
      "max": 22.0,
      "price": 155.98
    },
    {
      "max": 23.0,
      "price": 160.3
    },
    {
      "max": 24.0,
      "price": 164.9
    },
    {
      "max": 25.0,
      "price": 169.5
    },
    {
      "max": 26.0,
      "price": 174.08
    },
    {
      "max": 27.0,
      "price": 178.72
    },
    {
      "max": 28.0,
      "price": 183.0
    },
    {
      "max": 29.0,
      "price": 187.65
    },
    {
      "max": 30.0,
      "price": 192.25
    },
    {
      "max": 31.0,
      "price": 200.85
    },
    {
      "max": 32.0,
      "price": 205.56
    },
    {
      "max": 33.0,
      "price": 209.97
    },
    {
      "max": 34.0,
      "price": 214.66
    },
    {
      "max": 35.0,
      "price": 219.36
    },
    {
      "max": 40.0,
      "price": 241.09
    },
    {
      "max": 45.0,
      "price": 278.28
    },
    {
      "max": 50.0,
      "price": 301.26
    },
    {
      "max": 55.0,
      "price": 330.47
    },
    {
      "max": 60.0,
      "price": 353.61
    },
    {
      "max": 65.0,
      "price": 377.06
    },
    {
      "max": 70.0,
      "price": 400.51
    }
  ],
  "6": [
    {
      "max": 0.5,
      "price": 19.12
    },
    {
      "max": 1.0,
      "price": 21.96
    },
    {
      "max": 1.5,
      "price": 28.39
    },
    {
      "max": 2.0,
      "price": 31.54
    },
    {
      "max": 2.5,
      "price": 34.81
    },
    {
      "max": 3.0,
      "price": 36.74
    },
    {
      "max": 3.5,
      "price": 40.5
    },
    {
      "max": 4.0,
      "price": 42.65
    },
    {
      "max": 4.5,
      "price": 44.68
    },
    {
      "max": 5.0,
      "price": 46.82
    },
    {
      "max": 5.5,
      "price": 50.98
    },
    {
      "max": 6.0,
      "price": 53.1
    },
    {
      "max": 6.5,
      "price": 55.34
    },
    {
      "max": 7.0,
      "price": 57.53
    },
    {
      "max": 7.5,
      "price": 59.79
    },
    {
      "max": 8.0,
      "price": 61.91
    },
    {
      "max": 8.5,
      "price": 64.14
    },
    {
      "max": 9.0,
      "price": 66.37
    },
    {
      "max": 9.5,
      "price": 68.48
    },
    {
      "max": 10.0,
      "price": 70.74
    },
    {
      "max": 11.0,
      "price": 86.53
    },
    {
      "max": 12.0,
      "price": 91.13
    },
    {
      "max": 13.0,
      "price": 95.58
    },
    {
      "max": 14.0,
      "price": 99.98
    },
    {
      "max": 15.0,
      "price": 104.42
    },
    {
      "max": 16.0,
      "price": 119.44
    },
    {
      "max": 17.0,
      "price": 124.15
    },
    {
      "max": 18.0,
      "price": 128.66
    },
    {
      "max": 19.0,
      "price": 133.22
    },
    {
      "max": 20.0,
      "price": 137.75
    },
    {
      "max": 21.0,
      "price": 167.16
    },
    {
      "max": 22.0,
      "price": 171.55
    },
    {
      "max": 23.0,
      "price": 175.92
    },
    {
      "max": 24.0,
      "price": 180.27
    },
    {
      "max": 25.0,
      "price": 184.68
    },
    {
      "max": 26.0,
      "price": 188.82
    },
    {
      "max": 27.0,
      "price": 193.22
    },
    {
      "max": 28.0,
      "price": 197.59
    },
    {
      "max": 29.0,
      "price": 201.95
    },
    {
      "max": 30.0,
      "price": 206.3
    },
    {
      "max": 31.0,
      "price": 215.92
    },
    {
      "max": 32.0,
      "price": 220.16
    },
    {
      "max": 33.0,
      "price": 224.46
    },
    {
      "max": 34.0,
      "price": 228.74
    },
    {
      "max": 35.0,
      "price": 233.0
    },
    {
      "max": 40.0,
      "price": 252.55
    },
    {
      "max": 45.0,
      "price": 299.34
    },
    {
      "max": 50.0,
      "price": 320.9
    },
    {
      "max": 55.0,
      "price": 365.71
    },
    {
      "max": 60.0,
      "price": 388.72
    },
    {
      "max": 65.0,
      "price": 411.74
    },
    {
      "max": 70.0,
      "price": 434.74
    }
  ],
  "7": [
    {
      "max": 0.5,
      "price": 21.03
    },
    {
      "max": 1.0,
      "price": 24.53
    },
    {
      "max": 1.5,
      "price": 30.58
    },
    {
      "max": 2.0,
      "price": 34.42
    },
    {
      "max": 2.5,
      "price": 38.34
    },
    {
      "max": 3.0,
      "price": 40.98
    },
    {
      "max": 3.5,
      "price": 41.84
    },
    {
      "max": 4.0,
      "price": 44.44
    },
    {
      "max": 4.5,
      "price": 47.04
    },
    {
      "max": 5.0,
      "price": 49.62
    },
    {
      "max": 5.5,
      "price": 54.5
    },
    {
      "max": 6.0,
      "price": 57.2
    },
    {
      "max": 6.5,
      "price": 59.9
    },
    {
      "max": 7.0,
      "price": 62.61
    },
    {
      "max": 7.5,
      "price": 65.33
    },
    {
      "max": 8.0,
      "price": 68.05
    },
    {
      "max": 8.5,
      "price": 70.75
    },
    {
      "max": 9.0,
      "price": 73.44
    },
    {
      "max": 9.5,
      "price": 76.06
    },
    {
      "max": 10.0,
      "price": 78.76
    },
    {
      "max": 11.0,
      "price": 95.85
    },
    {
      "max": 12.0,
      "price": 100.66
    },
    {
      "max": 13.0,
      "price": 105.65
    },
    {
      "max": 14.0,
      "price": 110.48
    },
    {
      "max": 15.0,
      "price": 115.42
    },
    {
      "max": 16.0,
      "price": 124.14
    },
    {
      "max": 17.0,
      "price": 128.7
    },
    {
      "max": 18.0,
      "price": 133.43
    },
    {
      "max": 19.0,
      "price": 137.97
    },
    {
      "max": 20.0,
      "price": 142.55
    },
    {
      "max": 21.0,
      "price": 181.51
    },
    {
      "max": 22.0,
      "price": 186.09
    },
    {
      "max": 23.0,
      "price": 190.62
    },
    {
      "max": 24.0,
      "price": 195.21
    },
    {
      "max": 25.0,
      "price": 199.96
    },
    {
      "max": 26.0,
      "price": 204.54
    },
    {
      "max": 27.0,
      "price": 209.1
    },
    {
      "max": 28.0,
      "price": 213.64
    },
    {
      "max": 29.0,
      "price": 218.23
    },
    {
      "max": 30.0,
      "price": 222.8
    },
    {
      "max": 31.0,
      "price": 232.93
    },
    {
      "max": 32.0,
      "price": 236.9
    },
    {
      "max": 33.0,
      "price": 240.63
    },
    {
      "max": 34.0,
      "price": 244.57
    },
    {
      "max": 35.0,
      "price": 248.56
    },
    {
      "max": 40.0,
      "price": 269.37
    },
    {
      "max": 45.0,
      "price": 313.74
    },
    {
      "max": 50.0,
      "price": 336.1
    },
    {
      "max": 55.0,
      "price": 403.43
    },
    {
      "max": 60.0,
      "price": 428.78
    },
    {
      "max": 65.0,
      "price": 453.95
    },
    {
      "max": 70.0,
      "price": 479.29
    }
  ],
  "8": [
    {
      "max": 0.5,
      "price": 22.56
    },
    {
      "max": 1.0,
      "price": 26.25
    },
    {
      "max": 1.5,
      "price": 31.3
    },
    {
      "max": 2.0,
      "price": 35.27
    },
    {
      "max": 2.5,
      "price": 39.14
    },
    {
      "max": 3.0,
      "price": 41.78
    },
    {
      "max": 3.5,
      "price": 44.45
    },
    {
      "max": 4.0,
      "price": 47.08
    },
    {
      "max": 4.5,
      "price": 49.76
    },
    {
      "max": 5.0,
      "price": 52.38
    },
    {
      "max": 5.5,
      "price": 64.61
    },
    {
      "max": 6.0,
      "price": 67.77
    },
    {
      "max": 6.5,
      "price": 70.68
    },
    {
      "max": 7.0,
      "price": 73.81
    },
    {
      "max": 7.5,
      "price": 76.94
    },
    {
      "max": 8.0,
      "price": 80.06
    },
    {
      "max": 8.5,
      "price": 83.16
    },
    {
      "max": 9.0,
      "price": 86.3
    },
    {
      "max": 9.5,
      "price": 89.4
    },
    {
      "max": 10.0,
      "price": 92.53
    },
    {
      "max": 11.0,
      "price": 118.23
    },
    {
      "max": 12.0,
      "price": 123.97
    },
    {
      "max": 13.0,
      "price": 129.45
    },
    {
      "max": 14.0,
      "price": 135.0
    },
    {
      "max": 15.0,
      "price": 140.69
    },
    {
      "max": 16.0,
      "price": 158.92
    },
    {
      "max": 17.0,
      "price": 164.77
    },
    {
      "max": 18.0,
      "price": 170.77
    },
    {
      "max": 19.0,
      "price": 176.58
    },
    {
      "max": 20.0,
      "price": 182.39
    },
    {
      "max": 21.0,
      "price": 217.44
    },
    {
      "max": 22.0,
      "price": 222.86
    },
    {
      "max": 23.0,
      "price": 228.55
    },
    {
      "max": 24.0,
      "price": 233.99
    },
    {
      "max": 25.0,
      "price": 239.45
    },
    {
      "max": 26.0,
      "price": 244.96
    },
    {
      "max": 27.0,
      "price": 250.35
    },
    {
      "max": 28.0,
      "price": 255.83
    },
    {
      "max": 29.0,
      "price": 261.29
    },
    {
      "max": 30.0,
      "price": 266.74
    },
    {
      "max": 31.0,
      "price": 284.18
    },
    {
      "max": 32.0,
      "price": 289.19
    },
    {
      "max": 33.0,
      "price": 294.22
    },
    {
      "max": 34.0,
      "price": 299.25
    },
    {
      "max": 35.0,
      "price": 304.27
    },
    {
      "max": 40.0,
      "price": 329.19
    },
    {
      "max": 45.0,
      "price": 377.95
    },
    {
      "max": 50.0,
      "price": 404.49
    },
    {
      "max": 55.0,
      "price": 476.22
    },
    {
      "max": 60.0,
      "price": 505.81
    },
    {
      "max": 65.0,
      "price": 535.13
    },
    {
      "max": 70.0,
      "price": 564.75
    }
  ],
  "9": [
    {
      "max": 0.5,
      "price": 30.94
    },
    {
      "max": 1.0,
      "price": 36.64
    },
    {
      "max": 1.5,
      "price": 38.0
    },
    {
      "max": 2.0,
      "price": 43.02
    },
    {
      "max": 2.5,
      "price": 48.04
    },
    {
      "max": 3.0,
      "price": 51.84
    },
    {
      "max": 3.5,
      "price": 53.59
    },
    {
      "max": 4.0,
      "price": 57.24
    },
    {
      "max": 4.5,
      "price": 60.88
    },
    {
      "max": 5.0,
      "price": 64.53
    },
    {
      "max": 5.5,
      "price": 70.81
    },
    {
      "max": 6.0,
      "price": 74.6
    },
    {
      "max": 6.5,
      "price": 78.4
    },
    {
      "max": 7.0,
      "price": 82.16
    },
    {
      "max": 7.5,
      "price": 85.97
    },
    {
      "max": 8.0,
      "price": 89.78
    },
    {
      "max": 8.5,
      "price": 93.59
    },
    {
      "max": 9.0,
      "price": 97.37
    },
    {
      "max": 9.5,
      "price": 101.16
    },
    {
      "max": 10.0,
      "price": 104.94
    },
    {
      "max": 11.0,
      "price": 128.66
    },
    {
      "max": 12.0,
      "price": 134.83
    },
    {
      "max": 13.0,
      "price": 140.99
    },
    {
      "max": 14.0,
      "price": 147.15
    },
    {
      "max": 15.0,
      "price": 153.36
    },
    {
      "max": 16.0,
      "price": 169.2
    },
    {
      "max": 17.0,
      "price": 175.73
    },
    {
      "max": 18.0,
      "price": 182.29
    },
    {
      "max": 19.0,
      "price": 188.84
    },
    {
      "max": 20.0,
      "price": 195.38
    },
    {
      "max": 21.0,
      "price": 228.5
    },
    {
      "max": 22.0,
      "price": 233.66
    },
    {
      "max": 23.0,
      "price": 238.75
    },
    {
      "max": 24.0,
      "price": 243.95
    },
    {
      "max": 25.0,
      "price": 249.14
    },
    {
      "max": 26.0,
      "price": 254.31
    },
    {
      "max": 27.0,
      "price": 259.5
    },
    {
      "max": 28.0,
      "price": 264.66
    },
    {
      "max": 29.0,
      "price": 269.89
    },
    {
      "max": 30.0,
      "price": 275.08
    },
    {
      "max": 31.0,
      "price": 293.59
    },
    {
      "max": 32.0,
      "price": 298.46
    },
    {
      "max": 33.0,
      "price": 303.29
    },
    {
      "max": 34.0,
      "price": 308.14
    },
    {
      "max": 35.0,
      "price": 312.99
    },
    {
      "max": 40.0,
      "price": 336.31
    },
    {
      "max": 45.0,
      "price": 411.02
    },
    {
      "max": 50.0,
      "price": 437.73
    },
    {
      "max": 55.0,
      "price": 483.76
    },
    {
      "max": 60.0,
      "price": 511.6
    },
    {
      "max": 65.0,
      "price": 539.4
    },
    {
      "max": 70.0,
      "price": 567.24
    }
  ],
  "10": [
    {
      "max": 0.5,
      "price": 36.28
    },
    {
      "max": 1.0,
      "price": 38.44
    },
    {
      "max": 1.5,
      "price": 39.95
    },
    {
      "max": 2.0,
      "price": 45.19
    },
    {
      "max": 2.5,
      "price": 50.33
    },
    {
      "max": 3.0,
      "price": 54.26
    },
    {
      "max": 3.5,
      "price": 54.03
    },
    {
      "max": 4.0,
      "price": 57.69
    },
    {
      "max": 4.5,
      "price": 61.28
    },
    {
      "max": 5.0,
      "price": 64.93
    },
    {
      "max": 5.5,
      "price": 71.19
    },
    {
      "max": 6.0,
      "price": 74.92
    },
    {
      "max": 6.5,
      "price": 78.71
    },
    {
      "max": 7.0,
      "price": 82.48
    },
    {
      "max": 7.5,
      "price": 86.27
    },
    {
      "max": 8.0,
      "price": 90.01
    },
    {
      "max": 8.5,
      "price": 93.8
    },
    {
      "max": 9.0,
      "price": 97.55
    },
    {
      "max": 9.5,
      "price": 101.32
    },
    {
      "max": 10.0,
      "price": 105.09
    },
    {
      "max": 11.0,
      "price": 126.45
    },
    {
      "max": 12.0,
      "price": 133.32
    },
    {
      "max": 13.0,
      "price": 140.21
    },
    {
      "max": 14.0,
      "price": 147.03
    },
    {
      "max": 15.0,
      "price": 153.89
    },
    {
      "max": 16.0,
      "price": 171.34
    },
    {
      "max": 17.0,
      "price": 178.49
    },
    {
      "max": 18.0,
      "price": 185.67
    },
    {
      "max": 19.0,
      "price": 192.81
    },
    {
      "max": 20.0,
      "price": 200.0
    },
    {
      "max": 21.0,
      "price": 243.09
    },
    {
      "max": 22.0,
      "price": 248.72
    },
    {
      "max": 23.0,
      "price": 254.35
    },
    {
      "max": 24.0,
      "price": 259.96
    },
    {
      "max": 25.0,
      "price": 265.55
    },
    {
      "max": 26.0,
      "price": 271.19
    },
    {
      "max": 27.0,
      "price": 276.8
    },
    {
      "max": 28.0,
      "price": 282.38
    },
    {
      "max": 29.0,
      "price": 288.05
    },
    {
      "max": 30.0,
      "price": 293.66
    },
    {
      "max": 31.0,
      "price": 315.01
    },
    {
      "max": 32.0,
      "price": 320.92
    },
    {
      "max": 33.0,
      "price": 326.81
    },
    {
      "max": 34.0,
      "price": 332.73
    },
    {
      "max": 35.0,
      "price": 338.65
    },
    {
      "max": 40.0,
      "price": 367.81
    },
    {
      "max": 45.0,
      "price": 416.84
    },
    {
      "max": 50.0,
      "price": 447.47
    },
    {
      "max": 55.0,
      "price": 500.9
    },
    {
      "max": 60.0,
      "price": 532.95
    },
    {
      "max": 65.0,
      "price": 565.08
    },
    {
      "max": 70.0,
      "price": 597.09
    }
  ],
  "11": [
    {
      "max": 0.5,
      "price": 32.46
    },
    {
      "max": 1.0,
      "price": 38.33
    },
    {
      "max": 1.5,
      "price": 40.89
    },
    {
      "max": 2.0,
      "price": 46.44
    },
    {
      "max": 2.5,
      "price": 51.9
    },
    {
      "max": 3.0,
      "price": 56.22
    },
    {
      "max": 3.5,
      "price": 58.04
    },
    {
      "max": 4.0,
      "price": 62.16
    },
    {
      "max": 4.5,
      "price": 66.27
    },
    {
      "max": 5.0,
      "price": 70.44
    },
    {
      "max": 5.5,
      "price": 74.54
    },
    {
      "max": 6.0,
      "price": 78.67
    },
    {
      "max": 6.5,
      "price": 82.79
    },
    {
      "max": 7.0,
      "price": 86.94
    },
    {
      "max": 7.5,
      "price": 91.08
    },
    {
      "max": 8.0,
      "price": 95.21
    },
    {
      "max": 8.5,
      "price": 99.33
    },
    {
      "max": 9.0,
      "price": 103.47
    },
    {
      "max": 9.5,
      "price": 107.59
    },
    {
      "max": 10.0,
      "price": 111.74
    },
    {
      "max": 11.0,
      "price": 132.08
    },
    {
      "max": 12.0,
      "price": 138.91
    },
    {
      "max": 13.0,
      "price": 145.73
    },
    {
      "max": 14.0,
      "price": 152.55
    },
    {
      "max": 15.0,
      "price": 159.38
    },
    {
      "max": 16.0,
      "price": 172.23
    },
    {
      "max": 17.0,
      "price": 179.13
    },
    {
      "max": 18.0,
      "price": 186.1
    },
    {
      "max": 19.0,
      "price": 193.02
    },
    {
      "max": 20.0,
      "price": 199.96
    },
    {
      "max": 21.0,
      "price": 242.28
    },
    {
      "max": 22.0,
      "price": 248.89
    },
    {
      "max": 23.0,
      "price": 255.5
    },
    {
      "max": 24.0,
      "price": 262.1
    },
    {
      "max": 25.0,
      "price": 268.68
    },
    {
      "max": 26.0,
      "price": 275.3
    },
    {
      "max": 27.0,
      "price": 281.93
    },
    {
      "max": 28.0,
      "price": 288.5
    },
    {
      "max": 29.0,
      "price": 295.12
    },
    {
      "max": 30.0,
      "price": 301.76
    },
    {
      "max": 31.0,
      "price": 316.73
    },
    {
      "max": 32.0,
      "price": 322.54
    },
    {
      "max": 33.0,
      "price": 328.38
    },
    {
      "max": 34.0,
      "price": 334.2
    },
    {
      "max": 35.0,
      "price": 340.05
    },
    {
      "max": 40.0,
      "price": 370.19
    },
    {
      "max": 45.0,
      "price": 423.9
    },
    {
      "max": 50.0,
      "price": 455.79
    },
    {
      "max": 55.0,
      "price": 501.27
    },
    {
      "max": 60.0,
      "price": 534.07
    },
    {
      "max": 65.0,
      "price": 566.9
    },
    {
      "max": 70.0,
      "price": 599.66
    }
  ]
} as const satisfies Record<string, readonly UpsTier[]>;
export const UPS_SAVER_OVER_70 = {
  "703": {
    "perKg": 4.01,
    "minimum": 280.44
  },
  "1": {
    "perKg": 3.66,
    "minimum": 256.38
  },
  "2": {
    "perKg": 3.42,
    "minimum": 239.07
  },
  "3": {
    "perKg": 3.91,
    "minimum": 273.77
  },
  "4": {
    "perKg": 5.77,
    "minimum": 403.86
  },
  "5": {
    "perKg": 5.72,
    "minimum": 400.51
  },
  "6": {
    "perKg": 6.21,
    "minimum": 434.74
  },
  "7": {
    "perKg": 6.85,
    "minimum": 479.29
  },
  "8": {
    "perKg": 8.07,
    "minimum": 564.75
  },
  "9": {
    "perKg": 8.1,
    "minimum": 567.24
  },
  "10": {
    "perKg": 8.53,
    "minimum": 597.09
  },
  "11": {
    "perKg": 8.57,
    "minimum": 599.66
  }
} as const satisfies Record<string, UpsOverWeightRate>;
export const UPS_STANDARD_SINGLE_RATES = {
  "703": [
    {
      "max": 1.0,
      "price": 13.1
    },
    {
      "max": 2.0,
      "price": 13.06
    },
    {
      "max": 3.0,
      "price": 15.27
    },
    {
      "max": 4.0,
      "price": 15.24
    },
    {
      "max": 5.0,
      "price": 16.8
    },
    {
      "max": 6.0,
      "price": 19.97
    },
    {
      "max": 7.0,
      "price": 20.13
    },
    {
      "max": 8.0,
      "price": 20.27
    },
    {
      "max": 9.0,
      "price": 20.4
    },
    {
      "max": 10.0,
      "price": 20.57
    },
    {
      "max": 11.0,
      "price": 23.87
    },
    {
      "max": 12.0,
      "price": 24.03
    },
    {
      "max": 13.0,
      "price": 24.19
    },
    {
      "max": 14.0,
      "price": 24.33
    },
    {
      "max": 15.0,
      "price": 24.51
    },
    {
      "max": 16.0,
      "price": 27.89
    },
    {
      "max": 17.0,
      "price": 28.12
    },
    {
      "max": 18.0,
      "price": 28.27
    },
    {
      "max": 19.0,
      "price": 28.44
    },
    {
      "max": 20.0,
      "price": 28.63
    },
    {
      "max": 21.0,
      "price": 33.88
    },
    {
      "max": 22.0,
      "price": 34.12
    },
    {
      "max": 23.0,
      "price": 34.32
    },
    {
      "max": 24.0,
      "price": 34.56
    },
    {
      "max": 25.0,
      "price": 34.79
    },
    {
      "max": 26.0,
      "price": 35.0
    },
    {
      "max": 27.0,
      "price": 35.22
    },
    {
      "max": 28.0,
      "price": 35.46
    },
    {
      "max": 29.0,
      "price": 35.68
    },
    {
      "max": 30.0,
      "price": 35.9
    },
    {
      "max": 31.0,
      "price": 50.57
    },
    {
      "max": 32.0,
      "price": 50.84
    },
    {
      "max": 33.0,
      "price": 51.19
    },
    {
      "max": 34.0,
      "price": 51.45
    },
    {
      "max": 35.0,
      "price": 51.79
    },
    {
      "max": 40.0,
      "price": 53.21
    },
    {
      "max": 45.0,
      "price": 64.36
    },
    {
      "max": 50.0,
      "price": 66.04
    },
    {
      "max": 55.0,
      "price": 107.32
    },
    {
      "max": 60.0,
      "price": 109.57
    },
    {
      "max": 65.0,
      "price": 111.88
    },
    {
      "max": 70.0,
      "price": 114.19
    }
  ],
  "1": [
    {
      "max": 1.0,
      "price": 8.72
    },
    {
      "max": 2.0,
      "price": 11.27
    },
    {
      "max": 3.0,
      "price": 13.24
    },
    {
      "max": 4.0,
      "price": 12.71
    },
    {
      "max": 5.0,
      "price": 14.38
    },
    {
      "max": 6.0,
      "price": 15.75
    },
    {
      "max": 7.0,
      "price": 15.92
    },
    {
      "max": 8.0,
      "price": 16.1
    },
    {
      "max": 9.0,
      "price": 16.28
    },
    {
      "max": 10.0,
      "price": 16.42
    },
    {
      "max": 11.0,
      "price": 19.1
    },
    {
      "max": 12.0,
      "price": 19.24
    },
    {
      "max": 13.0,
      "price": 19.38
    },
    {
      "max": 14.0,
      "price": 19.53
    },
    {
      "max": 15.0,
      "price": 19.67
    },
    {
      "max": 16.0,
      "price": 21.11
    },
    {
      "max": 17.0,
      "price": 21.27
    },
    {
      "max": 18.0,
      "price": 21.41
    },
    {
      "max": 19.0,
      "price": 21.57
    },
    {
      "max": 20.0,
      "price": 21.71
    },
    {
      "max": 21.0,
      "price": 25.95
    },
    {
      "max": 22.0,
      "price": 26.09
    },
    {
      "max": 23.0,
      "price": 26.29
    },
    {
      "max": 24.0,
      "price": 26.43
    },
    {
      "max": 25.0,
      "price": 26.59
    },
    {
      "max": 26.0,
      "price": 26.79
    },
    {
      "max": 27.0,
      "price": 26.93
    },
    {
      "max": 28.0,
      "price": 27.09
    },
    {
      "max": 29.0,
      "price": 27.23
    },
    {
      "max": 30.0,
      "price": 27.43
    },
    {
      "max": 31.0,
      "price": 34.8
    },
    {
      "max": 32.0,
      "price": 35.04
    },
    {
      "max": 33.0,
      "price": 35.23
    },
    {
      "max": 34.0,
      "price": 35.4
    },
    {
      "max": 35.0,
      "price": 35.65
    },
    {
      "max": 40.0,
      "price": 36.6
    },
    {
      "max": 45.0,
      "price": 40.73
    },
    {
      "max": 50.0,
      "price": 41.72
    },
    {
      "max": 55.0,
      "price": 71.85
    },
    {
      "max": 60.0,
      "price": 73.58
    },
    {
      "max": 65.0,
      "price": 75.28
    },
    {
      "max": 70.0,
      "price": 77.04
    }
  ],
  "2": [
    {
      "max": 1.0,
      "price": 9.09
    },
    {
      "max": 2.0,
      "price": 11.28
    },
    {
      "max": 3.0,
      "price": 13.4
    },
    {
      "max": 4.0,
      "price": 13.69
    },
    {
      "max": 5.0,
      "price": 15.47
    },
    {
      "max": 6.0,
      "price": 16.88
    },
    {
      "max": 7.0,
      "price": 17.03
    },
    {
      "max": 8.0,
      "price": 17.15
    },
    {
      "max": 9.0,
      "price": 17.3
    },
    {
      "max": 10.0,
      "price": 17.43
    },
    {
      "max": 11.0,
      "price": 20.26
    },
    {
      "max": 12.0,
      "price": 20.44
    },
    {
      "max": 13.0,
      "price": 20.6
    },
    {
      "max": 14.0,
      "price": 20.77
    },
    {
      "max": 15.0,
      "price": 20.94
    },
    {
      "max": 16.0,
      "price": 22.48
    },
    {
      "max": 17.0,
      "price": 22.7
    },
    {
      "max": 18.0,
      "price": 22.83
    },
    {
      "max": 19.0,
      "price": 23.03
    },
    {
      "max": 20.0,
      "price": 23.22
    },
    {
      "max": 21.0,
      "price": 26.31
    },
    {
      "max": 22.0,
      "price": 26.48
    },
    {
      "max": 23.0,
      "price": 26.66
    },
    {
      "max": 24.0,
      "price": 26.86
    },
    {
      "max": 25.0,
      "price": 27.04
    },
    {
      "max": 26.0,
      "price": 27.24
    },
    {
      "max": 27.0,
      "price": 27.4
    },
    {
      "max": 28.0,
      "price": 27.6
    },
    {
      "max": 29.0,
      "price": 27.77
    },
    {
      "max": 30.0,
      "price": 27.97
    },
    {
      "max": 31.0,
      "price": 37.49
    },
    {
      "max": 32.0,
      "price": 37.78
    },
    {
      "max": 33.0,
      "price": 38.02
    },
    {
      "max": 34.0,
      "price": 38.25
    },
    {
      "max": 35.0,
      "price": 38.52
    },
    {
      "max": 40.0,
      "price": 39.86
    },
    {
      "max": 45.0,
      "price": 42.92
    },
    {
      "max": 50.0,
      "price": 44.31
    },
    {
      "max": 55.0,
      "price": 78.62
    },
    {
      "max": 60.0,
      "price": 81.09
    },
    {
      "max": 65.0,
      "price": 83.02
    },
    {
      "max": 70.0,
      "price": 85.03
    }
  ],
  "3": [
    {
      "max": 1.0,
      "price": 11.79
    },
    {
      "max": 2.0,
      "price": 12.2
    },
    {
      "max": 3.0,
      "price": 14.76
    },
    {
      "max": 4.0,
      "price": 14.01
    },
    {
      "max": 5.0,
      "price": 15.71
    },
    {
      "max": 6.0,
      "price": 19.77
    },
    {
      "max": 7.0,
      "price": 19.96
    },
    {
      "max": 8.0,
      "price": 20.12
    },
    {
      "max": 9.0,
      "price": 20.26
    },
    {
      "max": 10.0,
      "price": 20.46
    },
    {
      "max": 11.0,
      "price": 23.35
    },
    {
      "max": 12.0,
      "price": 23.53
    },
    {
      "max": 13.0,
      "price": 23.7
    },
    {
      "max": 14.0,
      "price": 23.86
    },
    {
      "max": 15.0,
      "price": 24.07
    },
    {
      "max": 16.0,
      "price": 27.05
    },
    {
      "max": 17.0,
      "price": 27.29
    },
    {
      "max": 18.0,
      "price": 27.45
    },
    {
      "max": 19.0,
      "price": 27.65
    },
    {
      "max": 20.0,
      "price": 27.85
    },
    {
      "max": 21.0,
      "price": 32.47
    },
    {
      "max": 22.0,
      "price": 32.74
    },
    {
      "max": 23.0,
      "price": 32.96
    },
    {
      "max": 24.0,
      "price": 33.21
    },
    {
      "max": 25.0,
      "price": 33.47
    },
    {
      "max": 26.0,
      "price": 33.71
    },
    {
      "max": 27.0,
      "price": 33.94
    },
    {
      "max": 28.0,
      "price": 34.22
    },
    {
      "max": 29.0,
      "price": 34.46
    },
    {
      "max": 30.0,
      "price": 34.68
    },
    {
      "max": 31.0,
      "price": 46.05
    },
    {
      "max": 32.0,
      "price": 46.34
    },
    {
      "max": 33.0,
      "price": 46.69
    },
    {
      "max": 34.0,
      "price": 46.95
    },
    {
      "max": 35.0,
      "price": 47.31
    },
    {
      "max": 40.0,
      "price": 48.79
    },
    {
      "max": 45.0,
      "price": 55.43
    },
    {
      "max": 50.0,
      "price": 57.06
    },
    {
      "max": 55.0,
      "price": 103.74
    },
    {
      "max": 60.0,
      "price": 106.18
    },
    {
      "max": 65.0,
      "price": 108.72
    },
    {
      "max": 70.0,
      "price": 111.17
    }
  ],
  "4": [
    {
      "max": 1.0,
      "price": 12.13
    },
    {
      "max": 2.0,
      "price": 13.58
    },
    {
      "max": 3.0,
      "price": 15.67
    },
    {
      "max": 4.0,
      "price": 16.5
    },
    {
      "max": 5.0,
      "price": 18.44
    },
    {
      "max": 6.0,
      "price": 22.85
    },
    {
      "max": 7.0,
      "price": 23.06
    },
    {
      "max": 8.0,
      "price": 23.24
    },
    {
      "max": 9.0,
      "price": 23.45
    },
    {
      "max": 10.0,
      "price": 23.65
    },
    {
      "max": 11.0,
      "price": 26.86
    },
    {
      "max": 12.0,
      "price": 27.1
    },
    {
      "max": 13.0,
      "price": 27.32
    },
    {
      "max": 14.0,
      "price": 27.58
    },
    {
      "max": 15.0,
      "price": 27.81
    },
    {
      "max": 16.0,
      "price": 34.31
    },
    {
      "max": 17.0,
      "price": 34.57
    },
    {
      "max": 18.0,
      "price": 34.89
    },
    {
      "max": 19.0,
      "price": 35.18
    },
    {
      "max": 20.0,
      "price": 35.48
    },
    {
      "max": 21.0,
      "price": 43.85
    },
    {
      "max": 22.0,
      "price": 44.13
    },
    {
      "max": 23.0,
      "price": 44.45
    },
    {
      "max": 24.0,
      "price": 44.75
    },
    {
      "max": 25.0,
      "price": 45.0
    },
    {
      "max": 26.0,
      "price": 45.28
    },
    {
      "max": 27.0,
      "price": 45.52
    },
    {
      "max": 28.0,
      "price": 45.8
    },
    {
      "max": 29.0,
      "price": 46.06
    },
    {
      "max": 30.0,
      "price": 46.28
    },
    {
      "max": 31.0,
      "price": 65.95
    },
    {
      "max": 32.0,
      "price": 66.81
    },
    {
      "max": 33.0,
      "price": 67.63
    },
    {
      "max": 34.0,
      "price": 68.44
    },
    {
      "max": 35.0,
      "price": 69.22
    },
    {
      "max": 40.0,
      "price": 70.04
    },
    {
      "max": 45.0,
      "price": 83.45
    },
    {
      "max": 50.0,
      "price": 85.85
    },
    {
      "max": 55.0,
      "price": 162.0
    },
    {
      "max": 60.0,
      "price": 167.98
    },
    {
      "max": 65.0,
      "price": 173.74
    },
    {
      "max": 70.0,
      "price": 179.68
    }
  ]
} as const satisfies Record<string, readonly UpsTier[]>;
export const UPS_STANDARD_MULTI_RATES = {
  "703": [
    {
      "max": 5.0,
      "price": 21.56
    },
    {
      "max": 10.0,
      "price": 25.77
    },
    {
      "max": 15.0,
      "price": 37.29
    },
    {
      "max": 20.0,
      "price": 40.29
    },
    {
      "max": 25.0,
      "price": 47.3
    },
    {
      "max": 30.0,
      "price": 48.84
    },
    {
      "max": 40.0,
      "price": 70.35
    },
    {
      "max": 50.0,
      "price": 80.71
    },
    {
      "max": 60.0,
      "price": 98.35
    },
    {
      "max": 70.0,
      "price": 102.59
    },
    {
      "max": 80.0,
      "price": 108.57
    },
    {
      "max": 90.0,
      "price": 112.78
    },
    {
      "max": 100.0,
      "price": 117.1
    }
  ],
  "1": [
    {
      "max": 5.0,
      "price": 15.82
    },
    {
      "max": 10.0,
      "price": 18.09
    },
    {
      "max": 15.0,
      "price": 24.53
    },
    {
      "max": 20.0,
      "price": 26.89
    },
    {
      "max": 25.0,
      "price": 30.8
    },
    {
      "max": 30.0,
      "price": 31.76
    },
    {
      "max": 40.0,
      "price": 45.34
    },
    {
      "max": 50.0,
      "price": 49.46
    },
    {
      "max": 60.0,
      "price": 57.86
    },
    {
      "max": 70.0,
      "price": 60.53
    },
    {
      "max": 80.0,
      "price": 64.55
    },
    {
      "max": 90.0,
      "price": 67.42
    },
    {
      "max": 100.0,
      "price": 70.38
    }
  ],
  "2": [
    {
      "max": 5.0,
      "price": 17.02
    },
    {
      "max": 10.0,
      "price": 19.18
    },
    {
      "max": 15.0,
      "price": 24.58
    },
    {
      "max": 20.0,
      "price": 27.13
    },
    {
      "max": 25.0,
      "price": 31.41
    },
    {
      "max": 30.0,
      "price": 32.51
    },
    {
      "max": 40.0,
      "price": 45.68
    },
    {
      "max": 50.0,
      "price": 50.72
    },
    {
      "max": 60.0,
      "price": 62.24
    },
    {
      "max": 70.0,
      "price": 65.26
    },
    {
      "max": 80.0,
      "price": 69.57
    },
    {
      "max": 90.0,
      "price": 72.66
    },
    {
      "max": 100.0,
      "price": 75.7
    }
  ],
  "3": [
    {
      "max": 5.0,
      "price": 20.18
    },
    {
      "max": 10.0,
      "price": 25.5
    },
    {
      "max": 15.0,
      "price": 32.71
    },
    {
      "max": 20.0,
      "price": 37.11
    },
    {
      "max": 25.0,
      "price": 41.84
    },
    {
      "max": 30.0,
      "price": 43.38
    },
    {
      "max": 40.0,
      "price": 62.94
    },
    {
      "max": 50.0,
      "price": 70.67
    },
    {
      "max": 60.0,
      "price": 87.06
    },
    {
      "max": 70.0,
      "price": 91.2
    },
    {
      "max": 80.0,
      "price": 97.04
    },
    {
      "max": 90.0,
      "price": 101.16
    },
    {
      "max": 100.0,
      "price": 105.37
    }
  ],
  "4": [
    {
      "max": 5.0,
      "price": 21.85
    },
    {
      "max": 10.0,
      "price": 27.64
    },
    {
      "max": 15.0,
      "price": 39.13
    },
    {
      "max": 20.0,
      "price": 44.37
    },
    {
      "max": 25.0,
      "price": 55.03
    },
    {
      "max": 30.0,
      "price": 56.61
    },
    {
      "max": 40.0,
      "price": 87.21
    },
    {
      "max": 50.0,
      "price": 100.94
    },
    {
      "max": 60.0,
      "price": 117.82
    },
    {
      "max": 70.0,
      "price": 126.05
    },
    {
      "max": 80.0,
      "price": 137.01
    },
    {
      "max": 90.0,
      "price": 145.43
    },
    {
      "max": 100.0,
      "price": 153.88
    }
  ]
} as const satisfies Record<string, readonly UpsTier[]>;
export const UPS_STANDARD_OVER_100 = {
  "703": {
    "perKg": 1.17,
    "minimum": 117.1
  },
  "1": {
    "perKg": 0.7,
    "minimum": 70.38
  },
  "2": {
    "perKg": 0.76,
    "minimum": 75.7
  },
  "3": {
    "perKg": 1.05,
    "minimum": 105.37
  },
  "4": {
    "perKg": 1.54,
    "minimum": 153.88
  }
} as const satisfies Record<string, UpsOverWeightRate>;
export const UPS_BALKANS_SAVER_RATES = [
  {
    "max": 0.5,
    "price": 45.86
  },
  {
    "max": 1.0,
    "price": 58.23
  },
  {
    "max": 1.5,
    "price": 68.2
  },
  {
    "max": 2.0,
    "price": 79.22
  },
  {
    "max": 2.5,
    "price": 87.12
  },
  {
    "max": 3.0,
    "price": 90.63
  },
  {
    "max": 3.5,
    "price": 94.32
  },
  {
    "max": 4.0,
    "price": 97.85
  },
  {
    "max": 4.5,
    "price": 101.7
  },
  {
    "max": 5.0,
    "price": 105.17
  },
  {
    "max": 5.5,
    "price": 108.88
  },
  {
    "max": 6.0,
    "price": 112.32
  },
  {
    "max": 6.5,
    "price": 116.12
  },
  {
    "max": 7.0,
    "price": 119.59
  },
  {
    "max": 7.5,
    "price": 123.05
  },
  {
    "max": 8.0,
    "price": 126.83
  },
  {
    "max": 8.5,
    "price": 130.32
  },
  {
    "max": 9.0,
    "price": 134.08
  },
  {
    "max": 9.5,
    "price": 137.59
  },
  {
    "max": 10.0,
    "price": 141.35
  },
  {
    "max": 11.0,
    "price": 147.92
  },
  {
    "max": 12.0,
    "price": 154.94
  },
  {
    "max": 13.0,
    "price": 161.78
  },
  {
    "max": 14.0,
    "price": 168.73
  },
  {
    "max": 15.0,
    "price": 175.59
  },
  {
    "max": 16.0,
    "price": 182.63
  },
  {
    "max": 17.0,
    "price": 189.5
  },
  {
    "max": 18.0,
    "price": 196.07
  },
  {
    "max": 19.0,
    "price": 202.91
  },
  {
    "max": 20.0,
    "price": 209.88
  },
  {
    "max": 21.0,
    "price": 216.45
  },
  {
    "max": 22.0,
    "price": 223.02
  },
  {
    "max": 23.0,
    "price": 229.21
  },
  {
    "max": 24.0,
    "price": 235.8
  },
  {
    "max": 25.0,
    "price": 242.37
  },
  {
    "max": 26.0,
    "price": 248.92
  },
  {
    "max": 27.0,
    "price": 255.56
  },
  {
    "max": 28.0,
    "price": 261.7
  },
  {
    "max": 29.0,
    "price": 268.36
  },
  {
    "max": 30.0,
    "price": 274.91
  },
  {
    "max": 31.0,
    "price": 281.48
  },
  {
    "max": 32.0,
    "price": 288.09
  },
  {
    "max": 33.0,
    "price": 294.26
  },
  {
    "max": 34.0,
    "price": 300.83
  },
  {
    "max": 35.0,
    "price": 307.42
  },
  {
    "max": 40.0,
    "price": 337.88
  },
  {
    "max": 45.0,
    "price": 367.94
  },
  {
    "max": 50.0,
    "price": 398.34
  },
  {
    "max": 55.0,
    "price": 428.87
  },
  {
    "max": 60.0,
    "price": 458.91
  },
  {
    "max": 65.0,
    "price": 489.35
  },
  {
    "max": 70.0,
    "price": 519.77
  }
] as const satisfies readonly UpsTier[];
export const UPS_BALKANS_SAVER_OVER_70 = {
  "perKg": 7.43,
  "minimum": 519.77
} as const satisfies UpsOverWeightRate;

export const UPS_COUNTRIES = {
  "AF": {
    "iso": "AF",
    "label": "Afghanistan",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AL": {
    "iso": "AL",
    "label": "Albanija",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": "BALKANS"
  },
  "DZ": {
    "iso": "DZ",
    "label": "Alžir",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AS": {
    "iso": "AS",
    "label": "Američka Samoa",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AD": {
    "iso": "AD",
    "label": "Andora",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AO": {
    "iso": "AO",
    "label": "Angola",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AI": {
    "iso": "AI",
    "label": "Anguilla",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AG": {
    "iso": "AG",
    "label": "Antigva",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AR": {
    "iso": "AR",
    "label": "Argentina",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "AM": {
    "iso": "AM",
    "label": "Armenija",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AW": {
    "iso": "AW",
    "label": "Aruba",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AU": {
    "iso": "AU",
    "label": "Australija",
    "region": "WW",
    "saverZone": 8,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "AT": {
    "iso": "AT",
    "label": "Austrija",
    "region": "EU",
    "saverZone": 1,
    "standardZone": 1,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "AZ": {
    "iso": "AZ",
    "label": "Azerbajdžan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PT": {
    "iso": "PT",
    "label": "Portugal",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "BS": {
    "iso": "BS",
    "label": "Bahami",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "BH": {
    "iso": "BH",
    "label": "Bahrein",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BD": {
    "iso": "BD",
    "label": "Bangladeš",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "BB": {
    "iso": "BB",
    "label": "Barbados",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BE": {
    "iso": "BE",
    "label": "Belgija",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BZ": {
    "iso": "BZ",
    "label": "Belize",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BJ": {
    "iso": "BJ",
    "label": "Benin",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BM": {
    "iso": "BM",
    "label": "Bermudi",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BY": {
    "iso": "BY",
    "label": "Bjelorusija",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": true,
    "specialSaver": null
  },
  "BW": {
    "iso": "BW",
    "label": "Bocvana",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BO": {
    "iso": "BO",
    "label": "Bolivija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BQ": {
    "iso": "BQ",
    "label": "Bonaire",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BA": {
    "iso": "BA",
    "label": "Bosna i Hercegovina",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": "BALKANS"
  },
  "BR": {
    "iso": "BR",
    "label": "Brazil",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "VG": {
    "iso": "VG",
    "label": "Britanski Djevičanski Otoci",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BN": {
    "iso": "BN",
    "label": "Brunej",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "BG": {
    "iso": "BG",
    "label": "Bugarska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BF": {
    "iso": "BF",
    "label": "Burkina Faso",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BI": {
    "iso": "BI",
    "label": "Burundi",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BT": {
    "iso": "BT",
    "label": "Butan",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ES": {
    "iso": "ES",
    "label": "Španjolska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "CY": {
    "iso": "CY",
    "label": "Cipar",
    "region": "EU",
    "saverZone": 4,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CK": {
    "iso": "CK",
    "label": "Cook Otočje (Kukovi Otoci)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ME": {
    "iso": "ME",
    "label": "Crna Gora",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CW": {
    "iso": "CW",
    "label": "Curaçao",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TD": {
    "iso": "TD",
    "label": "Čad",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CZ": {
    "iso": "CZ",
    "label": "Češka",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 2,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "CL": {
    "iso": "CL",
    "label": "Čile",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "DK": {
    "iso": "DK",
    "label": "Danska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "VI": {
    "iso": "VI",
    "label": "Djevičanski Otoci (Sjedinjenje Američke Države)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "DM": {
    "iso": "DM",
    "label": "Dominika",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "DO": {
    "iso": "DO",
    "label": "Dominikanska Republika",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "DJ": {
    "iso": "DJ",
    "label": "Džibuti",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "EG": {
    "iso": "EG",
    "label": "Egipat",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "EC": {
    "iso": "EC",
    "label": "Ekvador",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GQ": {
    "iso": "GQ",
    "label": "Ekvatorska Gvineja",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GB": {
    "iso": "GB",
    "label": "Ujedinjeno Kraljevstvo",
    "region": "WW",
    "saverZone": 703,
    "standardZone": 703,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "ER": {
    "iso": "ER",
    "label": "Eritreja",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "EE": {
    "iso": "EE",
    "label": "Estonija",
    "region": "EU",
    "saverZone": 4,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ET": {
    "iso": "ET",
    "label": "Etiopija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "FO": {
    "iso": "FO",
    "label": "Ferojski (Ovčji) Otoci",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "FJ": {
    "iso": "FJ",
    "label": "Fidži",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PH": {
    "iso": "PH",
    "label": "Filipini",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "FI": {
    "iso": "FI",
    "label": "Finska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "FR": {
    "iso": "FR",
    "label": "Francuska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GF": {
    "iso": "GF",
    "label": "Francuska Gvajana",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PF": {
    "iso": "PF",
    "label": "Francuska Polinezija (Tahiti)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GA": {
    "iso": "GA",
    "label": "Gabon",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GM": {
    "iso": "GM",
    "label": "Gambija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GH": {
    "iso": "GH",
    "label": "Gana",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PS": {
    "iso": "PS",
    "label": "Palestina",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GI": {
    "iso": "GI",
    "label": "Gibraltar",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GR": {
    "iso": "GR",
    "label": "Grčka",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GD": {
    "iso": "GD",
    "label": "Grenada",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GL": {
    "iso": "GL",
    "label": "Grenland",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GE": {
    "iso": "GE",
    "label": "Gruzija",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GP": {
    "iso": "GP",
    "label": "Guadeloupe",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GU": {
    "iso": "GU",
    "label": "Guam",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GG": {
    "iso": "GG",
    "label": "Guernsey (Kanalski Otoci)",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GY": {
    "iso": "GY",
    "label": "Gvajana",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GT": {
    "iso": "GT",
    "label": "Gvatemala",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "GN": {
    "iso": "GN",
    "label": "Gvineja",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "GW": {
    "iso": "GW",
    "label": "Gvineja Bisau",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "HT": {
    "iso": "HT",
    "label": "Haiti",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "HN": {
    "iso": "HN",
    "label": "Honduras",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "HK": {
    "iso": "HK",
    "label": "Hong Kong",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "HR": {
    "iso": "HR",
    "label": "Hrvatska",
    "region": "EU",
    "saverZone": 99,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "IN": {
    "iso": "IN",
    "label": "Indija",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "ID": {
    "iso": "ID",
    "label": "Indonezija",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "IQ": {
    "iso": "IQ",
    "label": "Irak",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "IE": {
    "iso": "IE",
    "label": "Irska, Republika",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "IS": {
    "iso": "IS",
    "label": "Island",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TL": {
    "iso": "TL",
    "label": "Istočni Timor",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "IT": {
    "iso": "IT",
    "label": "Italija",
    "region": "EU",
    "saverZone": 1,
    "standardZone": 1,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "IL": {
    "iso": "IL",
    "label": "Izrael",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "JM": {
    "iso": "JM",
    "label": "Jamajka",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "JP": {
    "iso": "JP",
    "label": "Japan",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "YE": {
    "iso": "YE",
    "label": "Jemen, Republika",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "JE": {
    "iso": "JE",
    "label": "Jersey (Kanalski Otoci)",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "JO": {
    "iso": "JO",
    "label": "Jordan",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "KR": {
    "iso": "KR",
    "label": "Južna Koreja",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ZA": {
    "iso": "ZA",
    "label": "Južnoafrička Republika",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KY": {
    "iso": "KY",
    "label": "Kajmanski Otoci",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "KH": {
    "iso": "KH",
    "label": "Kambodža",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "CM": {
    "iso": "CM",
    "label": "Kamerun",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CA": {
    "iso": "CA",
    "label": "Kanada",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "IC": {
    "iso": "IC",
    "label": "Kanarski Otoci",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "QA": {
    "iso": "QA",
    "label": "Katar",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "KZ": {
    "iso": "KZ",
    "label": "Kazahstan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KE": {
    "iso": "KE",
    "label": "Kenija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CN": {
    "iso": "CN",
    "label": "Kina, Narodna republika",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KG": {
    "iso": "KG",
    "label": "Kirgistan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "KI": {
    "iso": "KI",
    "label": "Kiribati",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CO": {
    "iso": "CO",
    "label": "Kolumbija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KM": {
    "iso": "KM",
    "label": "Komori",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CG": {
    "iso": "CG",
    "label": "Kongo (Brazzaville)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CD": {
    "iso": "CD",
    "label": "Kongo, Demokratska republika",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "KV": {
    "iso": "KV",
    "label": "Kosovo",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "FM": {
    "iso": "FM",
    "label": "Kosrae (Mikronezija, Federativne Države)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CR": {
    "iso": "CR",
    "label": "Kostarika",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KW": {
    "iso": "KW",
    "label": "Kuvajt",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LA": {
    "iso": "LA",
    "label": "Laos",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LV": {
    "iso": "LV",
    "label": "Latvija",
    "region": "EU",
    "saverZone": 4,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LS": {
    "iso": "LS",
    "label": "Lesoto",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LB": {
    "iso": "LB",
    "label": "Libanon",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LR": {
    "iso": "LR",
    "label": "Liberija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LY": {
    "iso": "LY",
    "label": "Libija",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LI": {
    "iso": "LI",
    "label": "Lihtenštajn",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LT": {
    "iso": "LT",
    "label": "Litva",
    "region": "EU",
    "saverZone": 4,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LU": {
    "iso": "LU",
    "label": "Luksemburg",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MG": {
    "iso": "MG",
    "label": "Madagaskar",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "HU": {
    "iso": "HU",
    "label": "Mađarska",
    "region": "EU",
    "saverZone": 1,
    "standardZone": 1,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "MO": {
    "iso": "MO",
    "label": "Makau",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MK": {
    "iso": "MK",
    "label": "Sjeverna Makedonija",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": "BALKANS"
  },
  "MW": {
    "iso": "MW",
    "label": "Malavi",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MV": {
    "iso": "MV",
    "label": "Maldivi",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MY": {
    "iso": "MY",
    "label": "Malezija",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "ML": {
    "iso": "ML",
    "label": "Mali",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MT": {
    "iso": "MT",
    "label": "Malta",
    "region": "EU",
    "saverZone": 4,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MA": {
    "iso": "MA",
    "label": "Maroko",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MH": {
    "iso": "MH",
    "label": "Maršalovi Otoci",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MQ": {
    "iso": "MQ",
    "label": "Martinik",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MU": {
    "iso": "MU",
    "label": "Mauricijus",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MR": {
    "iso": "MR",
    "label": "Mauritanija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "YT": {
    "iso": "YT",
    "label": "Mayotte",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MX": {
    "iso": "MX",
    "label": "Meksiko",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "MM": {
    "iso": "MM",
    "label": "Mjanmar",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MD": {
    "iso": "MD",
    "label": "Moldavija",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "MC": {
    "iso": "MC",
    "label": "Monako",
    "region": "WW",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MN": {
    "iso": "MN",
    "label": "Mongolija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MS": {
    "iso": "MS",
    "label": "Montserrat",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MZ": {
    "iso": "MZ",
    "label": "Mozambik",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NA": {
    "iso": "NA",
    "label": "Namibija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NP": {
    "iso": "NP",
    "label": "Nepal",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "KN": {
    "iso": "KN",
    "label": "Nevis (St. Kitts)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NE": {
    "iso": "NE",
    "label": "Niger",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NG": {
    "iso": "NG",
    "label": "Nigerija",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "NI": {
    "iso": "NI",
    "label": "Nikaragva",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NL": {
    "iso": "NL",
    "label": "Nizozemska",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 3,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "NO": {
    "iso": "NO",
    "label": "Norveška",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "NC": {
    "iso": "NC",
    "label": "Nova Kaledonija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "NZ": {
    "iso": "NZ",
    "label": "Novi Zeland",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "DE": {
    "iso": "DE",
    "label": "Njemačka",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 2,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "CI": {
    "iso": "CI",
    "label": "Obala Bjelokosti (Côte d’Ivoire)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "OM": {
    "iso": "OM",
    "label": "Oman",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PK": {
    "iso": "PK",
    "label": "Pakistan",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "PW": {
    "iso": "PW",
    "label": "Palau",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PA": {
    "iso": "PA",
    "label": "Panama",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "PG": {
    "iso": "PG",
    "label": "Papua Nova Gvineja",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PY": {
    "iso": "PY",
    "label": "Paragvaj",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "PE": {
    "iso": "PE",
    "label": "Peru",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "PL": {
    "iso": "PL",
    "label": "Poljska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "PR": {
    "iso": "PR",
    "label": "Porto Riko",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "RE": {
    "iso": "RE",
    "label": "Reunion",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "MP": {
    "iso": "MP",
    "label": "Rota (Sjeverni Marijanski Otoci)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "RW": {
    "iso": "RW",
    "label": "Ruanda",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "RO": {
    "iso": "RO",
    "label": "Rumunjska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 3,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "RU": {
    "iso": "RU",
    "label": "Rusija",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": true,
    "suspended": true,
    "specialSaver": null
  },
  "SV": {
    "iso": "SV",
    "label": "Salvador",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "WS": {
    "iso": "WS",
    "label": "Samoa",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SM": {
    "iso": "SM",
    "label": "San Marino",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "SA": {
    "iso": "SA",
    "label": "Saudijska Arabija",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SC": {
    "iso": "SC",
    "label": "Sejšeli",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SN": {
    "iso": "SN",
    "label": "Senegal",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SL": {
    "iso": "SL",
    "label": "Sijera Leone",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SG": {
    "iso": "SG",
    "label": "Singapur",
    "region": "WW",
    "saverZone": 7,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "US": {
    "iso": "US",
    "label": "Sjedinjene Američke Države",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "SK": {
    "iso": "SK",
    "label": "Slovačka",
    "region": "EU",
    "saverZone": 2,
    "standardZone": 2,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SI": {
    "iso": "SI",
    "label": "Slovenija",
    "region": "EU",
    "saverZone": 1,
    "standardZone": 1,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SB": {
    "iso": "SB",
    "label": "Solomonski Otoci",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "RS": {
    "iso": "RS",
    "label": "Srbija",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CF": {
    "iso": "CF",
    "label": "Srednjoafrička Republika",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SR": {
    "iso": "SR",
    "label": "Surinam",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SZ": {
    "iso": "SZ",
    "label": "Svazi",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LC": {
    "iso": "LC",
    "label": "St. Lucia",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "BL": {
    "iso": "BL",
    "label": "St. Barthelemy",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "SX": {
    "iso": "SX",
    "label": "St. Maarten",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "VC": {
    "iso": "VC",
    "label": "St. Vincent and the Grenadines",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "LK": {
    "iso": "LK",
    "label": "Šri Lanka",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "SE": {
    "iso": "SE",
    "label": "Švedska",
    "region": "EU",
    "saverZone": 3,
    "standardZone": 4,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "CH": {
    "iso": "CH",
    "label": "Švicarska",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "TJ": {
    "iso": "TJ",
    "label": "Tadžikistan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "TH": {
    "iso": "TH",
    "label": "Tajland",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "TW": {
    "iso": "TW",
    "label": "Tajvan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "TZ": {
    "iso": "TZ",
    "label": "Tanzanija",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TG": {
    "iso": "TG",
    "label": "Togo",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TO": {
    "iso": "TO",
    "label": "Tonga",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TT": {
    "iso": "TT",
    "label": "Trinidad i Tobago",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "TN": {
    "iso": "TN",
    "label": "Tunis",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TM": {
    "iso": "TM",
    "label": "Turkmenistan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TC": {
    "iso": "TC",
    "label": "Turks i Caicos Otoci",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TR": {
    "iso": "TR",
    "label": "Turska",
    "region": "WW",
    "saverZone": 6,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "TV": {
    "iso": "TV",
    "label": "Tuvalu",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "UG": {
    "iso": "UG",
    "label": "Uganda",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "AE": {
    "iso": "AE",
    "label": "Ujedinjeni Arapski Emirati",
    "region": "WW",
    "saverZone": 10,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "UA": {
    "iso": "UA",
    "label": "Ukrajina",
    "region": "WW",
    "saverZone": 5,
    "standardZone": null,
    "remotePossible": true,
    "suspended": true,
    "specialSaver": null
  },
  "UY": {
    "iso": "UY",
    "label": "Urugvaj",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "UZ": {
    "iso": "UZ",
    "label": "Uzbekistan",
    "region": "WW",
    "saverZone": 9,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "VU": {
    "iso": "VU",
    "label": "Vanuatu",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "VE": {
    "iso": "VE",
    "label": "Venezuela",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "VN": {
    "iso": "VN",
    "label": "Vijetnam",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": true,
    "suspended": false,
    "specialSaver": null
  },
  "WF": {
    "iso": "WF",
    "label": "Wallis i Futuna",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ZM": {
    "iso": "ZM",
    "label": "Zambia",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "CV": {
    "iso": "CV",
    "label": "Zelenortski otoci (Cape Verte Islands)",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  },
  "ZW": {
    "iso": "ZW",
    "label": "Zimbabve",
    "region": "WW",
    "saverZone": 11,
    "standardZone": null,
    "remotePossible": false,
    "suspended": false,
    "specialSaver": null
  }
} as const satisfies Record<string, UpsCountry>;

export const UPS_EXPORT_COUNTRY_ALIASES = {
  "Andorra": "AD",
  "Austria": "AT",
  "Belgium": "BE",
  "Bosnia and Herzegovina": "BA",
  "Bulgaria": "BG",
  "Cyprus": "CY",
  "Montenegro": "ME",
  "Czech Republic": "CZ",
  "Denmark": "DK",
  "Estonia": "EE",
  "Finland": "FI",
  "France": "FR",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Ireland": "IE",
  "Italy": "IT",
  "Kosovo": "KV",
  "Latvia": "LV",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Hungary": "HU",
  "Malta": "MT",
  "Monaco": "MC",
  "Netherlands": "NL",
  "Norway": "NO",
  "Germany": "DE",
  "Poland": "PL",
  "Portugal": "PT",
  "Romania": "RO",
  "San Marino": "SM",
  "North Macedonia": "MK",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Serbia": "RS",
  "Spain": "ES",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Turkey": "TR",
  "Great Britain": "GB",
  "Ukraine": "UA",
  "Vatican City": "VA"
} as const satisfies Record<string, string>;

export const getUpsCountry = (destinationCountry: string): UpsCountry | null => {
  const iso = destinationCountry.startsWith("UPS:")
    ? destinationCountry.slice(4)
    : UPS_EXPORT_COUNTRY_ALIASES[destinationCountry as keyof typeof UPS_EXPORT_COUNTRY_ALIASES];
  return iso ? UPS_COUNTRIES[iso as keyof typeof UPS_COUNTRIES] ?? null : null;
};

const existingValueByIso = Object.fromEntries(
  Object.entries(UPS_EXPORT_COUNTRY_ALIASES).map(([value, iso]) => [iso, value]),
) as Record<string, string>;

const upsDestinations = Object.values(UPS_COUNTRIES)
  .filter((country) => country.iso !== "HR")
  .filter((country) => !country.suspended || Boolean(existingValueByIso[country.iso]))
  .filter((country) => country.saverZone !== null || country.standardZone !== null || Boolean(existingValueByIso[country.iso]))
  .map((country) => ({
    value: existingValueByIso[country.iso] ?? `UPS:${country.iso}`,
    label: country.label,
    region: country.region,
  }));

const upsValues = new Set(upsDestinations.map((country) => country.value));

export const DESTINATION_COUNTRIES = [
  ...upsDestinations,
  ...EXPORT_COUNTRIES.filter((country) => !upsValues.has(country.value)),
].sort((a, b) => a.label.localeCompare(b.label, "hr"));
