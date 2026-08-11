// Generated from the validated EU and WW sheets of the MBE Križevci input matrix.
export type ExportRegion = "EU" | "WW";
export type ExportTier = { max: number; price: number };
export type ExportCountryTariff = {
  label: string;
  region: ExportRegion;
  gls: readonly ExportTier[];
  dpd: readonly ExportTier[];
  hp: readonly ExportTier[];
};

export const EXPORT_TARIFFS = {
  "Austria": {
    "label": "Austrija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.21
      },
      {
        "max": 3,
        "price": 5.96
      },
      {
        "max": 5,
        "price": 7.2
      },
      {
        "max": 10,
        "price": 10.33
      },
      {
        "max": 15,
        "price": 13.8
      },
      {
        "max": 20,
        "price": 17.01
      },
      {
        "max": 25,
        "price": 20.39
      },
      {
        "max": 30,
        "price": 23.64
      },
      {
        "max": 40,
        "price": 32.99
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.04
      },
      {
        "max": 10,
        "price": 6.09
      },
      {
        "max": 20,
        "price": 7.38
      },
      {
        "max": 31,
        "price": 10.17
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Belgium": {
    "label": "Belgija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.48
      },
      {
        "max": 3,
        "price": 6.57
      },
      {
        "max": 5,
        "price": 7.6
      },
      {
        "max": 10,
        "price": 9.99
      },
      {
        "max": 15,
        "price": 12.7
      },
      {
        "max": 20,
        "price": 15.17
      },
      {
        "max": 25,
        "price": 17.81
      },
      {
        "max": 30,
        "price": 20.29
      },
      {
        "max": 40,
        "price": 28.64
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.59
      },
      {
        "max": 10,
        "price": 9.56
      },
      {
        "max": 20,
        "price": 10.81
      },
      {
        "max": 31,
        "price": 18.65
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Bulgaria": {
    "label": "Bugarska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.89
      },
      {
        "max": 3,
        "price": 5.64
      },
      {
        "max": 5,
        "price": 6.36
      },
      {
        "max": 10,
        "price": 8.28
      },
      {
        "max": 15,
        "price": 10.23
      },
      {
        "max": 20,
        "price": 12.1
      },
      {
        "max": 25,
        "price": 14.21
      },
      {
        "max": 30,
        "price": 15.71
      },
      {
        "max": 40,
        "price": 22.25
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.62
      },
      {
        "max": 10,
        "price": 9.22
      },
      {
        "max": 20,
        "price": 10.39
      },
      {
        "max": 31,
        "price": 16.54
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Cyprus": {
    "label": "Cipar",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 18.67
      },
      {
        "max": 3,
        "price": 24.42
      },
      {
        "max": 5,
        "price": 35.82
      },
      {
        "max": 10,
        "price": 66.68
      },
      {
        "max": 15,
        "price": 97.54
      },
      {
        "max": 20,
        "price": 128.4
      },
      {
        "max": 25,
        "price": 159.26
      },
      {
        "max": 30,
        "price": 190.11
      },
      {
        "max": 40,
        "price": 254.05
      }
    ],
    "dpd": [],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Czech Republic": {
    "label": "Češka",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.58
      },
      {
        "max": 3,
        "price": 4.94
      },
      {
        "max": 5,
        "price": 5.34
      },
      {
        "max": 10,
        "price": 6.61
      },
      {
        "max": 15,
        "price": 7.87
      },
      {
        "max": 20,
        "price": 9.14
      },
      {
        "max": 25,
        "price": 10.4
      },
      {
        "max": 30,
        "price": 11.67
      },
      {
        "max": 40,
        "price": 16.4
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.04
      },
      {
        "max": 10,
        "price": 6.09
      },
      {
        "max": 20,
        "price": 7.38
      },
      {
        "max": 31,
        "price": 10.17
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Denmark": {
    "label": "Danska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.89
      },
      {
        "max": 3,
        "price": 6.91
      },
      {
        "max": 5,
        "price": 7.88
      },
      {
        "max": 10,
        "price": 10.25
      },
      {
        "max": 15,
        "price": 12.96
      },
      {
        "max": 20,
        "price": 15.4
      },
      {
        "max": 25,
        "price": 18.01
      },
      {
        "max": 30,
        "price": 20.51
      },
      {
        "max": 40,
        "price": 28.47
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.49
      },
      {
        "max": 10,
        "price": 8.72
      },
      {
        "max": 20,
        "price": 9.84
      },
      {
        "max": 31,
        "price": 13.5
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Estonia": {
    "label": "Estonija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.69
      },
      {
        "max": 3,
        "price": 7.63
      },
      {
        "max": 5,
        "price": 8.72
      },
      {
        "max": 10,
        "price": 10.84
      },
      {
        "max": 15,
        "price": 12.97
      },
      {
        "max": 20,
        "price": 15.1
      },
      {
        "max": 25,
        "price": 17.23
      },
      {
        "max": 30,
        "price": 19.36
      },
      {
        "max": 40,
        "price": 30.83
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 7.49
      },
      {
        "max": 10,
        "price": 10.92
      },
      {
        "max": 20,
        "price": 16.32
      },
      {
        "max": 31,
        "price": 26.9
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Finland": {
    "label": "Finska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 9.75
      },
      {
        "max": 3,
        "price": 11.37
      },
      {
        "max": 5,
        "price": 13.57
      },
      {
        "max": 10,
        "price": 18.74
      },
      {
        "max": 15,
        "price": 23.91
      },
      {
        "max": 20,
        "price": 29.09
      },
      {
        "max": 25,
        "price": 34.26
      },
      {
        "max": 30,
        "price": 39.46
      },
      {
        "max": 40,
        "price": 64.41
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 9.33
      },
      {
        "max": 10,
        "price": 13.06
      },
      {
        "max": 20,
        "price": 18.14
      },
      {
        "max": 31,
        "price": 26.38
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "France": {
    "label": "Francuska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.95
      },
      {
        "max": 3,
        "price": 8.02
      },
      {
        "max": 5,
        "price": 9.2
      },
      {
        "max": 10,
        "price": 12.22
      },
      {
        "max": 15,
        "price": 15.46
      },
      {
        "max": 20,
        "price": 18.52
      },
      {
        "max": 25,
        "price": 21.71
      },
      {
        "max": 30,
        "price": 24.8
      },
      {
        "max": 40,
        "price": 37.24
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.59
      },
      {
        "max": 10,
        "price": 10.81
      },
      {
        "max": 20,
        "price": 11.34
      },
      {
        "max": 31,
        "price": 19.56
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Germany": {
    "label": "Njemačka",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.72
      },
      {
        "max": 3,
        "price": 5.25
      },
      {
        "max": 5,
        "price": 6.05
      },
      {
        "max": 10,
        "price": 8.05
      },
      {
        "max": 15,
        "price": 10.46
      },
      {
        "max": 20,
        "price": 12.6
      },
      {
        "max": 25,
        "price": 14.43
      },
      {
        "max": 30,
        "price": 16.7
      },
      {
        "max": 40,
        "price": 27.6
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.04
      },
      {
        "max": 10,
        "price": 6.09
      },
      {
        "max": 20,
        "price": 7.38
      },
      {
        "max": 31,
        "price": 12.25
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Greece": {
    "label": "Grčka",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.96
      },
      {
        "max": 3,
        "price": 7.07
      },
      {
        "max": 5,
        "price": 8.14
      },
      {
        "max": 10,
        "price": 13.74
      },
      {
        "max": 15,
        "price": 19.34
      },
      {
        "max": 20,
        "price": 24.94
      },
      {
        "max": 25,
        "price": 30.53
      },
      {
        "max": 30,
        "price": 36.13
      },
      {
        "max": 40,
        "price": 49.66
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 10.71
      },
      {
        "max": 10,
        "price": 23.33
      },
      {
        "max": 20,
        "price": 32
      },
      {
        "max": 31,
        "price": 40
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Hungary": {
    "label": "Mađarska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.43
      },
      {
        "max": 3,
        "price": 4.58
      },
      {
        "max": 5,
        "price": 4.87
      },
      {
        "max": 10,
        "price": 5.85
      },
      {
        "max": 15,
        "price": 6.84
      },
      {
        "max": 20,
        "price": 7.83
      },
      {
        "max": 25,
        "price": 8.82
      },
      {
        "max": 30,
        "price": 9.8
      },
      {
        "max": 40,
        "price": 13
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 4.84
      },
      {
        "max": 10,
        "price": 5.97
      },
      {
        "max": 20,
        "price": 7.31
      },
      {
        "max": 31,
        "price": 10.11
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Ireland": {
    "label": "Irska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 9.35
      },
      {
        "max": 3,
        "price": 10.94
      },
      {
        "max": 5,
        "price": 13.18
      },
      {
        "max": 10,
        "price": 18.81
      },
      {
        "max": 15,
        "price": 24.65
      },
      {
        "max": 20,
        "price": 30.33
      },
      {
        "max": 25,
        "price": 36.12
      },
      {
        "max": 30,
        "price": 41.82
      },
      {
        "max": 40,
        "price": 59.15
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 7.67
      },
      {
        "max": 10,
        "price": 11.13
      },
      {
        "max": 20,
        "price": 16.63
      },
      {
        "max": 31,
        "price": 27.67
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Italy": {
    "label": "Italija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.03
      },
      {
        "max": 3,
        "price": 6.89
      },
      {
        "max": 5,
        "price": 8
      },
      {
        "max": 10,
        "price": 10.83
      },
      {
        "max": 15,
        "price": 13.87
      },
      {
        "max": 20,
        "price": 16.74
      },
      {
        "max": 25,
        "price": 19.75
      },
      {
        "max": 30,
        "price": 22.65
      },
      {
        "max": 40,
        "price": 34.7
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.49
      },
      {
        "max": 10,
        "price": 9.78
      },
      {
        "max": 20,
        "price": 10.92
      },
      {
        "max": 31,
        "price": 20.27
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Latvia": {
    "label": "Latvija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.25
      },
      {
        "max": 3,
        "price": 7.21
      },
      {
        "max": 5,
        "price": 8.12
      },
      {
        "max": 10,
        "price": 9.95
      },
      {
        "max": 15,
        "price": 11.76
      },
      {
        "max": 20,
        "price": 13.53
      },
      {
        "max": 25,
        "price": 15.53
      },
      {
        "max": 30,
        "price": 17.53
      },
      {
        "max": 40,
        "price": 26.43
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.72
      },
      {
        "max": 10,
        "price": 10.92
      },
      {
        "max": 20,
        "price": 16.11
      },
      {
        "max": 31,
        "price": 27.16
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Lithuania": {
    "label": "Litva",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.73
      },
      {
        "max": 3,
        "price": 6.51
      },
      {
        "max": 5,
        "price": 7.23
      },
      {
        "max": 10,
        "price": 8.89
      },
      {
        "max": 15,
        "price": 10.67
      },
      {
        "max": 20,
        "price": 12.28
      },
      {
        "max": 25,
        "price": 13.89
      },
      {
        "max": 30,
        "price": 15.5
      },
      {
        "max": 40,
        "price": 25.1
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.72
      },
      {
        "max": 10,
        "price": 10.92
      },
      {
        "max": 20,
        "price": 16.11
      },
      {
        "max": 31,
        "price": 27.16
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Luxembourg": {
    "label": "Luksemburg",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.62
      },
      {
        "max": 3,
        "price": 6.59
      },
      {
        "max": 5,
        "price": 7.52
      },
      {
        "max": 10,
        "price": 10.19
      },
      {
        "max": 15,
        "price": 13.28
      },
      {
        "max": 20,
        "price": 16.03
      },
      {
        "max": 25,
        "price": 19.02
      },
      {
        "max": 30,
        "price": 21.81
      },
      {
        "max": 40,
        "price": 30.48
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.49
      },
      {
        "max": 10,
        "price": 9.14
      },
      {
        "max": 20,
        "price": 10.06
      },
      {
        "max": 31,
        "price": 16.38
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Malta": {
    "label": "Malta",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 16.54
      },
      {
        "max": 3,
        "price": 21.89
      },
      {
        "max": 5,
        "price": 31.21
      },
      {
        "max": 10,
        "price": 53.57
      },
      {
        "max": 15,
        "price": 77.05
      },
      {
        "max": 20,
        "price": 99.41
      },
      {
        "max": 25,
        "price": 122.89
      },
      {
        "max": 30,
        "price": 145.26
      },
      {
        "max": 40,
        "price": 192.21
      }
    ],
    "dpd": [],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Netherlands": {
    "label": "Nizozemska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.22
      },
      {
        "max": 3,
        "price": 6.12
      },
      {
        "max": 5,
        "price": 6.92
      },
      {
        "max": 10,
        "price": 9.22
      },
      {
        "max": 15,
        "price": 11.88
      },
      {
        "max": 20,
        "price": 14.27
      },
      {
        "max": 25,
        "price": 16.84
      },
      {
        "max": 30,
        "price": 19.26
      },
      {
        "max": 40,
        "price": 26.44
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.45
      },
      {
        "max": 10,
        "price": 8.74
      },
      {
        "max": 20,
        "price": 9.96
      },
      {
        "max": 31,
        "price": 16.96
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Poland": {
    "label": "Poljska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.11
      },
      {
        "max": 3,
        "price": 4.5
      },
      {
        "max": 5,
        "price": 4.93
      },
      {
        "max": 10,
        "price": 6.05
      },
      {
        "max": 15,
        "price": 7.23
      },
      {
        "max": 20,
        "price": 8.36
      },
      {
        "max": 25,
        "price": 9.53
      },
      {
        "max": 30,
        "price": 10.67
      },
      {
        "max": 40,
        "price": 15.75
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.05
      },
      {
        "max": 10,
        "price": 6.03
      },
      {
        "max": 20,
        "price": 7.31
      },
      {
        "max": 31,
        "price": 13.34
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Portugal": {
    "label": "Portugal",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.21
      },
      {
        "max": 3,
        "price": 8.25
      },
      {
        "max": 5,
        "price": 10.24
      },
      {
        "max": 10,
        "price": 15.02
      },
      {
        "max": 15,
        "price": 20.03
      },
      {
        "max": 20,
        "price": 24.13
      },
      {
        "max": 25,
        "price": 29.64
      },
      {
        "max": 30,
        "price": 33.75
      },
      {
        "max": 40,
        "price": 46.52
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.45
      },
      {
        "max": 10,
        "price": 10.5
      },
      {
        "max": 20,
        "price": 15.94
      },
      {
        "max": 31,
        "price": 27.4
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Romania": {
    "label": "Rumunjska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 5.81
      },
      {
        "max": 3,
        "price": 6.44
      },
      {
        "max": 5,
        "price": 7.31
      },
      {
        "max": 10,
        "price": 9.75
      },
      {
        "max": 15,
        "price": 12.19
      },
      {
        "max": 20,
        "price": 14.58
      },
      {
        "max": 25,
        "price": 17.19
      },
      {
        "max": 30,
        "price": 19.24
      },
      {
        "max": 40,
        "price": 26.12
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.67
      },
      {
        "max": 10,
        "price": 9.31
      },
      {
        "max": 20,
        "price": 10.58
      },
      {
        "max": 31,
        "price": 16.54
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Slovakia": {
    "label": "Slovačka",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.1
      },
      {
        "max": 3,
        "price": 4.48
      },
      {
        "max": 5,
        "price": 4.9
      },
      {
        "max": 10,
        "price": 6.36
      },
      {
        "max": 15,
        "price": 8.15
      },
      {
        "max": 20,
        "price": 9.21
      },
      {
        "max": 25,
        "price": 10.88
      },
      {
        "max": 30,
        "price": 11.94
      },
      {
        "max": 40,
        "price": 16.78
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 5.04
      },
      {
        "max": 10,
        "price": 6.09
      },
      {
        "max": 20,
        "price": 7.38
      },
      {
        "max": 31,
        "price": 13.33
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Slovenia": {
    "label": "Slovenija",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 4.32
      },
      {
        "max": 3,
        "price": 4.43
      },
      {
        "max": 5,
        "price": 4.6
      },
      {
        "max": 10,
        "price": 5.32
      },
      {
        "max": 15,
        "price": 6.17
      },
      {
        "max": 20,
        "price": 6.94
      },
      {
        "max": 25,
        "price": 7.82
      },
      {
        "max": 30,
        "price": 8.84
      },
      {
        "max": 40,
        "price": 11.4
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 2.88
      },
      {
        "max": 20,
        "price": 3.19
      },
      {
        "max": 31,
        "price": 7.55
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 13.6
      },
      {
        "max": 2,
        "price": 14.4
      },
      {
        "max": 5,
        "price": 17.6
      },
      {
        "max": 10,
        "price": 22.4
      },
      {
        "max": 20,
        "price": 30
      },
      {
        "max": 30,
        "price": 40.4
      }
    ]
  },
  "Spain": {
    "label": "Španjolska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 6.43
      },
      {
        "max": 3,
        "price": 7.71
      },
      {
        "max": 5,
        "price": 9.13
      },
      {
        "max": 10,
        "price": 12.68
      },
      {
        "max": 15,
        "price": 16.38
      },
      {
        "max": 20,
        "price": 19.91
      },
      {
        "max": 25,
        "price": 23.72
      },
      {
        "max": 30,
        "price": 27.24
      },
      {
        "max": 40,
        "price": 41.09
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 6.39
      },
      {
        "max": 10,
        "price": 10.5
      },
      {
        "max": 20,
        "price": 11.66
      },
      {
        "max": 31,
        "price": 22.57
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Sweden": {
    "label": "Švedska",
    "region": "EU",
    "gls": [
      {
        "max": 2,
        "price": 8.36
      },
      {
        "max": 3,
        "price": 9.93
      },
      {
        "max": 5,
        "price": 11.74
      },
      {
        "max": 10,
        "price": 15.42
      },
      {
        "max": 15,
        "price": 19.48
      },
      {
        "max": 20,
        "price": 23.26
      },
      {
        "max": 25,
        "price": 27.23
      },
      {
        "max": 30,
        "price": 31.03
      },
      {
        "max": 40,
        "price": 46.81
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 8.61
      },
      {
        "max": 10,
        "price": 10.6
      },
      {
        "max": 20,
        "price": 16.26
      },
      {
        "max": 31,
        "price": 27.67
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.8
      },
      {
        "max": 2,
        "price": 24
      },
      {
        "max": 5,
        "price": 29.6
      },
      {
        "max": 10,
        "price": 37.2
      },
      {
        "max": 20,
        "price": 47.6
      },
      {
        "max": 30,
        "price": 62.4
      }
    ]
  },
  "Andorra": {
    "label": "Andora",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 49.08
      },
      {
        "max": 3,
        "price": 51.2
      },
      {
        "max": 5,
        "price": 55.37
      },
      {
        "max": 10,
        "price": 59.95
      },
      {
        "max": 15,
        "price": 69.86
      },
      {
        "max": 20,
        "price": 83.34
      },
      {
        "max": 25,
        "price": 97.86
      },
      {
        "max": 30,
        "price": 112.51
      },
      {
        "max": 40,
        "price": 139.87
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Bosnia and Herzegovina": {
    "label": "Bosna i Hercegovina",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 23.16
      },
      {
        "max": 3,
        "price": 26.8
      },
      {
        "max": 5,
        "price": 34.07
      },
      {
        "max": 10,
        "price": 52.25
      },
      {
        "max": 15,
        "price": 70.43
      },
      {
        "max": 20,
        "price": 88.61
      },
      {
        "max": 25,
        "price": 106.8
      },
      {
        "max": 30,
        "price": 124.98
      },
      {
        "max": 40,
        "price": 161.34
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 28.54
      },
      {
        "max": 5,
        "price": 34.19
      },
      {
        "max": 10,
        "price": 37.55
      },
      {
        "max": 15,
        "price": 42.12
      },
      {
        "max": 20,
        "price": 48.38
      },
      {
        "max": 25,
        "price": 55.71
      },
      {
        "max": 31,
        "price": 64.1
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Gibraltar": {
    "label": "Gibraltar",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 49.08
      },
      {
        "max": 3,
        "price": 51.2
      },
      {
        "max": 5,
        "price": 55.37
      },
      {
        "max": 10,
        "price": 59.95
      },
      {
        "max": 15,
        "price": 69.86
      },
      {
        "max": 20,
        "price": 83.34
      },
      {
        "max": 25,
        "price": 97.86
      },
      {
        "max": 30,
        "price": 112.51
      },
      {
        "max": 40,
        "price": 139.87
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Great Britain": {
    "label": "Ujedinjeno Kraljevstvo",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 6.89
      },
      {
        "max": 3,
        "price": 8.04
      },
      {
        "max": 5,
        "price": 9.36
      },
      {
        "max": 10,
        "price": 13.15
      },
      {
        "max": 15,
        "price": 17.31
      },
      {
        "max": 20,
        "price": 21.09
      },
      {
        "max": 25,
        "price": 25.85
      },
      {
        "max": 30,
        "price": 30.8
      },
      {
        "max": 40,
        "price": 42.38
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 29.15
      },
      {
        "max": 5,
        "price": 30.68
      },
      {
        "max": 10,
        "price": 33.27
      },
      {
        "max": 15,
        "price": 35.11
      },
      {
        "max": 20,
        "price": 37.4
      },
      {
        "max": 25,
        "price": 39.69
      },
      {
        "max": 31,
        "price": 41.37
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Kosovo": {
    "label": "Kosovo",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 23.16
      },
      {
        "max": 3,
        "price": 26.8
      },
      {
        "max": 5,
        "price": 34.07
      },
      {
        "max": 10,
        "price": 52.25
      },
      {
        "max": 15,
        "price": 70.43
      },
      {
        "max": 20,
        "price": 88.61
      },
      {
        "max": 25,
        "price": 106.8
      },
      {
        "max": 30,
        "price": 124.98
      },
      {
        "max": 40,
        "price": 161.34
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Liechtenstein": {
    "label": "Lihtenštajn",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 6.83
      },
      {
        "max": 3,
        "price": 7.96
      },
      {
        "max": 5,
        "price": 9.18
      },
      {
        "max": 10,
        "price": 11.81
      },
      {
        "max": 15,
        "price": 14.43
      },
      {
        "max": 20,
        "price": 17.06
      },
      {
        "max": 25,
        "price": 19.68
      },
      {
        "max": 30,
        "price": 22.3
      },
      {
        "max": 40,
        "price": 37.52
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 56.94
      },
      {
        "max": 5,
        "price": 63.49
      },
      {
        "max": 10,
        "price": 69.3
      },
      {
        "max": 15,
        "price": 76.02
      },
      {
        "max": 20,
        "price": 83.79
      },
      {
        "max": 25,
        "price": 92.64
      },
      {
        "max": 31,
        "price": 102.88
      }
    ],
    "hp": []
  },
  "North Macedonia": {
    "label": "Sjeverna Makedonija",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 23.16
      },
      {
        "max": 3,
        "price": 26.8
      },
      {
        "max": 5,
        "price": 34.07
      },
      {
        "max": 10,
        "price": 52.25
      },
      {
        "max": 15,
        "price": 70.43
      },
      {
        "max": 20,
        "price": 88.61
      },
      {
        "max": 25,
        "price": 106.8
      },
      {
        "max": 30,
        "price": 124.98
      },
      {
        "max": 40,
        "price": 161.34
      }
    ],
    "dpd": [],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Monaco": {
    "label": "Monako",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 6.92
      },
      {
        "max": 3,
        "price": 7.97
      },
      {
        "max": 5,
        "price": 9.13
      },
      {
        "max": 10,
        "price": 12.07
      },
      {
        "max": 15,
        "price": 15.23
      },
      {
        "max": 20,
        "price": 18.22
      },
      {
        "max": 25,
        "price": 21.34
      },
      {
        "max": 30,
        "price": 24.36
      },
      {
        "max": 40,
        "price": 36.64
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Montenegro": {
    "label": "Crna Gora",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 23.16
      },
      {
        "max": 3,
        "price": 26.8
      },
      {
        "max": 5,
        "price": 34.07
      },
      {
        "max": 10,
        "price": 52.25
      },
      {
        "max": 15,
        "price": 70.43
      },
      {
        "max": 20,
        "price": 88.61
      },
      {
        "max": 25,
        "price": 106.8
      },
      {
        "max": 30,
        "price": 124.98
      },
      {
        "max": 40,
        "price": 161.34
      }
    ],
    "dpd": [],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Norway": {
    "label": "Norveška",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 13.4
      },
      {
        "max": 3,
        "price": 14.93
      },
      {
        "max": 5,
        "price": 16.82
      },
      {
        "max": 10,
        "price": 20.65
      },
      {
        "max": 15,
        "price": 24.47
      },
      {
        "max": 20,
        "price": 28.29
      },
      {
        "max": 25,
        "price": 32.12
      },
      {
        "max": 30,
        "price": 35.94
      },
      {
        "max": 40,
        "price": 44.6
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 73.57
      },
      {
        "max": 5,
        "price": 83.49
      },
      {
        "max": 10,
        "price": 92.35
      },
      {
        "max": 15,
        "price": 102.57
      },
      {
        "max": 20,
        "price": 114.17
      },
      {
        "max": 25,
        "price": 127.75
      },
      {
        "max": 31,
        "price": 143.32
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "San Marino": {
    "label": "San Marino",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 8.49
      },
      {
        "max": 3,
        "price": 9.9
      },
      {
        "max": 5,
        "price": 12.21
      },
      {
        "max": 10,
        "price": 16.88
      },
      {
        "max": 15,
        "price": 21.54
      },
      {
        "max": 20,
        "price": 26.2
      },
      {
        "max": 25,
        "price": 30.86
      },
      {
        "max": 30,
        "price": 35.52
      },
      {
        "max": 40,
        "price": 47.07
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Serbia": {
    "label": "Srbija",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 5.12
      },
      {
        "max": 3,
        "price": 6.17
      },
      {
        "max": 5,
        "price": 8.34
      },
      {
        "max": 10,
        "price": 13
      },
      {
        "max": 15,
        "price": 17.66
      },
      {
        "max": 20,
        "price": 22.55
      },
      {
        "max": 25,
        "price": 27.43
      },
      {
        "max": 30,
        "price": 31.87
      },
      {
        "max": 40,
        "price": 41.42
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 28.54
      },
      {
        "max": 5,
        "price": 34.19
      },
      {
        "max": 10,
        "price": 39.38
      },
      {
        "max": 15,
        "price": 45.18
      },
      {
        "max": 20,
        "price": 51.9
      },
      {
        "max": 25,
        "price": 59.83
      },
      {
        "max": 31,
        "price": 68.84
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Switzerland": {
    "label": "Švicarska",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 6.83
      },
      {
        "max": 3,
        "price": 7.96
      },
      {
        "max": 5,
        "price": 9.18
      },
      {
        "max": 10,
        "price": 11.81
      },
      {
        "max": 15,
        "price": 14.43
      },
      {
        "max": 20,
        "price": 17.06
      },
      {
        "max": 25,
        "price": 19.68
      },
      {
        "max": 30,
        "price": 22.3
      },
      {
        "max": 40,
        "price": 37.52
      }
    ],
    "dpd": [
      {
        "max": 2,
        "price": 56.94
      },
      {
        "max": 5,
        "price": 63.49
      },
      {
        "max": 10,
        "price": 69.3
      },
      {
        "max": 15,
        "price": 76.02
      },
      {
        "max": 20,
        "price": 83.79
      },
      {
        "max": 25,
        "price": 92.64
      },
      {
        "max": 31,
        "price": 102.88
      }
    ],
    "hp": [
      {
        "max": 1,
        "price": 22.4
      },
      {
        "max": 2,
        "price": 32
      },
      {
        "max": 5,
        "price": 37.2
      },
      {
        "max": 10,
        "price": 44
      },
      {
        "max": 20,
        "price": 55.6
      },
      {
        "max": 30,
        "price": 72.6
      }
    ]
  },
  "Turkey": {
    "label": "Turska",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 34.14
      },
      {
        "max": 3,
        "price": 48.93
      },
      {
        "max": 5,
        "price": 77.66
      },
      {
        "max": 10,
        "price": 148.48
      },
      {
        "max": 15,
        "price": 219.29
      },
      {
        "max": 20,
        "price": 290.11
      },
      {
        "max": 25,
        "price": 360.93
      },
      {
        "max": 30,
        "price": 431.75
      },
      {
        "max": 40,
        "price": 574.49
      }
    ],
    "dpd": [],
    "hp": [
      {
        "max": 1,
        "price": 28.8
      },
      {
        "max": 2,
        "price": 51.2
      },
      {
        "max": 5,
        "price": 64
      },
      {
        "max": 10,
        "price": 90.4
      },
      {
        "max": 20,
        "price": 120
      },
      {
        "max": 30,
        "price": 162.4
      }
    ]
  },
  "Vatican City": {
    "label": "Vatikan",
    "region": "WW",
    "gls": [
      {
        "max": 2,
        "price": 6.3
      },
      {
        "max": 3,
        "price": 7.3
      },
      {
        "max": 5,
        "price": 8.67
      },
      {
        "max": 10,
        "price": 12.17
      },
      {
        "max": 15,
        "price": 15.89
      },
      {
        "max": 20,
        "price": 19.43
      },
      {
        "max": 25,
        "price": 23.1
      },
      {
        "max": 30,
        "price": 26.68
      },
      {
        "max": 40,
        "price": 38.96
      }
    ],
    "dpd": [],
    "hp": []
  },
  "Ukraine": {
    "label": "Ukrajina",
    "region": "WW",
    "gls": [],
    "dpd": [
      {
        "max": 2,
        "price": 28.54
      },
      {
        "max": 5,
        "price": 38.01
      },
      {
        "max": 10,
        "price": 39.99
      },
      {
        "max": 15,
        "price": 43.8
      },
      {
        "max": 20,
        "price": 48.84
      },
      {
        "max": 25,
        "price": 54.34
      },
      {
        "max": 31.5,
        "price": 59.67
      }
    ],
    "hp": []
  }
} as const satisfies Record<string, ExportCountryTariff>;

export const EXPORT_COUNTRIES = Object.entries(EXPORT_TARIFFS)
  .map(([value, tariff]) => ({ value, label: tariff.label, region: tariff.region }))
  .sort((a, b) => a.label.localeCompare(b.label, "hr"));
