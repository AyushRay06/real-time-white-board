// Auto-generated from Excalidraw libraries - true to source with natural dimensions
import { SysComponent } from "@/types/canvas"

export interface ExcalidrawLibraryItem {
  id: string
  name: string
  componentType: SysComponent
  category: string
  pack: string
  width: number
  height: number
  svg: string
}

export const EXCALIDRAW_PACKS = [
  "All",
  "AWS Serverless",
  "System Design",
  "Architecture",
  "Draw.io",
  "Software Patterns",
] as const

export type ExcalidrawPackName = typeof EXCALIDRAW_PACKS[number]

export const EXCALIDRAW_LIBRARY_ITEMS: ExcalidrawLibraryItem[] = [
  {
    id: "drwnio-0",
    name: "Storage Bucket",
    componentType: SysComponent.ObjectStorage,
    category: "Storage",
    pack: "Draw.io",
    width: 96,
    height: 77,
    svg: "<svg viewBox=\"533.6 197.6 370.5 300.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 579.7 278.6 L 579.7 429.9 L 585.9 460.5 L 600.3 479.2 L 624.7 491.1 L 652.2 491.7 L 785.3 492.4 L 815.9 489.9 L 836.6 477.4 L 849.7 454.2 L 852.2 424.2 L 850.9 278.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 638.6 304.1 L 776.6 303.1 L 807.6 309.1 L 807.1 339.6 L 781.6 348.6 L 654.6 347.1 L 626.6 336.6 L 625.6 313.6 L 638.6 304.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 580.6 280.1 L 732.1 281.1 L 878.6 276.6 L 898.1 239.5 L 883.6 208.4 L 820.1 205.1 L 609.1 203.6 L 550.6 209.1 L 539.6 243.1 L 550.6 274.1 L 580.6 280.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-1",
    name: "SQL Database",
    componentType: SysComponent.Database,
    category: "Database",
    pack: "Draw.io",
    width: 96,
    height: 124,
    svg: "<svg viewBox=\"982.4 41.1 211.1 269.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 988.4 87.6 L 988.9 113.8 L 990.2 140.5 L 1012.7 161.6 L 1056.0 172.2 L 1118.7 172.2 L 1161.6 162.6 L 1184.8 144.4 L 1187.6 113.8 L 1184.3 83.5 L 1158.1 58.2 L 1112.7 47.1 L 1055.5 48.1 L 1010.7 62.8 L 988.4 87.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1087.1\" cy=\"83.2\" rx=\"81.2\" ry=\"31.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 989.3 158.5 L 989.7 183.7 L 993.0 211.9 L 1017.4 229.8 L 1059.7 239.4 L 1120.9 239.1 L 1158.9 231.9 L 1181.2 216.5 L 1185.4 189.2 L 1184.7 161.1 L 1178.9 164.7 L 1156.0 175.4 L 1118.1 182.5 L 1062.8 183.2 L 1018.5 175.0 L 989.3 158.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 989.4 226.3 L 989.8 250.7 L 993.1 278.2 L 1017.5 295.6 L 1059.8 304.9 L 1121.0 304.6 L 1159.0 297.6 L 1181.3 282.6 L 1185.5 256.1 L 1184.8 228.7 L 1179.0 232.3 L 1156.1 242.7 L 1118.2 249.6 L 1062.9 250.3 L 1018.6 242.3 L 989.4 226.3 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-2",
    name: "Server Cluster",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"499.6 138.8 315.3 188.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"505.6\" y=\"268.5\" width=\"55.2\" height=\"52.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"569.4\" y=\"267.7\" width=\"53.0\" height=\"53.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"632.8\" y=\"268.6\" width=\"52.2\" height=\"52.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"694.4\" y=\"268.0\" width=\"52.2\" height=\"52.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"756.8\" y=\"268.6\" width=\"52.2\" height=\"52.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"693.6\" y=\"206.4\" width=\"53.0\" height=\"53.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"634.2\" y=\"209.5\" width=\"50.4\" height=\"50.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"570.5\" y=\"209.1\" width=\"50.4\" height=\"50.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"692.7\" y=\"144.8\" width=\"53.0\" height=\"53.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-3",
    name: "JSON Data Service",
    componentType: SysComponent.WorkerService,
    category: "Data",
    pack: "Draw.io",
    width: 96,
    height: 110,
    svg: "<svg viewBox=\"550.8 58.8 360.4 411.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 793.4 65.2 L 794.4 97.2 L 802.5 125.1 L 832.2 132.2 L 864.5 129.9 L 842.2 106.5 L 815.8 82.3 L 793.4 65.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 793.3 65.4 L 586.9 65.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 587.4 65.4 L 587.4 463.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 587.1 463.8 L 865.9 463.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 791.5 64.8 L 865.3 131.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 595.5 297.9 L 724.9 297.9 L 871.9 298.8 L 895.4 305.2 L 904.7 328.7 L 905.2 371.2 L 897.8 398.1 L 871.9 405.4 L 726.3 406.4 L 593.6 405.4 L 567.6 397.1 L 556.8 373.1 L 557.8 329.1 L 569.6 304.7 L 595.5 297.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"77.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"625.9\" y=\"375.3\">JSON</tspan></text><path d=\"M 616.5 135.4 L 768.7 135.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 616.7 163.5 L 814.0 163.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 616.7 192.1 L 814.1 192.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 616.8 220.8 L 814.1 220.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 616.5 252.8 L 813.9 252.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-4",
    name: "Kubernetes Cluster",
    componentType: SysComponent.Kubernetes,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 94,
    svg: "<svg viewBox=\"469.7 65.4 452.6 443.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 695.1 71.4 L 513.2 158.4 L 475.7 344.4 L 601.3 502.6 L 812.2 501.7 L 916.3 332.3 L 875.1 149.1 L 695.1 71.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(0.58 826.23 343.22)\"><path d=\"M 660.7 178.4 L 684.3 170.8 L 686.5 158.6 L 683.4 124.1 L 699.1 122.8 L 698.4 159.1 L 704.2 170.3 L 729.7 175.6 L 765.3 189.1 L 790.5 206.6 L 800.1 204.4 L 823.1 186.5 L 830.3 193.1 L 807.5 211.5 L 803.7 221.3 L 819.3 250.7 L 828.9 284.5 L 829.9 317.7 L 837.2 323.9 L 866.7 327.2 L 865.1 339.0 L 835.5 333.5 L 826.3 335.7 L 812.4 363.2 L 792.4 387.2 L 764.2 409.7 L 767.8 419.3 L 786.2 445.8 L 773.9 452.5 L 760.6 423.3 L 749.2 415.1 L 716.5 424.0 L 671.9 423.1 L 643.9 411.3 L 635.6 417.6 L 620.7 445.3 L 610.4 438.3 L 628.0 412.6 L 629.5 402.7 L 607.5 385.9 L 587.4 358.1 L 578.6 339.0 L 567.0 337.8 L 537.4 345.9 L 535.6 333.1 L 565.3 329.3 L 573.7 322.1 L 573.8 282.7 L 581.5 252.6 L 595.8 227.1 L 589.1 217.3 L 560.5 202.1 L 567.8 190.1 L 593.3 210.5 L 606.7 211.7 L 629.6 193.4 L 660.7 178.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 622.8 225.6 L 642.8 207.4 L 663.4 194.8 L 687.6 193.0 L 690.1 226.5 L 685.6 260.3 L 653.1 244.6 L 622.8 225.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(56.62 728.30 252.37)\"><path d=\"M 694.2 217.6 L 713.9 199.7 L 734.1 187.4 L 755.3 183.9 L 762.4 216.3 L 759.6 253.5 L 724.0 236.3 L 694.2 217.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(107.77 780.03 304.12)\"><path d=\"M 746.5 268.9 L 766.5 250.9 L 786.5 238.5 L 811.0 236.5 L 813.6 269.9 L 807.0 306.8 L 776.4 290.1 L 746.5 268.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(163.12 768.01 376.87)\"><path d=\"M 735.9 340.4 L 748.4 326.3 L 770.6 310.4 L 793.9 307.0 L 800.1 342.0 L 796.9 380.0 L 765.1 364.0 L 735.9 340.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(216.28 705.83 414.94)\"><path d=\"M 673.0 377.2 L 689.6 360.9 L 710.3 345.5 L 732.7 339.6 L 736.8 377.2 L 738.7 415.1 L 705.4 397.5 L 673.0 377.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(272.71 636.33 380.94)\"><path d=\"M 603.8 348.9 L 616.7 330.7 L 637.2 315.3 L 655.2 314.1 L 667.6 344.0 L 668.9 378.1 L 633.7 370.1 L 603.8 348.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(323.45 621.43 317.49)\"><path d=\"M 584.9 282.2 L 597.8 263.9 L 618.2 248.5 L 638.7 244.1 L 650.2 275.9 L 658.0 314.8 L 620.7 302.1 L 584.9 282.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><ellipse cx=\"704.1\" cy=\"295.7\" rx=\"14.7\" ry=\"14.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#326ce5\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-5",
    name: "Backend Engine",
    componentType: SysComponent.Microservice,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 76,
    svg: "<svg viewBox=\"765.2 313.4 338.1 269.6\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"936.5,423.0 1097.3,489.1 936.5,555.3 775.7,489.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#c6302b\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 773.7 488.4 L 773.7 499.7 L 780.4 510.4 L 842.1 538.1 L 909.7 568.3 L 936.6 577.0 L 960.9 568.9 L 1029.8 540.3 L 1086.9 512.3 L 1094.0 500.7 L 1091.5 489.1 L 1065.3 501.3 L 951.5 548.1 L 919.4 546.9 L 773.7 488.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#912626\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 773.2 438.9 L 773.2 450.2 L 779.9 460.9 L 841.6 488.6 L 909.2 518.8 L 936.1 527.5 L 960.4 519.4 L 1029.3 490.8 L 1086.4 462.8 L 1093.5 451.2 L 1091.0 439.6 L 1064.8 451.8 L 951.0 498.6 L 918.9 497.4 L 773.2 438.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#912626\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"934.5,372.0 1095.3,438.1 934.5,504.3 773.7,438.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#c6302b\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"932.5,319.4 1093.2,385.6 932.5,451.7 771.7,385.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#c6302b\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 771.2 386.3 L 771.2 397.7 L 777.9 408.3 L 839.5 436.1 L 907.1 466.3 L 934.0 475.0 L 958.4 466.8 L 1027.3 438.2 L 1084.4 410.2 L 1091.5 398.7 L 1089.0 387.0 L 1062.7 399.3 L 949.0 446.0 L 916.8 444.8 L 771.2 386.3 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#912626\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"863.9\" cy=\"384.9\" rx=\"34.7\" ry=\"15.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 893.4 416.0 L 938.0 430.9 L 953.4 402.6 L 893.4 416.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 915.4 339.6 L 920.9 351.8 L 904.7 361.4 L 924.5 363.2 L 935.5 376.1 L 938.4 361.0 L 962.7 357.5 L 941.9 351.1 L 948.3 336.7 L 930.8 344.7 L 915.4 339.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1006.5 368.4 L 1044.0 383.4 L 1005.0 398.4 L 969.0 383.4 L 1006.5 368.4 L 1006.5 368.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#912626\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1002.6 367.5 L 1003.4 397.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-6",
    name: "App Service",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 110,
    svg: "<svg viewBox=\"591.0 177.6 198.0 224.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 691.1 183.6 L 597.0 237.7 L 597.0 340.9 L 691.6 396.4 L 783.0 336.3 L 783.0 234.0 L 691.1 183.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#40c057\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 660.2 266.7 L 660.7 298.2 L 659.4 332.6 L 643.8 331.0 L 640.8 281.9 L 645.8 243.6 L 664.2 242.4 L 690.3 275.0 L 716.9 307.1 L 720.1 245.1 L 735.1 242.9 L 738.0 283.0 L 734.1 329.2 L 711.7 331.9 L 682.9 298.8 L 660.2 266.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-7",
    name: "Cloud Compute",
    componentType: SysComponent.Serverless,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 98,
    svg: "<svg viewBox=\"234.2 45.1 409.5 417.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 241.6 290.4 L 242.7 392.8 L 251.7 450.5 L 318.5 455.8 L 455.4 456.9 L 587.6 456.5 L 633.1 439.1 L 637.8 380.4 L 636.4 285.0 L 626.8 236.7 L 588.3 219.8 L 535.5 219.1 L 478.7 212.9 L 473.4 139.0 L 469.5 66.3 L 435.3 51.1 L 398.3 65.7 L 395.6 140.6 L 391.3 212.0 L 355.6 222.8 L 320.6 210.8 L 317.3 140.3 L 314.2 68.6 L 277.7 54.3 L 244.0 69.1 L 240.2 163.7 L 241.6 290.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fd7e14\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 489.8 321.5 L 497.8 306.3 L 515.1 301.1 L 543.7 300.2 L 563.0 308.0 L 568.0 329.6 L 568.0 351.9 L 564.6 372.4 L 546.4 378.1 L 514.8 378.4 L 495.5 371.1 L 491.5 350.8 L 489.8 321.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-8",
    name: "Microservice Mesh",
    componentType: SysComponent.Microservice,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 95,
    svg: "<svg viewBox=\"445.2 335.0 405.7 402.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 603.5 341.1 L 618.9 342.1 L 621.8 366.6 L 622.2 430.0 L 612.6 439.0 L 604.7 426.8 L 603.5 341.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 640.8 341.0 L 656.2 342.0 L 659.1 366.5 L 659.5 429.9 L 649.9 438.9 L 642.0 426.7 L 640.8 341.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 676.4 341.0 L 691.8 342.1 L 694.7 366.6 L 695.1 430.0 L 685.5 439.0 L 677.6 426.8 L 676.4 341.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 603.5 633.1 L 618.9 634.1 L 621.8 658.6 L 622.2 722.0 L 612.6 731.0 L 604.7 718.8 L 603.5 633.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 640.8 633.0 L 656.2 634.0 L 659.1 658.5 L 659.5 721.9 L 649.9 730.9 L 642.0 718.7 L 640.8 633.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 676.4 633.0 L 691.8 634.1 L 694.7 658.6 L 695.1 722.0 L 685.5 731.0 L 677.6 718.8 L 676.4 633.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(90.00 794.66 500.49)\"><path d=\"M 785.3 451.5 L 800.7 452.6 L 803.6 477.1 L 804.0 540.4 L 794.5 549.5 L 786.6 537.2 L 785.3 451.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 795.84 537.89)\"><path d=\"M 786.5 488.9 L 801.9 490.0 L 804.8 514.5 L 805.2 577.8 L 795.6 586.9 L 787.7 574.6 L 786.5 488.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 795.46 572.70)\"><path d=\"M 786.1 523.7 L 801.5 524.8 L 804.4 549.3 L 804.8 612.6 L 795.3 621.7 L 787.4 609.4 L 786.1 523.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 500.16 500.49)\"><path d=\"M 490.8 451.5 L 506.2 452.6 L 509.1 477.1 L 509.5 540.4 L 500.0 549.5 L 492.1 537.2 L 490.8 451.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 501.34 537.89)\"><path d=\"M 492.0 488.9 L 507.4 490.0 L 510.3 514.5 L 510.7 577.8 L 501.1 586.9 L 493.2 574.6 L 492.0 488.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 500.96 572.70)\"><path d=\"M 491.6 523.7 L 507.0 524.8 L 509.9 549.3 L 510.3 612.6 L 500.8 621.7 L 492.9 609.4 L 491.6 523.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 607.2 450.9 L 692.9 450.4 L 711.4 454.4 L 724.8 461.4 L 731.3 477.9 L 732.8 493.9 L 730.8 579.4 L 732.3 596.9 L 723.8 609.4 L 710.4 614.9 L 693.9 616.4 L 603.7 617.4 L 589.3 614.4 L 575.8 607.9 L 567.4 594.4 L 566.4 579.4 L 566.4 491.4 L 568.4 472.4 L 576.3 459.4 L 590.5 452.2 L 607.2 450.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-9",
    name: "Message Queue",
    componentType: SysComponent.MessageQueue,
    category: "Messaging",
    pack: "Draw.io",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"572.6 45.6 464.7 464.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 655.1 337.9 L 657.6 247.3 L 679.9 178.6 L 726.0 134.1 L 776.8 116.7 L 831.0 115.5 L 890.7 137.1 L 929.4 188.1 L 947.3 256.5 L 949.7 325.3 L 925.7 333.5 L 907.1 332.5 L 903.1 308.6 L 896.2 227.5 L 865.1 173.4 L 801.7 158.1 L 738.6 176.6 L 701.1 238.6 L 699.1 321.5 L 694.1 337.4 L 673.3 339.9 L 655.1 337.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"805.0\" cy=\"278.0\" rx=\"226.4\" ry=\"226.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 613.8 400.1 L 614.1 357.1 L 640.8 333.2 L 705.3 329.9 L 905.2 327.7 L 957.2 327.7 L 983.8 340.6 L 998.7 364.0 L 997.1 395.5 L 971.3 432.5 L 917.7 475.4 L 860.7 497.7 L 789.7 503.5 L 703.1 480.1 L 649.4 438.5 L 613.8 400.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 654.7 442.9 L 651.2 376.4 L 662.7 358.4 L 690.2 354.9 L 846.7 353.9 L 846.2 364.4 L 823.7 366.9 L 701.7 369.4 L 669.2 374.9 L 665.7 408.4 L 668.7 456.9 L 654.7 442.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-10",
    name: "Go Worker",
    componentType: SysComponent.WorkerService,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"566.9 429.7 459.0 459.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"796.4\" cy=\"659.2\" rx=\"223.5\" ry=\"223.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#62a1d6\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 631.9 583.5 L 633.1 716.0 L 702.6 716.6 L 703.7 665.7 L 842.6 763.0 L 832.6 781.6 L 878.5 790.2 L 878.5 809.9 L 930.7 807.2 L 930.8 753.3 L 878.8 753.9 L 878.6 769.7 L 858.8 737.3 L 848.9 751.2 L 729.4 661.4 L 830.9 661.2 L 830.3 675.7 L 874.9 661.2 L 874.9 687.0 L 930.2 686.6 L 930.8 630.8 L 875.1 630.8 L 874.3 648.1 L 830.4 630.4 L 831.4 642.3 L 730.6 641.2 L 845.5 574.4 L 854.3 587.7 L 874.7 557.0 L 874.9 574.2 L 929.7 574.7 L 929.4 517.4 L 873.4 516.7 L 872.9 540.0 L 832.3 546.7 L 838.2 563.1 L 703.2 640.1 L 701.4 583.5 L 631.9 583.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-11",
    name: "Docker Container",
    componentType: SysComponent.Docker,
    category: "Compute",
    pack: "Draw.io",
    width: 160,
    height: 64,
    svg: "<svg viewBox=\"145.5 506.9 577.6 194.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 300.5 512.9 L 325.5 546.9 L 206.5 613.9 L 332.5 653.9 L 319.5 694.9 L 151.5 639.9 L 151.5 586.9 L 300.5 512.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 559.8 512.9 L 533.4 546.9 L 659.0 613.9 L 526.0 653.9 L 539.7 694.9 L 717.1 639.9 L 717.1 586.9 L 559.8 512.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-12",
    name: "Load Balancer",
    componentType: SysComponent.LoadBalancer,
    category: "Networking",
    pack: "Draw.io",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"287.6 591.6 250.7 251.6\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 444.2 606.9 L 419.9 599.7 L 401.5 603.8 L 384.2 608.1 L 330.7 598.9 L 293.6 623.1 L 294.6 681.0 L 316.6 741.1 L 345.5 772.8 L 374.6 739.2 L 390.5 739.4 L 396.0 744.4 L 389.2 752.0 L 380.1 757.1 L 365.3 765.4 L 387.1 768.3 L 402.7 767.2 L 412.2 769.9 L 418.5 811.5 L 432.7 837.1 L 466.3 829.0 L 476.7 805.8 L 477.7 771.0 L 482.1 758.0 L 507.7 757.6 L 525.9 743.7 L 505.6 741.7 L 492.9 732.5 L 510.2 700.6 L 528.3 660.1 L 532.3 616.6 L 503.1 600.0 L 469.1 597.6 L 444.2 606.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 390.0 608.5 L 373.8 625.3 L 365.8 655.6 L 369.3 690.5 L 364.6 710.9 L 369.6 727.0 L 381.8 735.3 L 397.7 742.1 L 411.3 746.5 L 415.7 757.6 L 408.8 764.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 443.3 606.9 L 456.5 609.6 L 476.8 625.6 L 486.1 658.7 L 483.8 690.2 L 490.8 714.4 L 485.3 731.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 366.5 668.4 L 379.3 661.9 L 395.3 660.2 L 404.3 673.5 L 404.3 699.6 L 398.8 719.0 L 395.7 740.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(358.19 488.56 662.37)\"><path d=\"M 470.6 658.5 L 464.4 661.8 L 471.0 666.2 L 476.7 659.9 L 470.6 658.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(14.80 408.11 668.86)\"><path d=\"M 390.0 665.2 L 383.6 668.3 L 389.2 672.5 L 394.7 671.3 L 396.7 665.5 L 390.0 665.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "drwnio-13",
    name: "Compute Instance",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"639.5 172.5 335.5 335.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"807.2\" cy=\"340.3\" rx=\"161.8\" ry=\"161.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 743.7 243.4 L 759.4 249.0 L 770.0 260.3 L 784.5 255.6 L 824.8 256.1 L 837.3 257.4 L 847.1 249.6 L 860.6 240.2 L 864.3 253.1 L 863.9 265.7 L 876.3 277.5 L 881.8 311.4 L 877.5 347.0 L 864.9 360.8 L 847.7 368.2 L 829.2 372.3 L 834.1 376.9 L 839.6 387.1 L 840.8 419.1 L 840.6 438.5 L 834.5 441.9 L 788.8 442.6 L 783.1 437.0 L 781.5 414.2 L 771.0 417.2 L 753.5 418.3 L 737.2 408.9 L 727.1 392.6 L 717.2 382.5 L 706.6 375.5 L 721.1 376.9 L 731.3 384.8 L 742.9 395.8 L 757.1 402.7 L 772.7 400.7 L 780.5 394.6 L 781.2 385.1 L 785.4 376.7 L 790.8 373.0 L 770.4 367.7 L 750.8 361.3 L 740.8 346.7 L 733.4 311.8 L 739.3 278.9 L 747.8 269.9 L 742.9 257.6 L 743.7 243.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-14",
    name: "Event Bus",
    componentType: SysComponent.EventStreaming,
    category: "Messaging",
    pack: "Draw.io",
    width: 160,
    height: 78,
    svg: "<svg viewBox=\"200.3 610.3 424.9 213.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 206.3 630.0 L 207.4 662.7 L 213.7 679.6 L 251.7 681.7 L 395.0 682.4 L 555.0 682.6 L 598.9 682.7 L 613.0 677.4 L 618.5 665.3 L 619.2 641.3 L 614.7 627.2 L 599.2 619.5 L 554.9 617.7 L 393.3 617.0 L 248.5 616.3 L 214.4 618.4 L 206.3 630.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 230.2 630.9 L 409.2 631.2 L 451.4 635.7 L 458.6 650.8 L 450.5 666.6 L 413.5 667.3 L 272.2 666.7 L 227.8 663.5 L 224.3 638.3 L 230.2 630.9 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 521.6 639.4 L 529.1 630.5 L 555.9 633.2 L 558.6 650.4 L 555.4 665.5 L 529.1 666.4 L 522.3 659.6 L 521.4 645.6 L 521.6 639.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 568.7 639.3 L 573.4 631.8 L 603.1 633.2 L 605.8 650.4 L 602.2 666.9 L 577.3 666.7 L 569.4 661.3 L 568.8 649.5 L 568.7 639.3 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 206.3 698.5 L 207.4 731.2 L 213.7 748.1 L 251.7 750.2 L 395.0 750.9 L 555.0 751.0 L 598.9 751.1 L 613.0 745.9 L 618.5 733.8 L 619.2 709.8 L 614.7 695.7 L 599.2 688.0 L 554.9 686.2 L 393.3 685.5 L 248.5 684.8 L 214.4 686.9 L 206.3 698.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 230.2 699.4 L 409.2 699.7 L 451.4 704.2 L 458.6 719.2 L 450.5 735.1 L 413.5 735.7 L 272.2 735.2 L 227.8 732.0 L 224.3 706.7 L 230.2 699.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 521.6 707.8 L 529.1 699.0 L 555.9 701.7 L 558.6 718.9 L 555.4 734.0 L 529.1 734.9 L 522.3 728.1 L 521.4 714.1 L 521.6 707.8 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 568.7 707.8 L 573.4 700.3 L 603.1 701.6 L 605.8 718.8 L 602.2 735.3 L 577.3 735.2 L 569.4 729.8 L 568.8 717.9 L 568.7 707.8 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 206.3 765.4 L 207.4 798.1 L 213.7 815.0 L 251.7 817.1 L 395.0 817.8 L 555.0 818.0 L 598.9 818.1 L 613.0 812.8 L 618.5 800.7 L 619.2 776.7 L 614.7 762.6 L 599.2 754.9 L 554.9 753.1 L 393.3 752.4 L 248.5 751.7 L 214.4 753.8 L 206.3 765.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 230.2 766.3 L 409.2 766.6 L 451.4 771.1 L 458.6 786.2 L 450.5 802.0 L 413.5 802.7 L 272.2 802.1 L 227.8 798.9 L 224.3 773.7 L 230.2 766.3 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 521.6 774.8 L 529.1 765.9 L 555.9 768.6 L 558.6 785.8 L 555.4 800.9 L 529.1 801.8 L 522.3 795.0 L 521.4 781.0 L 521.6 774.8 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 568.7 774.7 L 573.4 767.2 L 603.1 768.6 L 605.8 785.8 L 602.2 802.3 L 577.3 802.1 L 569.4 796.7 L 568.8 784.8 L 568.7 774.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-15",
    name: "Python Engine",
    componentType: SysComponent.StreamProcessing,
    category: "Compute",
    pack: "Draw.io",
    width: 96,
    height: 68,
    svg: "<svg viewBox=\"-141.3 17.7 784.3 558.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 1.5 91.7 L -70.4 90.9 L -80.8 86.8 L -79.9 54.7 L -66.8 34.4 L -39.1 25.5 L -0.0 23.7 L 37.0 24.4 L 62.1 33.4 L 76.7 54.5 L 78.1 97.0 L 75.2 135.8 L 61.3 157.0 L 35.6 165.9 L -5.1 166.0 L -40.5 167.2 L -64.8 178.1 L -75.0 199.8 L -75.7 220.9 L -79.0 227.9 L -101.4 228.3 L -120.9 217.7 L -131.4 198.3 L -135.3 162.0 L -130.9 130.9 L -117.2 111.0 L -91.5 102.5 L -41.3 101.9 L -7.7 102.2 L 1.6 100.6 L 1.5 91.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#228be6\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 283.63 340.92)\"><path d=\"M 69.0 179.7 L -4.0 178.9 L -14.5 174.8 L -13.5 142.7 L -0.3 122.3 L 27.9 113.5 L 67.5 111.7 L 105.1 112.4 L 129.1 121.4 L 143.0 142.5 L 144.4 186.8 L 142.8 226.0 L 129.3 247.6 L 104.1 254.7 L 62.4 253.5 L 25.5 255.7 L 2.2 267.5 L -10.9 286.9 L -13.1 307.1 L -15.5 315.9 L -35.4 316.3 L -55.2 305.7 L -65.9 286.3 L -69.8 249.9 L -65.4 218.8 L -51.5 199.0 L -25.4 190.4 L 25.6 189.9 L 59.7 190.2 L 69.1 188.6 L 69.0 179.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><ellipse cx=\"-50.7\" cy=\"60.9\" rx=\"13.4\" ry=\"13.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"55.3\" cy=\"276.8\" rx=\"14.4\" ry=\"14.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-16",
    name: "Cloud CDN",
    componentType: SysComponent.CDN,
    category: "Networking",
    pack: "Draw.io",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"216.4 418.9 495.1 334.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 238.2 479.0 L 693.1 479.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"261.7\" cy=\"454.2\" rx=\"8.9\" ry=\"8.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"287.4\" cy=\"454.2\" rx=\"8.9\" ry=\"8.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"312.1\" cy=\"454.2\" rx=\"8.9\" ry=\"8.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 222.7 584.1 L 223.2 519.2 L 223.4 455.0 L 229.8 428.8 L 258.0 424.9 L 373.8 425.7 L 530.6 425.1 L 674.4 425.7 L 700.3 430.6 L 705.6 455.6 L 704.4 523.8 L 704.2 590.4 L 703.3 651.9 L 704.8 718.8 L 701.6 745.1 L 675.5 747.6 L 548.2 746.9 L 370.4 744.8 L 256.2 745.1 L 226.4 742.6 L 223.1 715.0 L 222.4 650.9 L 222.7 584.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 511.2 441.4 L 655.8 441.4 L 677.1 446.1 L 677.1 460.9 L 656.3 462.6 L 511.2 463.1 L 377.0 462.6 L 351.2 462.6 L 349.8 446.5 L 371.5 441.4 L 511.2 441.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "drwnio-17",
    name: "DNS Resolver",
    componentType: SysComponent.DNS,
    category: "Networking",
    pack: "Draw.io",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"89.6 -20.6 300.2 300.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"240.6\" cy=\"128.4\" rx=\"143.0\" ry=\"143.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 138.8 27.1 L 182.3 51.6 L 240.8 63.3 L 296.4 48.2 L 334.6 20.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 141.8 229.4 L 185.3 210.4 L 243.9 201.2 L 299.4 213.0 L 337.7 234.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"73.6\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"236.0\" y=\"153.2\">DNS</tspan></text><path d=\"M 234.6 -14.4 L 196.7 15.1 L 177.4 55.7 L 170.9 83.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 167.8 176.7 L 178.8 214.5 L 204.7 252.3 L 234.2 273.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 244.2 -12.7 L 281.7 16.5 L 300.8 56.7 L 307.2 84.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 314.6 172.5 L 303.6 209.9 L 280.1 249.2 L 251.2 270.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 240.3 -14.3 L 242.9 88.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 241.8 271.4 L 240.9 174.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 95.6 127.3 L 149.1 129.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 383.8 129.3 L 326.6 128.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-0",
    name: "AWS Lambda",
    componentType: SysComponent.Serverless,
    category: "Compute",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"1014.8 310.9 76.5 76.4\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1020.8\" y=\"316.9\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fd7e1488\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1045.8 343.6 L 1033.1 369.1 L 1045.3 370.5 L 1052.4 356.8 L 1046.7 344.2 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1070.3 359.5 L 1055.3 327.1 L 1041.1 326.5 L 1040.1 336.5 L 1047.4 337.5 L 1062.4 370.0 L 1074.0 370.5 L 1075.0 360.5 L 1074.0 359.5 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-1",
    name: "API Gateway",
    componentType: SysComponent.APIGateway,
    category: "Networking",
    pack: "AWS Serverless",
    width: 160,
    height: 76,
    svg: "<svg viewBox=\"567.1 271.3 288.5 144.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"573.1\" y=\"280.6\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"594.9\" cy=\"319.0\" rx=\"4.3\" ry=\"4.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"615.8\" cy=\"318.9\" rx=\"4.3\" ry=\"4.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"605.6\" cy=\"302.9\" rx=\"4.3\" ry=\"4.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 608.2 306.7 L 613.7 315.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 605.7 311.1 L 613.7 315.1 L 613.2 306.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 603.3 306.7 L 597.3 315.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 598.0 306.5 L 597.3 315.5 L 605.4 311.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 599.4 319.0 L 611.8 319.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 604.0 323.5 L 611.8 319.0 L 604.0 314.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(37.03 618.38 303.84)\"><path d=\"M 607.4 283.3 L 599.7 285.3 L 594.2 288.8 L 590.2 293.2 L 587.1 300.4 L 586.3 305.9 L 588.1 313.8 L 591.4 319.7 L 596.4 324.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 587.7 322.4 L 596.4 324.4 L 593.8 315.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(217.03 737.01 321.28)\"><path d=\"M 623.9 300.8 L 616.2 302.8 L 610.7 306.2 L 606.7 310.7 L 603.6 317.8 L 602.8 323.3 L 604.6 331.3 L 607.9 337.2 L 613.0 341.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 604.2 339.8 L 613.0 341.8 L 610.3 333.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 587.6 314.4 L 584.3 320.6 L 578.9 316.9 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(167.48 669.04 306.87)\"><path d=\"M 630.5 304.1 L 626.7 309.6 L 622.5 304.7 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "aws-2",
    name: "EventBridge",
    componentType: SysComponent.EventStreaming,
    category: "Messaging",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"534.7 270.2 76.7 76.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"540.7\" y=\"276.2\" width=\"64.7\" height=\"64.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 565.6 296.3 L 580.8 296.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-dasharray=\"2 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 564.2 321.1 L 581.3 321.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" stroke-dasharray=\"2 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 547.4 292.2 L 564.3 284.8 L 564.2 333.2 L 547.4 325.6 L 547.4 292.2 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 581.8 284.6 L 582.0 332.9 L 598.8 325.5 L 598.8 292.1 L 581.8 284.6 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 568.5 314.7 L 577.6 302.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 576.3 304.9 L 581.3 309.2 L 576.3 313.3 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 567.06 308.52)\"><path d=\"M 564.5 304.3 L 569.5 308.7 L 564.5 312.7 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "aws-3",
    name: "Step Functions",
    componentType: SysComponent.WorkerService,
    category: "Compute",
    pack: "AWS Serverless",
    width: 64,
    height: 140,
    svg: "<svg viewBox=\"383.7 196.4 76.7 256.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"389.7\" y=\"202.4\" width=\"64.7\" height=\"64.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 407.9 235.0 L 415.2 222.3 L 429.6 222.4 L 437.0 235.1 L 429.9 247.4 L 415.3 247.7 L 407.9 235.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"410.9\" cy=\"215.1\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 412.7 218.0 L 415.1 222.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 433.97 254.46)\"><ellipse cx=\"434.0\" cy=\"254.5\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(180.00 430.93 249.48)\"><path d=\"M 429.7 247.4 L 432.1 251.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><ellipse cx=\"439.6\" cy=\"224.6\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"404.8\" cy=\"245.0\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 422.5 216.2 L 433.5 216.2 L 437.4 222.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 439.3 244.8 L 444.7 235.1 L 440.8 227.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 414.23 250.79)\"><path d=\"M 406.8 247.7 L 417.8 247.7 L 421.7 253.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(180.00 402.20 336.09)\"><path d=\"M 399.5 242.4 L 404.9 232.7 L 401.0 224.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "aws-4",
    name: "DynamoDB",
    componentType: SysComponent.NoSQLDB,
    category: "Database",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"1167.8 125.2 77.1 77.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1173.8\" y=\"131.2\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#4c6ef588\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1209.9 146.5 L 1221.2 146.4 L 1218.8 157.7 L 1226.9 157.6 L 1210.9 176.1 L 1214.4 159.3 L 1206.6 159.4 L 1209.9 146.5 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1216.1 143.4 L 1211.4 142.1 L 1204.9 141.4 L 1196.8 142.0 L 1190.2 143.8 L 1187.7 145.3 L 1186.4 146.9 L 1186.0 149.0 L 1187.2 150.9 L 1190.1 153.0 L 1194.1 154.3 L 1198.3 154.9 L 1203.0 155.2 L 1206.8 155.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1186.2 148.1 L 1186.0 179.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1185.8 179.2 L 1186.3 180.7 L 1187.8 182.3 L 1190.5 183.9 L 1194.4 185.1 L 1198.4 185.9 L 1203.4 186.1 L 1208.9 185.9 L 1213.6 185.1 L 1218.0 183.6 L 1220.9 181.8 L 1222.2 179.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1222.2 179.5 L 1222.1 164.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1186.0 156.5 L 1186.6 158.1 L 1188.5 159.9 L 1191.7 161.6 L 1194.9 162.2 L 1199.0 162.9 L 1203.6 162.8 L 1207.3 162.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1185.9 159.8 L 1186.3 161.6 L 1188.2 163.3 L 1191.8 165.1 L 1196.3 166.1 L 1201.5 166.7 L 1206.4 166.5 L 1209.9 166.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1185.9 168.1 L 1186.5 169.8 L 1188.0 171.4 L 1191.8 173.3 L 1196.7 174.2 L 1201.1 174.6 L 1206.5 174.5 L 1209.8 174.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1185.7 172.1 L 1186.8 173.8 L 1189.5 175.6 L 1192.7 176.7 L 1198.9 178.1 L 1204.9 178.2 L 1210.3 177.7 L 1214.9 176.8 L 1219.2 175.2 L 1221.5 173.3 L 1222.4 171.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1216.6 172.3 L 1220.5 170.1 L 1222.0 168.7 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1189.2 154.7 L 1193.5 156.4 L 1193.4 159.3 L 1189.0 157.6 L 1189.2 154.7 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1189.3 166.5 L 1193.6 168.2 L 1193.5 171.1 L 1189.1 169.4 L 1189.3 166.5 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1189.4 177.9 L 1193.8 179.6 L 1193.6 182.4 L 1189.3 180.7 L 1189.4 177.9 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-5",
    name: "AWS Cognito",
    componentType: SysComponent.Microservice,
    category: "Compute",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"593.3 -92.1 77.1 77.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"599.3\" y=\"-86.1\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fa525288\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"651.4\" cy=\"-37.5\" rx=\"9.7\" ry=\"9.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 646.4 -36.5 L 649.9 -33.0 L 657.1 -40.8 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fa525288\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 640.5 -42.2 L 631.6 -42.3 L 631.3 -65.7 L 653.1 -65.9 L 653.2 -48.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"642.5\" cy=\"-58.3\" rx=\"5.0\" ry=\"5.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fa525288\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 634.2 -43.8 L 636.5 -49.6 L 640.9 -52.6 L 644.1 -52.5 L 647.5 -50.5 L 649.5 -48.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 610.1 -60.5 L 627.6 -60.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 610.2 -55.9 L 620.6 -55.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 623.1 -56.0 L 627.6 -56.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 659.4 -47.5 L 659.4 -60.6 L 657.6 -67.9 L 649.9 -70.5 L 633.1 -70.5 L 615.6 -70.2 L 607.6 -68.1 L 605.6 -60.6 L 605.4 -51.9 L 605.6 -43.2 L 607.3 -36.5 L 614.3 -33.6 L 637.8 -33.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-6",
    name: "Amazon S3",
    componentType: SysComponent.ObjectStorage,
    category: "Storage",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"689.9 -93.6 77.1 77.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"695.9\" y=\"-87.6\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#40c05788\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"729.0\" cy=\"-71.2\" rx=\"19.6\" ry=\"5.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 709.9 -70.7 L 713.7 -38.5 L 716.6 -32.7 L 730.2 -30.2 L 742.4 -32.3 L 745.2 -38.7 L 748.2 -70.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"729.0\" cy=\"-58.1\" rx=\"2.3\" ry=\"2.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#000\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 729.1 -57.8 L 736.1 -50.4 L 746.1 -46.3 L 752.0 -47.7 L 752.4 -51.9 L 747.1 -56.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-7",
    name: "AWS IAM",
    componentType: SysComponent.FirewallWAF,
    category: "Networking",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"878.3 -81.4 77.1 77.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"884.3\" y=\"-75.4\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#7950f288\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 942.0 -42.1 L 923.5 -42.1 L 909.5 -44.0 L 899.7 -48.9 L 894.2 -54.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 942.1 -42.1 L 923.6 -41.9 L 909.5 -40.0 L 899.7 -34.7 L 894.2 -29.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 941.6 -46.3 L 925.1 -46.3 L 912.7 -48.2 L 904.0 -53.1 L 899.1 -58.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 941.8 -51.0 L 927.0 -51.0 L 915.9 -52.9 L 908.1 -57.8 L 904.7 -64.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 942.2 -37.4 L 925.7 -37.4 L 913.2 -35.5 L 904.5 -30.5 L 899.7 -25.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 942.2 -32.5 L 927.5 -32.5 L 916.3 -30.8 L 908.5 -26.5 L 904.6 -20.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-8",
    name: "Amazon SNS",
    componentType: SysComponent.PubSub,
    category: "Messaging",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"907.1 -124.8 77.1 77.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"913.1\" y=\"-118.8\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"925.8\" cy=\"-85.9\" rx=\"3.0\" ry=\"3.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"965.9\" cy=\"-85.9\" rx=\"3.0\" ry=\"3.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"962.7\" cy=\"-96.5\" rx=\"3.0\" ry=\"3.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"962.7\" cy=\"-74.2\" rx=\"3.0\" ry=\"3.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 947.5 -85.8 L 963.2 -85.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 955.4 -97.0 L 955.4 -73.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 959.9 -96.5 L 955.6 -96.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 959.9 -74.0 L 955.6 -74.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"941.2\" cy=\"-91.8\" rx=\"6.8\" ry=\"2.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 934.8 -91.1 L 939.5 -84.0 L 939.8 -76.6 L 942.7 -77.5 L 942.6 -83.9 L 948.1 -91.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 928.9 -85.9 L 935.1 -85.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 926.0 -88.9 L 928.4 -95.9 L 933.5 -101.2 L 939.1 -104.3 L 946.3 -105.7 L 954.2 -103.7 L 958.8 -100.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 925.6 -82.8 L 928.1 -75.5 L 933.3 -70.1 L 939.0 -66.9 L 946.4 -65.5 L 954.6 -67.5 L 959.3 -70.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-9",
    name: "Amazon SQS",
    componentType: SysComponent.MessageQueue,
    category: "Messaging",
    pack: "AWS Serverless",
    width: 96,
    height: 173,
    svg: "<svg viewBox=\"1054.6 -133.0 77.1 129.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1060.6\" y=\"-127.0\" width=\"65.1\" height=\"65.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1072.8\" cy=\"-93.8\" rx=\"4.1\" ry=\"4.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1113.9\" cy=\"-93.9\" rx=\"4.1\" ry=\"4.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1085.7 -101.5 L 1087.3 -98.0 L 1087.8 -93.9 L 1087.0 -89.9 L 1085.1 -86.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(90.00 1095.42 -100.01)\"><path d=\"M 1092.3 -107.5 L 1093.8 -103.9 L 1094.4 -99.8 L 1093.6 -95.9 L 1091.7 -92.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(180.00 1101.36 -93.49)\"><path d=\"M 1098.2 -100.9 L 1099.8 -97.4 L 1100.3 -93.3 L 1099.5 -89.3 L 1097.6 -86.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(270.00 1094.81 -87.54)\"><path d=\"M 1091.7 -95.0 L 1093.2 -91.5 L 1093.7 -87.4 L 1093.0 -83.4 L 1091.1 -80.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 1078.9 -93.8 L 1084.7 -93.8 L 1082.2 -96.3 L 1084.8 -93.8 L 1081.9 -91.1 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1101.5 -93.7 L 1107.3 -93.7 L 1104.8 -96.2 L 1107.3 -93.7 L 1104.5 -91.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1072.8 -97.8 L 1075.3 -105.5 L 1081.1 -110.9 L 1087.9 -114.0 L 1094.7 -114.8 L 1102.5 -112.8 L 1108.3 -108.9 L 1112.4 -103.1 L 1114.1 -97.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 1093.21 -49.99)\"><path d=\"M 1072.5 -73.1 L 1075.1 -80.8 L 1080.8 -86.2 L 1087.6 -89.3 L 1094.5 -90.1 L 1102.3 -88.2 L 1108.0 -84.2 L 1112.1 -78.4 L 1113.9 -73.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "aws-10",
    name: "Aurora Serverless",
    componentType: SysComponent.PrimaryDB,
    category: "Database",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"2300.1 693.5 76.5 76.4\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2306.1\" y=\"699.5\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#4c6ef588\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2326.1\" cy=\"750.5\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2337.8\" cy=\"754.1\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2348.3\" cy=\"750.9\" rx=\"3.3\" ry=\"3.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2337.9 751.4 L 2337.9 737.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2326.2 747.7 L 2326.2 743.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2348.5 748.5 L 2348.5 744.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2325.7 743.3 L 2349.0 743.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2322.3\" y=\"717.0\" width=\"31.5\" height=\"20.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2322.5 717.1 L 2337.7 730.2 L 2353.8 717.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2322.9 737.9 L 2334.8 728.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2353.7 737.3 L 2341.6 727.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2321.0 746.1 L 2317.2 741.0 L 2314.5 731.4 L 2316.4 719.8 L 2322.6 711.7 L 2330.9 707.4 L 2340.0 706.0 L 2349.3 708.5 L 2356.5 714.0 L 2360.8 722.1 L 2362.1 732.4 L 2359.1 741.6 L 2354.5 747.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-11",
    name: "Amazon Kinesis",
    componentType: SysComponent.StreamProcessing,
    category: "Messaging",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"2168.9 821.8 76.5 76.4\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2174.9\" y=\"827.8\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#7950f288\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2207.1\" cy=\"860.0\" rx=\"25.3\" ry=\"24.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2210.3\" cy=\"847.0\" rx=\"4.4\" ry=\"4.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2217.3\" cy=\"869.3\" rx=\"4.4\" ry=\"4.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2196.4\" cy=\"861.4\" rx=\"4.4\" ry=\"4.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2214.4 853.0 L 2216.7 857.3 L 2218.0 861.9 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(315.00 2207.13 865.01)\"><path d=\"M 2205.3 860.6 L 2207.6 864.8 L 2209.0 869.4 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(248.12 2200.92 853.03)\"><path d=\"M 2199.7 850.1 L 2201.2 852.9 L 2202.1 856.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(189.04 2196.81 875.73)\"><path d=\"M 2194.2 869.0 L 2197.5 875.5 L 2199.4 882.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(282.97 2185.91 860.93)\"><path d=\"M 2184.7 858.0 L 2186.2 860.8 L 2187.1 863.9 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(333.99 2224.08 875.31)\"><path d=\"M 2223.5 873.6 L 2224.2 875.3 L 2224.6 877.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(28.54 2218.27 879.13)\"><path d=\"M 2217.1 876.3 L 2218.6 879.0 L 2219.4 882.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(275.54 2220.55 842.80)\"><path d=\"M 2219.5 838.9 L 2220.8 842.7 L 2221.6 846.8 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(344.62 2204.74 838.90)\"><path d=\"M 2203.1 836.2 L 2205.2 838.8 L 2206.3 841.6 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "aws-12",
    name: "CloudWatch",
    componentType: SysComponent.DistributedTracing,
    category: "Compute",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"2086.0 814.6 76.5 76.4\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2092.0\" y=\"820.6\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2135.8\" cy=\"857.9\" rx=\"10.9\" ry=\"10.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2135.8\" cy=\"858.0\" rx=\"8.0\" ry=\"8.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2140.3 867.8 L 2146.5 875.8 L 2149.3 875.9 L 2149.5 873.4 L 2143.6 865.8 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2149.2 852.2 L 2149.9 847.4 L 2147.6 843.7 L 2143.1 842.4 L 2142.6 841.6 L 2141.7 837.9 L 2137.4 836.1 L 2133.5 838.6 L 2133.1 838.2 L 2127.1 831.9 L 2118.4 829.1 L 2110.2 832.6 L 2106.3 841.5 L 2105.7 843.0 L 2099.7 846.8 L 2098.7 854.5 L 2103.6 859.9 L 2109.4 860.3 L 2116.6 860.4 L 2121.4 860.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-13",
    name: "AppSync GraphQL",
    componentType: SysComponent.APIGateway,
    category: "Networking",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"2288.3 1133.9 76.7 76.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2294.3\" y=\"1139.9\" width=\"64.7\" height=\"64.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#e6498088\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2326.1\" cy=\"1150.6\" rx=\"2.9\" ry=\"2.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2326.2\" cy=\"1193.8\" rx=\"2.9\" ry=\"2.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2301.1\" y=\"1163.1\" width=\"19.0\" height=\"6.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2301.1\" y=\"1175.3\" width=\"19.0\" height=\"6.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2333.3\" y=\"1168.2\" width=\"19.0\" height=\"8.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2310.8 1169.8 L 2310.8 1174.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2310.9 1158.8 L 2343.7 1158.8\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2310.4 1157.9 L 2310.4 1162.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2342.9 1158.6 L 2342.9 1164.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2326.2 1154.0 L 2326.2 1158.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2311.0 1186.2 L 2343.8 1186.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2326.2 1185.4 L 2326.2 1190.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2310.9 1182.0 L 2310.9 1187.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2342.8 1180.9 L 2342.8 1186.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "aws-14",
    name: "AWS Fargate",
    componentType: SysComponent.Docker,
    category: "Compute",
    pack: "AWS Serverless",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"2375.3 1133.7 76.7 76.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2381.3\" y=\"1139.7\" width=\"64.7\" height=\"64.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fa525288\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2430.4 1190.8 L 2439.7 1191.0 L 2417.7 1154.9 L 2408.6 1154.8 L 2430.4 1190.8 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2417.2 1190.7 L 2426.5 1190.9 L 2406.3 1158.3 L 2402.0 1165.4 L 2417.2 1190.7 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2400.2 1168.4 L 2387.5 1191.2 L 2413.8 1191.1 L 2409.2 1183.6 L 2399.4 1183.8 L 2404.6 1175.3 L 2399.8 1167.3 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-0",
    name: "Slack",
    componentType: SysComponent.Microservice,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 134,
    svg: "<svg viewBox=\"1803.1 1471.1 79.0 105.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1809.1\" y=\"1477.1\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1829.0 1525.9 L 1830.6 1533.8 L 1838.2 1532.9 L 1838.8 1512.3 L 1829.8 1512.1 L 1829.0 1525.9 Z\" stroke=\"#e01e5a\" stroke-width=\"1\" fill=\"#e01e5a\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1818.0 1510.5 L 1815.1 1512.8 L 1814.1 1517.2 L 1819.1 1520.6 L 1824.7 1518.1 L 1824.9 1510.2 L 1824.9 1510.2 L 1818.0 1510.5 Z\" stroke=\"#e01e5a\" stroke-width=\"1\" fill=\"#e01e5a\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(90.00 1828.01 1516.64)\"><path d=\"M 1823.1 1505.8 L 1824.7 1513.7 L 1832.3 1512.9 L 1832.9 1492.3 L 1823.9 1492.1 L 1823.1 1505.8 Z\" stroke=\"#36c5f0\" stroke-width=\"1\" fill=\"#36c5f0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 1838.18 1488.45)\"><path d=\"M 1832.8 1483.3 L 1830.0 1485.6 L 1828.9 1490.0 L 1833.9 1493.3 L 1839.5 1490.9 L 1839.7 1482.9 L 1839.7 1482.9 L 1832.8 1483.3 Z\" stroke=\"#36c5f0\" stroke-width=\"1\" fill=\"#36c5f0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(180.00 1847.57 1509.53)\"><path d=\"M 1842.7 1498.7 L 1844.2 1506.6 L 1851.9 1505.8 L 1852.5 1485.1 L 1843.4 1485.0 L 1842.7 1498.7 Z\" stroke=\"#2eb67d\" stroke-width=\"1\" fill=\"#2eb67d\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(180.00 1866.88 1501.75)\"><path d=\"M 1861.5 1496.5 L 1858.7 1498.9 L 1857.6 1503.3 L 1862.6 1506.6 L 1868.2 1504.2 L 1868.4 1496.2 L 1868.4 1496.2 L 1861.5 1496.5 Z\" stroke=\"#2eb67d\" stroke-width=\"1\" fill=\"#2eb67d\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(270.00 1854.31 1530.49)\"><path d=\"M 1849.4 1519.7 L 1851.0 1527.5 L 1858.6 1526.7 L 1859.2 1506.1 L 1850.2 1505.9 L 1849.4 1519.7 Z\" stroke=\"#ecb22e\" stroke-width=\"1\" fill=\"#ecb22e\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(270.00 1850.91 1530.28)\"><path d=\"M 1845.5 1525.1 L 1842.7 1527.4 L 1841.7 1531.8 L 1846.7 1535.2 L 1852.3 1532.7 L 1852.5 1524.8 L 1852.5 1524.7 L 1845.5 1525.1 Z\" stroke=\"#ecb22e\" stroke-width=\"1\" fill=\"#ecb22e\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1815.4\" y=\"1568.4\">Slack</tspan></text></svg>"
  },
  {
    id: "arch-1",
    name: "Docker",
    componentType: SysComponent.Docker,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 136,
    svg: "<svg viewBox=\"1993.6 1470.3 79.0 106.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2000.9\" y=\"1476.3\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2016.0 1511.7 L 2042.5 1511.1 L 2048.9 1510.3 L 2047.6 1505.2 L 2049.7 1500.3 L 2052.9 1504.9 L 2052.5 1508.5 L 2057.7 1504.9 L 2061.8 1506.4 L 2059.4 1509.7 L 2054.0 1512.2 L 2040.1 1526.6 L 2016.2 1528.1 L 2005.2 1512.8 L 2012.5 1511.1 L 2015.7 1511.6 Z\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2009.8\" y=\"1503.8\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2016.7\" y=\"1503.6\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2024.0\" y=\"1503.7\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2031.3\" y=\"1503.4\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2038.1\" y=\"1503.5\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2016.5\" y=\"1496.8\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2023.8\" y=\"1496.9\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2031.2\" y=\"1496.9\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2031.0\" y=\"1489.8\" width=\"5.6\" height=\"5.6\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1999.6\" y=\"1568.6\">Docker</tspan></text></svg>"
  },
  {
    id: "arch-2",
    name: "GitHub",
    componentType: SysComponent.WorkerService,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 140,
    svg: "<svg viewBox=\"2125.2 1476.2 77.0 107.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2131.4\" y=\"1482.2\" width=\"64.5\" height=\"64.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"2163.7\" cy=\"1514.5\" rx=\"25.9\" ry=\"25.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2153.5 1499.0 L 2156.0 1499.9 L 2157.7 1501.7 L 2160.0 1500.9 L 2166.5 1501.0 L 2168.5 1501.2 L 2170.0 1500.0 L 2172.2 1498.5 L 2172.8 1500.6 L 2172.7 1502.6 L 2174.7 1504.5 L 2175.6 1509.9 L 2174.9 1515.6 L 2172.9 1517.8 L 2170.1 1519.0 L 2167.2 1519.7 L 2168.0 1520.4 L 2168.8 1522.0 L 2169.0 1527.2 L 2169.0 1530.3 L 2168.0 1530.8 L 2160.7 1530.9 L 2159.8 1530.0 L 2159.5 1526.4 L 2157.8 1526.9 L 2155.0 1527.0 L 2152.4 1525.5 L 2150.8 1522.9 L 2149.2 1521.3 L 2147.5 1520.2 L 2149.8 1520.4 L 2151.5 1521.7 L 2153.3 1523.4 L 2155.6 1524.5 L 2158.1 1524.2 L 2159.4 1523.2 L 2159.5 1521.7 L 2160.1 1520.4 L 2161.0 1519.8 L 2157.7 1518.9 L 2154.6 1517.9 L 2153.0 1515.6 L 2151.8 1510.0 L 2152.8 1504.7 L 2154.1 1503.2 L 2153.3 1501.3 L 2153.5 1499.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"2131.2\" y=\"1574.7\">GitHub</tspan></text></svg>"
  },
  {
    id: "arch-3",
    name: "VPC",
    componentType: SysComponent.ReverseProxy,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"1436.4 1630.3 281.5 176.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1442.4\" y=\"1636.3\" width=\"269.5\" height=\"164.5\" stroke=\"#2b8a3e\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1491.4\" y=\"1667.8\">VPC</tspan></text><rect x=\"1442.7\" y=\"1636.5\" width=\"39.6\" height=\"42.5\" stroke=\"#2b8a3e\" stroke-width=\"2\" fill=\"#40c05788\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1475.6 1666.2 L 1479.2 1662.3 L 1478.0 1657.7 L 1472.9 1656.1 L 1472.6 1655.6 L 1472.1 1653.4 L 1469.6 1652.4 L 1467.3 1653.8 L 1467.1 1653.6 L 1463.6 1649.9 L 1458.4 1648.2 L 1453.6 1650.3 L 1451.3 1655.5 L 1451.0 1656.4 L 1447.5 1658.6 L 1446.9 1663.1 L 1449.8 1666.3 L 1453.2 1666.5 L 1457.4 1666.6 L 1475.6 1666.2 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1458.1\" y=\"1657.4\" width=\"6.7\" height=\"6.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1458.3 1657.3 L 1458.5 1656.5 L 1458.9 1655.3 L 1459.8 1654.4 L 1460.8 1653.7 L 1462.1 1653.6 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1464.7 1657.4 L 1464.5 1656.5 L 1464.1 1655.3 L 1463.2 1654.4 L 1462.3 1653.7 L 1460.9 1653.6 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-4",
    name: "Private subnet",
    componentType: SysComponent.ReverseProxy,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"1747.0 1630.3 281.5 176.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1753.0\" y=\"1636.3\" width=\"269.5\" height=\"164.5\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#0091e2\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1798.0\" y=\"1667.8\">Private subnet</tspan></text><rect x=\"1753.3\" y=\"1636.5\" width=\"39.6\" height=\"42.5\" stroke=\"#0091e2\" stroke-width=\"2\" fill=\"#4c6ef588\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1762.9\" y=\"1655.1\" width=\"20.3\" height=\"16.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(2.13 1773.69 1660.27)\"><path d=\"M 1767.3 1654.8 L 1766.9 1650.9 L 1768.6 1645.9 L 1773.5 1644.0 L 1777.8 1645.9 L 1779.5 1649.9 L 1779.8 1654.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><ellipse cx=\"1773.0\" cy=\"1661.9\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1773.0 1664.7 L 1773.0 1669.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-5",
    name: "Public subnet",
    componentType: SysComponent.ReverseProxy,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"2062.2 1630.3 281.5 176.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2068.2\" y=\"1636.3\" width=\"269.5\" height=\"164.5\" stroke=\"#2b8a3e\" stroke-width=\"2\" fill=\"#2b8a3e\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"2114.4\" y=\"1668.5\">Public subnet</tspan></text><rect x=\"2078.1\" y=\"1655.8\" width=\"20.3\" height=\"16.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(2.13 2088.82 1660.96)\"><path d=\"M 2082.4 1655.5 L 2082.1 1651.6 L 2083.7 1646.6 L 2088.7 1644.6 L 2092.9 1646.6 L 2094.6 1650.6 L 2094.9 1655.2\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><ellipse cx=\"2088.2\" cy=\"1662.6\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2088.2 1665.4 L 2088.2 1670.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"2068.4\" y=\"1637.2\" width=\"39.6\" height=\"42.5\" stroke=\"#2b8a3e\" stroke-width=\"2\" fill=\"#40c05788\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-6",
    name: "User",
    componentType: SysComponent.WebClient,
    category: "Architecture",
    pack: "Architecture",
    width: 68,
    height: 140,
    svg: "<svg viewBox=\"1474.0 2022.7 61.3 113.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1482.7\" y=\"2127.6\">User</tspan></text><path d=\"M 1480.0 2095.4 L 1485.5 2066.4 L 1503.6 2051.6 L 1521.7 2063.2 L 1529.2 2092.4 L 1480.0 2095.4 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1505.0\" cy=\"2039.8\" rx=\"12.6\" ry=\"11.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-7",
    name: "Users",
    componentType: SysComponent.MobileClient,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 106,
    svg: "<svg viewBox=\"1629.4 2034.5 95.6 104.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1648.7\" y=\"2130.2\">Users</tspan></text><ellipse cx=\"1699.0\" cy=\"2049.1\" rx=\"9.9\" ry=\"8.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1655.8\" cy=\"2049.7\" rx=\"9.9\" ry=\"8.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1656.4 2100.0 L 1661.1 2075.3 L 1676.4 2062.7 L 1691.8 2072.6 L 1698.2 2097.4 L 1656.4 2100.0 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1677.6\" cy=\"2052.8\" rx=\"10.7\" ry=\"9.4\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1685.5 2066.3 L 1690.7 2060.7 L 1695.1 2057.9 L 1702.6 2057.5 L 1707.8 2058.7 L 1711.4 2062.7 L 1713.8 2067.9 L 1716.2 2074.3 L 1718.2 2080.6 L 1719.0 2085.8 L 1718.2 2091.0 L 1715.0 2093.4 L 1710.6 2094.6 L 1704.2 2095.0 L 1700.3 2094.2 L 1699.9 2088.6 L 1698.3 2085.0 L 1695.5 2079.4 L 1691.5 2071.9 L 1685.5 2066.3 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1667.6 2066.3 L 1663.6 2061.9 L 1659.2 2059.1 L 1651.7 2058.7 L 1646.5 2059.9 L 1642.9 2063.9 L 1640.5 2069.1 L 1638.2 2075.4 L 1636.2 2081.8 L 1635.4 2087.0 L 1636.2 2092.2 L 1639.3 2094.5 L 1643.3 2096.5 L 1649.7 2097.7 L 1656.5 2097.7 L 1657.3 2090.6 L 1658.1 2087.0 L 1659.2 2081.0 L 1662.8 2073.1 L 1667.6 2066.3 Z\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-8",
    name: "Device",
    componentType: SysComponent.IoTDevice,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 155,
    svg: "<svg viewBox=\"1857.6 2017.9 75.0 113.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"1872.7\" y=\"2023.9\" width=\"44.9\" height=\"68.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1877.8\" y=\"2029.2\" width=\"35.4\" height=\"52.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1895.5\" cy=\"2087.5\" rx=\"3.6\" ry=\"3.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1883.1\" y=\"2035.8\" width=\"24.9\" height=\"12.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#4c6ef588\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1883.1\" y=\"2058.4\" width=\"24.9\" height=\"12.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#4c6ef588\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"1863.6\" y=\"2123.4\">Device</tspan></text></svg>"
  },
  {
    id: "arch-9",
    name: "Server",
    componentType: SysComponent.Server,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 159,
    svg: "<svg viewBox=\"2049.0 2019.0 75.0 116.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2067.8\" y=\"2025.0\" width=\"37.3\" height=\"69.6\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"2055.0\" y=\"2126.9\">Server</tspan></text><path d=\"M 2072.3 2032.7 L 2100.9 2032.7\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2072.2 2039.1 L 2100.7 2039.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2072.1 2045.5 L 2100.7 2045.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2072.1 2051.9 L 2100.7 2051.9\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "arch-10",
    name: "Email",
    componentType: SysComponent.MessageQueue,
    category: "Architecture",
    pack: "Architecture",
    width: 96,
    height: 118,
    svg: "<svg viewBox=\"2264.0 2029.0 74.5 88.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"2276.2\" y=\"2109.4\">Email</tspan></text><rect x=\"2270.0\" y=\"2035.4\" width=\"62.5\" height=\"41.5\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2270.9 2039.2 L 2301.6 2063.1\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 2302.8 2064.3 L 2332.1 2035.0\" stroke=\"#000000\" stroke-width=\"2\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-0",
    name: "Event Stream Flow",
    componentType: SysComponent.EventStreaming,
    category: "Messaging",
    pack: "Software Patterns",
    width: 96,
    height: 85,
    svg: "<svg viewBox=\"48.3 332.8 128.4 115.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 117.4 338.8 L 55.0 358.0 L 54.3 418.3 L 109.8 442.5 L 169.4 418.0 L 170.7 360.1 L 117.4 338.8 Z\" stroke=\"#881fa3\" stroke-width=\"1\" fill=\"#be4bdb\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-1",
    name: "Relational Database",
    componentType: SysComponent.Database,
    category: "Database",
    pack: "Software Patterns",
    width: 96,
    height: 121,
    svg: "<svg viewBox=\"-257.2 316.4 102.5 125.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M -249.7 331.4 L -249.4 417.5 L -249.7 427.3 L -245.2 431.5 L -229.4 435.1 L -202.7 436.2 L -177.3 434.4 L -163.7 430.2 L -161.8 426.6 L -161.5 418.7 L -161.8 338.7 L -162.2 331.1 L -167.9 326.9 L -179.8 324.4 L -207.0 322.4 L -228.8 323.6 L -245.9 327.8 L -249.8 331.4 L -249.7 331.4 Z\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"#228be6\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -249.0 396.7 L -246.7 400.6 L -236.7 403.9 L -223.3 405.9 L -202.4 406.1 L -178.0 404.8 L -163.7 400.2 L -160.7 396.3\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -250.1 363.7 L -247.8 367.6 L -237.8 370.8 L -224.4 372.8 L -203.5 373.0 L -179.1 371.7 L -164.8 367.1 L -161.8 363.2\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-207.4\" cy=\"332.3\" rx=\"43.8\" ry=\"8.9\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-173.3\" cy=\"355.0\" rx=\"6.4\" ry=\"7.0\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-173.3\" cy=\"385.6\" rx=\"6.4\" ry=\"7.0\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-173.3\" cy=\"418.8\" rx=\"6.4\" ry=\"7.0\" stroke=\"#0a11d3\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-2",
    name: "Decision Gateway",
    componentType: SysComponent.ReverseProxy,
    category: "Networking",
    pack: "Software Patterns",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"-115.6 341.2 124.6 82.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"-53.2,381.2 3.1,399.6 -53.2,418.0 -109.6,399.6\" stroke=\"#c92a2a\" stroke-width=\"1\" fill=\"#fd8888\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"-53.2,372.4 3.1,390.7 -53.2,409.1 -109.6,390.7\" stroke=\"#c92a2a\" stroke-width=\"1\" fill=\"#fd8888\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"-53.2,359.7 3.1,378.1 -53.2,396.5 -109.6,378.1\" stroke=\"#c92a2a\" stroke-width=\"1\" fill=\"#fd8888\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"-53.2,347.2 3.1,365.6 -53.2,384.0 -109.6,365.6\" stroke=\"#c92a2a\" stroke-width=\"1\" fill=\"#fd8888\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-3",
    name: "Service Ingress Node",
    componentType: SysComponent.APIGateway,
    category: "Networking",
    pack: "Software Patterns",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"-480.8 513.9 171.1 116.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(90.00 -445.46 598.05)\"><path d=\"M -471.9 480.6 L -471.7 597.4 L -471.9 610.7 L -469.2 616.5 L -459.8 621.3 L -444.0 622.8 L -428.9 620.4 L -420.9 614.6 L -419.7 609.8 L -419.6 599.1 L -419.7 490.4 L -420.0 480.1 L -423.3 474.4 L -430.4 471.1 L -446.5 468.3 L -459.5 469.9 L -469.6 475.6 L -471.9 480.5 L -471.9 480.6 Z\" stroke=\"#087f5b\" stroke-width=\"1\" fill=\"#40c057\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 -471.04 548.07)\"><path d=\"M -496.4 539.7 L -495.1 544.8 L -489.3 549.0 L -481.6 551.6 L -469.6 551.8 L -455.6 550.2 L -447.4 544.2 L -445.7 539.1\" stroke=\"#087f5b\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 -425.68 547.27)\"><path d=\"M -451.0 540.0 L -449.6 544.1 L -443.9 547.5 L -436.2 549.6 L -424.3 549.8 L -410.3 548.4 L -402.1 543.7 L -400.4 539.6\" stroke=\"#087f5b\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(90.00 -378.73 545.59)\"><ellipse cx=\"-378.7\" cy=\"545.6\" rx=\"25.6\" ry=\"11.4\" stroke=\"#087f5b\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "soft-4",
    name: "Document / Records",
    componentType: SysComponent.ObjectStorage,
    category: "Storage",
    pack: "Software Patterns",
    width: 96,
    height: 134,
    svg: "<svg viewBox=\"-416.2 317.7 99.6 134.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"-393.3\" y=\"339.0\" width=\"70.7\" height=\"107.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"-400.8\" y=\"332.0\" width=\"70.7\" height=\"107.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"-410.2\" y=\"323.7\" width=\"70.7\" height=\"107.3\" stroke=\"#000000\" stroke-width=\"2\" fill=\"#fff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -398.3 372.4 L -357.8 372.6 L -351.7 369.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -396.4 341.0 L -379.6 338.2 L -350.8 340.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -396.5 408.4 L -370.1 408.1 L -358.9 410.7 L -348.1 406.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -399.7 419.6 L -389.5 418.5 L -383.5 418.8 L -353.4 420.2 L -345.3 417.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -399.4 356.0 L -381.2 355.5 L -352.4 357.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -399.3 390.5 L -391.2 392.0 L -381.1 389.9 L -352.3 392.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-5",
    name: "Web Browser Client",
    componentType: SysComponent.WebClient,
    category: "Clients",
    pack: "Software Patterns",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"-601.1 338.0 141.0 88.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"-594.0\" y=\"344.0\" width=\"127.9\" height=\"76.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -595.1 354.7 L -466.2 354.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-587.0\" cy=\"350.8\" rx=\"2.5\" ry=\"2.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fa5252\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-576.7\" cy=\"350.8\" rx=\"2.5\" ry=\"2.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-566.0\" cy=\"351.2\" rx=\"2.5\" ry=\"2.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#40c057\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-531.1\" cy=\"386.1\" rx=\"21.4\" ry=\"21.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#04aaf7\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -525.4 381.0 L -527.3 380.6 L -533.0 374.7 L -536.8 376.6 L -538.0 383.4 L -536.7 387.7 L -542.8 389.9 L -542.6 394.6 L -537.8 394.3 L -534.1 390.5 L -529.0 398.8 L -525.8 399.1 L -529.2 385.8 L -524.0 385.3 L -522.3 386.8 L -516.2 386.8 L -514.6 381.6 L -521.2 382.1 L -519.9 375.2 L -522.9 375.6 L -525.7 380.1 L -525.4 381.0 Z\" stroke=\"#087f5b\" stroke-width=\"1\" fill=\"#40c057\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -551.4 385.7 L -509.3 385.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -546.3 370.3 L -545.6 372.6 L -542.2 374.5 L -537.8 375.6 L -530.9 375.7 L -522.8 375.0 L -518.0 372.3 L -517.0 370.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-530.5\" cy=\"385.8\" rx=\"7.8\" ry=\"22.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M -544.8 402.0 L -540.7 397.7 L -536.3 396.5 L -529.3 396.4 L -521.2 397.2 L -516.5 399.9 L -515.5 402.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "soft-6",
    name: "Mobile Device Client",
    componentType: SysComponent.MobileClient,
    category: "Clients",
    pack: "Software Patterns",
    width: 96,
    height: 147,
    svg: "<svg viewBox=\"-721.1 324.4 82.8 120.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"-715.1\" y=\"330.4\" width=\"70.8\" height=\"108.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"-707.0\" y=\"338.7\" width=\"55.8\" height=\"82.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"-679.1\" cy=\"430.8\" rx=\"5.7\" ry=\"5.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"-698.7\" y=\"349.2\" width=\"39.2\" height=\"19.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"-698.7\" y=\"384.8\" width=\"39.2\" height=\"19.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-0",
    name: "Generic Node",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "System Design",
    width: 96,
    height: 97,
    svg: "<svg viewBox=\"524.7 188.1 109.4 110.6\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"530.7\" y=\"194.1\" width=\"97.4\" height=\"98.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-1",
    name: "Application Server",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "System Design",
    width: 96,
    height: 94,
    svg: "<svg viewBox=\"523.2 299.8 108.0 106.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"529.2\" y=\"305.8\" width=\"96.0\" height=\"94.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"14.9\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"577.2\" y=\"349.6\">Application</tspan><tspan x=\"577.2\" y=\"368.2\">server</tspan></text></svg>"
  },
  {
    id: "sys-2",
    name: "Multi-Instance Server",
    componentType: SysComponent.Microservice,
    category: "Compute",
    pack: "System Design",
    width: 96,
    height: 94,
    svg: "<svg viewBox=\"510.0 406.9 121.3 119.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"529.2\" y=\"425.9\" width=\"96.0\" height=\"94.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"522.9\" y=\"419.7\" width=\"96.0\" height=\"94.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"516.0\" y=\"412.9\" width=\"96.0\" height=\"94.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"14.9\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"564.0\" y=\"446.7\">Multi</tspan><tspan x=\"564.0\" y=\"465.3\">Instance</tspan><tspan x=\"564.0\" y=\"483.9\">server</tspan></text></svg>"
  },
  {
    id: "sys-3",
    name: "Dedicated Server",
    componentType: SysComponent.Server,
    category: "Compute",
    pack: "System Design",
    width: 160,
    height: 64,
    svg: "<svg viewBox=\"457.5 534.0 187.6 48.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"463.5\" y=\"540.0\" width=\"175.6\" height=\"36.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.4\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"551.3\" y=\"565.1\">server</tspan></text></svg>"
  },
  {
    id: "sys-4",
    name: "Multi-Instance Cluster",
    componentType: SysComponent.Kubernetes,
    category: "Compute",
    pack: "System Design",
    width: 160,
    height: 64,
    svg: "<svg viewBox=\"456.1 587.8 200.7 62.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"475.1\" y=\"607.2\" width=\"175.6\" height=\"36.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"469.1\" y=\"600.2\" width=\"175.6\" height=\"36.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"462.1\" y=\"593.8\" width=\"175.6\" height=\"36.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.4\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"549.9\" y=\"623.8\">Multi Instance</tspan></text></svg>"
  },
  {
    id: "sys-5",
    name: "Network Gateway",
    componentType: SysComponent.APIGateway,
    category: "Networking",
    pack: "System Design",
    width: 96,
    height: 125,
    svg: "<svg viewBox=\"537.5 649.2 87.0 109.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 543.5 664.0 L 543.7 737.1 L 543.5 745.5 L 547.4 749.1 L 560.8 752.1 L 583.4 753.1 L 605.1 751.6 L 616.6 747.9 L 618.2 744.9 L 618.5 738.2 L 618.3 670.1 L 617.9 663.7 L 613.1 660.1 L 602.9 658.0 L 579.8 656.3 L 561.3 657.3 L 546.7 660.8 L 543.5 663.9 L 543.5 664.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"581.0\" cy=\"662.8\" rx=\"37.3\" ry=\"7.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-6",
    name: "Relational DB",
    componentType: SysComponent.Database,
    category: "Database",
    pack: "System Design",
    width: 96,
    height: 100,
    svg: "<svg viewBox=\"512.6 761.3 132.6 137.4\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 540.8 775.2 L 541.0 850.4 L 540.8 859.0 L 544.8 862.7 L 558.5 865.8 L 581.8 866.8 L 604.1 865.3 L 615.9 861.5 L 617.6 858.4 L 617.8 851.5 L 617.7 781.6 L 617.2 774.9 L 612.3 771.2 L 601.9 769.1 L 578.1 767.3 L 559.1 768.4 L 544.1 772.0 L 540.8 775.2 L 540.8 775.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 541.3 832.4 L 543.3 835.8 L 552.1 838.6 L 563.8 840.4 L 582.1 840.5 L 603.4 839.4 L 615.9 835.4 L 618.5 832.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 540.3 803.4 L 542.3 806.8 L 551.1 809.7 L 562.8 811.4 L 581.0 811.6 L 602.4 810.5 L 614.8 806.5 L 617.5 803.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"577.5\" cy=\"775.9\" rx=\"38.3\" ry=\"7.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"581.3\" cy=\"798.7\" rx=\"5.6\" ry=\"6.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"581.7\" cy=\"824.9\" rx=\"5.6\" ry=\"6.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(357.50 582.33 853.66)\"><ellipse cx=\"582.3\" cy=\"853.7\" rx=\"5.6\" ry=\"6.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"17.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"578.9\" y=\"888.8\">Relational DB</tspan></text></svg>"
  },
  {
    id: "sys-7",
    name: "Object Storage",
    componentType: SysComponent.ObjectStorage,
    category: "Storage",
    pack: "System Design",
    width: 96,
    height: 87,
    svg: "<svg viewBox=\"643.8 767.2 144.3 132.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 679.9 780.6 L 680.2 850.5 L 679.9 858.5 L 683.6 861.9 L 696.4 864.8 L 718.1 865.7 L 738.8 864.3 L 749.8 860.8 L 751.3 857.9 L 751.6 851.5 L 751.4 786.5 L 751.0 780.3 L 746.4 776.9 L 736.7 774.9 L 714.6 773.2 L 696.9 774.2 L 683.0 777.6 L 679.9 780.6 L 679.9 780.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"715.7\" cy=\"780.6\" rx=\"35.6\" ry=\"7.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><polygon points=\"733.5,795.1 744.6,808.0 733.5,820.8 722.4,808.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"721.9\" cy=\"845.6\" rx=\"11.8\" ry=\"11.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 699.2 808.4 L 709.7 828.1 L 688.2 827.8 L 699.2 808.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"17.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"716.0\" y=\"889.5\">Object Storage</tspan></text></svg>"
  },
  {
    id: "sys-8",
    name: "Cold Storage",
    componentType: SysComponent.BlockStorage,
    category: "Storage",
    pack: "System Design",
    width: 96,
    height: 107,
    svg: "<svg viewBox=\"655.2 630.3 124.2 137.6\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 678.5 644.2 L 678.8 719.7 L 678.6 728.3 L 682.5 732.0 L 696.4 735.1 L 719.7 736.1 L 742.1 734.5 L 753.9 730.8 L 755.6 727.6 L 755.8 720.7 L 755.6 650.6 L 755.2 643.9 L 750.3 640.2 L 739.8 638.1 L 716.0 636.3 L 696.9 637.4 L 681.9 641.0 L 678.5 644.2 L 678.5 644.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"716.4\" cy=\"644.9\" rx=\"38.4\" ry=\"7.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 717.9 687.5 L 723.4 690.6 L 723.4 696.7 L 717.9 699.8 L 712.3 696.7 L 712.3 690.6 L 717.9 687.5 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(166.74 727.20 704.41)\"><rect x=\"725.5\" y=\"700.0\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(267.35 731.10 699.17)\"><rect x=\"729.4\" y=\"694.7\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(307.04 730.02 702.43)\"><rect x=\"728.4\" y=\"692.3\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(219.52 714.19 707.84)\"><rect x=\"712.5\" y=\"703.4\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(320.14 720.73 707.77)\"><rect x=\"719.1\" y=\"703.3\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(359.83 717.48 708.90)\"><rect x=\"715.8\" y=\"698.8\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(454.02 731.36 688.11)\"><rect x=\"729.7\" y=\"683.7\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(554.64 727.51 682.83)\"><rect x=\"725.8\" y=\"678.4\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(594.33 730.31 684.83)\"><rect x=\"728.6\" y=\"674.7\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(275.73 703.65 698.54)\"><rect x=\"702.0\" y=\"694.1\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(376.35 707.34 703.93)\"><rect x=\"705.7\" y=\"699.5\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(416.04 704.60 701.85)\"><rect x=\"702.9\" y=\"691.8\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(345.50 707.45 682.97)\"><rect x=\"705.8\" y=\"678.5\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(446.11 703.67 688.30)\"><rect x=\"702.0\" y=\"683.8\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(485.81 704.67 685.01)\"><rect x=\"703.0\" y=\"674.9\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(399.96 720.93 679.22)\"><rect x=\"719.3\" y=\"674.8\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(500.57 714.39 679.24)\"><rect x=\"712.7\" y=\"674.8\" width=\"3.3\" height=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(540.27 717.65 678.15)\"><rect x=\"716.0\" y=\"668.1\" width=\"3.3\" height=\"20.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 717.7 690.7 L 720.3 692.2 L 720.3 695.1 L 717.7 696.6 L 715.1 695.1 L 715.1 692.2 L 717.7 690.7 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"17.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"717.3\" y=\"757.9\">Cold Storage</tspan></text></svg>"
  },
  {
    id: "sys-9",
    name: "Document DB",
    componentType: SysComponent.MongoDB,
    category: "Database",
    pack: "System Design",
    width: 96,
    height: 102,
    svg: "<svg viewBox=\"655.9 472.2 131.4 138.7\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 683.4 487.0 L 683.7 562.1 L 683.4 570.7 L 687.4 574.3 L 701.1 577.5 L 724.4 578.5 L 746.7 576.9 L 758.5 573.2 L 760.1 570.0 L 760.4 563.2 L 760.2 493.3 L 759.8 486.7 L 754.8 483.0 L 744.4 480.9 L 720.7 479.1 L 701.7 480.1 L 686.7 483.8 L 683.4 486.9 L 683.4 487.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"721.2\" cy=\"486.0\" rx=\"38.3\" ry=\"7.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"29.2\" font-weight=\"600\" fill=\"#495057\" text-anchor=\"start\"><tspan x=\"701.9\" y=\"545.8\">{</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"29.4\" font-weight=\"600\" fill=\"#495057\" text-anchor=\"start\"><tspan x=\"723.9\" y=\"546.4\">}</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"18.2\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"721.6\" y=\"599.4\">Document DB</tspan></text></svg>"
  },
  {
    id: "sys-10",
    name: "Columnar DB",
    componentType: SysComponent.Cassandra,
    category: "Database",
    pack: "System Design",
    width: 96,
    height: 106,
    svg: "<svg viewBox=\"660.7 340.4 124.1 136.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"17.8\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"722.7\" y=\"466.5\">Columnar DB</tspan></text><path d=\"M 685.2 355.2 L 685.4 429.0 L 685.2 437.4 L 689.1 441.0 L 702.6 444.1 L 725.4 445.0 L 747.3 443.5 L 758.9 439.8 L 760.5 436.8 L 760.8 430.0 L 760.6 361.4 L 760.2 354.9 L 755.3 351.3 L 745.1 349.2 L 721.8 347.4 L 703.1 348.4 L 688.4 352.0 L 685.1 355.1 L 685.2 355.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"722.7\" cy=\"354.0\" rx=\"37.6\" ry=\"7.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"702.1\" y=\"376.6\" width=\"4.4\" height=\"49.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"711.7\" y=\"376.9\" width=\"4.4\" height=\"49.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"720.9\" y=\"376.6\" width=\"4.4\" height=\"49.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"729.9\" y=\"376.9\" width=\"4.4\" height=\"49.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"739.0\" y=\"376.8\" width=\"4.4\" height=\"49.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-11",
    name: "Graph DB",
    componentType: SysComponent.GraphDB,
    category: "Database",
    pack: "System Design",
    width: 96,
    height: 137,
    svg: "<svg viewBox=\"678.0 196.3 100.0 137.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"18.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"728.0\" y=\"324.2\">Graph DB</tspan></text><path d=\"M 689.6 211.2 L 689.9 285.5 L 689.7 293.9 L 693.6 297.6 L 707.2 300.7 L 730.2 301.6 L 752.2 300.1 L 763.8 296.4 L 765.5 293.3 L 765.7 286.5 L 765.5 217.4 L 765.1 210.9 L 760.2 207.3 L 750.0 205.1 L 726.5 203.4 L 707.7 204.4 L 692.9 208.0 L 689.6 211.2 L 689.6 211.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"726.9\" cy=\"210.0\" rx=\"37.8\" ry=\"7.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"728.1\" cy=\"230.4\" rx=\"4.8\" ry=\"4.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"703.5\" cy=\"248.7\" rx=\"4.8\" ry=\"4.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"752.3\" cy=\"248.3\" rx=\"4.8\" ry=\"4.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"744.0\" cy=\"277.6\" rx=\"4.8\" ry=\"4.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"712.5\" cy=\"277.8\" rx=\"4.8\" ry=\"4.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 732.4 232.1 L 749.2 244.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 753.3 252.7 L 747.0 272.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 722.8 232.9 L 705.2 245.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 704.4 252.9 L 711.1 273.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 717.4 278.7 L 738.5 278.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 709.4 249.7 L 748.4 249.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 727.9 235.4 L 716.2 273.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 730.1 235.4 L 741.8 274.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 716.5 274.2 L 749.5 251.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 707.7 252.2 L 741.1 274.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-12",
    name: "Stack Storage",
    componentType: SysComponent.FileSystem,
    category: "Storage",
    pack: "System Design",
    width: 96,
    height: 143,
    svg: "<svg viewBox=\"800.7 739.4 92.2 131.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 807.2 823.4 L 886.9 823.5 L 886.2 765.1 L 847.1 745.4 L 806.7 766.5 L 807.2 823.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"823.1\" y=\"765.8\" width=\"45.9\" height=\"5.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"824.5\" y=\"777.3\" width=\"45.9\" height=\"5.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"823.5\" y=\"789.8\" width=\"45.9\" height=\"5.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"823.3\" y=\"801.4\" width=\"45.9\" height=\"5.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"812.3\" y=\"811.8\" width=\"68.7\" height=\"5.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(269.14 878.70 804.56)\"><rect x=\"866.1\" y=\"802.1\" width=\"25.2\" height=\"5.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(269.14 814.67 804.17)\"><rect x=\"802.7\" y=\"801.6\" width=\"23.9\" height=\"5.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"14.8\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"846.4\" y=\"841.3\">Stack</tspan><tspan x=\"846.4\" y=\"859.9\">Storage</tspan></text></svg>"
  },
  {
    id: "sys-13",
    name: "Key-Value Cache",
    componentType: SysComponent.Cache,
    category: "Database",
    pack: "System Design",
    width: 96,
    height: 70,
    svg: "<svg viewBox=\"785.2 625.3 132.5 100.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"791.2\" y=\"631.3\" width=\"120.5\" height=\"88.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"798.9\" y=\"638.3\" width=\"25.1\" height=\"9.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"838.8\" y=\"637.9\" width=\"66.1\" height=\"10.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 825.5 643.6 L 839.7 643.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 832.8 647.6 L 839.7 643.5 L 832.7 639.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"799.4\" y=\"651.5\" width=\"25.1\" height=\"9.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"839.2\" y=\"651.7\" width=\"66.1\" height=\"10.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 825.3 657.1 L 839.4 657.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 832.4 661.1 L 839.4 657.1 L 832.4 653.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"799.9\" y=\"679.2\" width=\"25.1\" height=\"9.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"839.8\" y=\"679.0\" width=\"66.1\" height=\"10.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 826.1 684.8 L 840.2 684.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 833.3 688.7 L 840.2 684.7 L 833.2 680.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 812.1 661.7 L 812.1 678.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-dasharray=\"2 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 873.6 663.2 L 873.7 679.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-dasharray=\"2 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"811.5\" y=\"648.5\">Key</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"812.1\" y=\"688.7\">Key</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"871.9\" y=\"648.8\">Value</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"871.6\" y=\"689.4\">Value</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"22.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"851.4\" y=\"715.0\">Cache</tspan></text></svg>"
  },
  {
    id: "sys-14",
    name: "Auth & IAM",
    componentType: SysComponent.FirewallWAF,
    category: "Security",
    pack: "System Design",
    width: 96,
    height: 96,
    svg: "<svg viewBox=\"800.2 502.5 110.4 110.1\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"806.2\" y=\"508.5\" width=\"98.4\" height=\"96.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"855.8\" cy=\"526.0\" rx=\"10.5\" ry=\"10.5\" stroke=\"#495057\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"855.8\" cy=\"525.9\" rx=\"7.1\" ry=\"7.1\" stroke=\"#495057\" stroke-width=\"1\" fill=\"#ffffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"840.3\" y=\"530.2\" width=\"30.1\" height=\"26.8\" stroke=\"#495057\" stroke-width=\"1\" fill=\"#868e96\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"845.1\" y=\"523.9\" width=\"3.6\" height=\"8.4\" stroke=\"#868e96\" stroke-width=\"1\" fill=\"#868e96\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"862.8\" y=\"523.9\" width=\"3.6\" height=\"9.9\" stroke=\"#868e96\" stroke-width=\"1\" fill=\"#868e96\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"858.1\" y=\"524.8\" width=\"4.4\" height=\"5.0\" stroke=\"#ffffff\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"849.0\" y=\"524.9\" width=\"1.5\" height=\"5.0\" stroke=\"#ffffff\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 866.3 530.7 L 866.3 524.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 845.0 530.4 L 845.0 524.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 862.6 530.2 L 862.6 524.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 849.0 530.2 L 849.0 524.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"855.5\" cy=\"548.6\" rx=\"8.8\" ry=\"6.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"855.5\" cy=\"537.6\" rx=\"3.2\" ry=\"3.2\" stroke=\"#495057\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"844.9\" y=\"547.3\" width=\"21.1\" height=\"8.7\" stroke=\"#868e96\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 846.9 548.5 L 864.7 548.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"19.9\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"855.4\" y=\"576.0\">Auth &amp;</tspan><tspan x=\"855.4\" y=\"600.9\"> IAM</tspan></text></svg>"
  },
  {
    id: "sys-15",
    name: "DNS Resolver",
    componentType: SysComponent.DNS,
    category: "Networking",
    pack: "System Design",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"804.9 416.5 112.7 71.3\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"823.7\" y=\"453.9\" width=\"78.0\" height=\"27.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"871.7\" cy=\"447.9\" rx=\"26.4\" ry=\"25.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"829.2\" cy=\"463.3\" rx=\"18.3\" ry=\"17.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"843.3\" cy=\"442.5\" rx=\"12.6\" ry=\"11.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"896.0\" cy=\"467.1\" rx=\"15.6\" ry=\"14.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"831.7\" cy=\"465.7\" rx=\"16.1\" ry=\"15.7\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"878.5\" cy=\"458.8\" rx=\"19.4\" ry=\"20.9\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"891.1\" cy=\"466.9\" rx=\"18.6\" ry=\"14.3\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"855.6\" cy=\"448.2\" rx=\"15.5\" ry=\"15.7\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"848.3\" cy=\"460.1\" rx=\"21.4\" ry=\"19.6\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"26.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"863.5\" y=\"461.1\">DNS</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"10.4\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"820.3\" y=\"479.8\">www     127.0.0.1</tspan></text><path d=\"M 840.8 472.6 L 856.6 472.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 849.6 476.6 L 856.6 472.6 L 849.6 468.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-16",
    name: "Load Balancer",
    componentType: SysComponent.LoadBalancer,
    category: "Networking",
    pack: "System Design",
    width: 64,
    height: 140,
    svg: "<svg viewBox=\"813.5 198.1 81.7 213.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"819.5\" y=\"204.1\" width=\"69.7\" height=\"201.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"871.8\" cy=\"283.0\" rx=\"9.2\" ry=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"835.8\" cy=\"280.1\" rx=\"9.2\" ry=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"872.3\" cy=\"333.6\" rx=\"9.2\" ry=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"871.6\" cy=\"231.4\" rx=\"9.2\" ry=\"8.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 839.6 289.3 L 866.3 326.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 859.0 323.6 L 866.3 326.9 L 865.5 319.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 845.6 280.3 L 862.2 281.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 855.0 285.1 L 862.2 281.7 L 855.6 277.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 841.1 271.9 L 866.5 239.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 865.4 247.3 L 866.5 239.4 L 859.1 242.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"14.8\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"854.3\" y=\"377.1\">Load</tspan><tspan x=\"854.3\" y=\"395.6\">Balancer</tspan></text></svg>"
  },
  {
    id: "sys-17",
    name: "Message Queue",
    componentType: SysComponent.MessageQueue,
    category: "Messaging",
    pack: "System Design",
    width: 160,
    height: 67,
    svg: "<svg viewBox=\"933.4 204.6 144.1 67.0\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(269.84 1005.53 225.61)\"><path d=\"M 990.4 159.6 L 1020.7 159.5 L 1020.4 278.3 L 1004.9 291.5 L 990.9 277.6 L 990.4 159.6 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#eeeeee\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><rect x=\"944.0\" y=\"219.4\" width=\"24.6\" height=\"16.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 957.0 227.4 L 968.7 219.7 L 944.7 219.8 L 957.0 227.4 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 996.2 228.8 L 1027.2 228.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" stroke-dasharray=\"2 2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"973.5\" y=\"219.5\" width=\"24.6\" height=\"16.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 986.5 227.0 L 998.2 219.3 L 974.2 219.4 L 986.5 227.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1026.4\" y=\"219.0\" width=\"24.6\" height=\"16.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1039.8 226.1 L 1051.5 218.3 L 1027.5 218.4 L 1039.8 226.1 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"18.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"1005.0\" y=\"261.4\">Message Q</tspan></text></svg>"
  },
  {
    id: "sys-18",
    name: "Data Pipeline",
    componentType: SysComponent.EventStreaming,
    category: "Messaging",
    pack: "System Design",
    width: 160,
    height: 64,
    svg: "<svg viewBox=\"925.3 282.8 151.5 49.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"938.7\" cy=\"307.4\" rx=\"7.4\" ry=\"18.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffffff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1063.4\" cy=\"307.4\" rx=\"7.4\" ry=\"18.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 938.9 289.6 L 1063.4 289.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 938.8 326.0 L 1066.1 326.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"937.5\" y=\"290.3\" width=\"9.4\" height=\"34.1\" stroke=\"transparent\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"24.1\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"956.0\" y=\"319.3\">Pipeline</tspan></text></svg>"
  },
  {
    id: "sys-19",
    name: "Cloud Network",
    componentType: SysComponent.ReverseProxy,
    category: "Networking",
    pack: "System Design",
    width: 96,
    height: 64,
    svg: "<svg viewBox=\"926.3 335.1 144.7 90.2\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"949.1\" y=\"382.6\" width=\"102.8\" height=\"36.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1012.3\" cy=\"374.7\" rx=\"34.7\" ry=\"33.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"956.4\" cy=\"394.9\" rx=\"24.1\" ry=\"23.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"974.9\" cy=\"367.6\" rx=\"16.6\" ry=\"14.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1044.4\" cy=\"400.0\" rx=\"20.5\" ry=\"19.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"959.6\" cy=\"398.1\" rx=\"21.2\" ry=\"20.7\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1021.3\" cy=\"389.0\" rx=\"25.6\" ry=\"27.5\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1038.0\" cy=\"399.6\" rx=\"24.5\" ry=\"18.8\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"991.1\" cy=\"375.0\" rx=\"20.5\" ry=\"20.7\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"981.4\" cy=\"390.7\" rx=\"28.3\" ry=\"25.8\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"20.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"998.6\" y=\"407.4\">cloud</tspan></text></svg>"
  },
  {
    id: "sys-20",
    name: "CDN Edge",
    componentType: SysComponent.CDN,
    category: "Networking",
    pack: "System Design",
    width: 160,
    height: 79,
    svg: "<svg viewBox=\"937.4 421.5 134.8 72.9\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"956.5\" y=\"459.8\" width=\"80.1\" height=\"28.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1005.8\" cy=\"453.6\" rx=\"27.1\" ry=\"26.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"962.2\" cy=\"469.4\" rx=\"18.8\" ry=\"18.2\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"976.6\" cy=\"448.1\" rx=\"12.9\" ry=\"11.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1030.8\" cy=\"473.3\" rx=\"16.0\" ry=\"15.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"964.7\" cy=\"471.9\" rx=\"16.6\" ry=\"16.1\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1012.7\" cy=\"464.8\" rx=\"20.0\" ry=\"21.4\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1025.7\" cy=\"473.0\" rx=\"19.1\" ry=\"14.6\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"989.2\" cy=\"453.8\" rx=\"16.0\" ry=\"16.1\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"981.7\" cy=\"466.1\" rx=\"22.0\" ry=\"20.1\" stroke=\"#ced4da\" stroke-width=\"1\" fill=\"#ced4da\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"29.5\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"1000.8\" y=\"482.9\">CDN</tspan></text><g transform=\"rotate(359.52 1048.37 475.34)\"><path d=\"M 1038.6 472.0 L 1053.8 472.0 L 1053.8 470.2 L 1058.2 473.7 L 1053.6 476.9 L 1053.9 475.3 L 1038.7 475.3 L 1038.6 472.0 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(359.52 1052.63 483.82)\"><path d=\"M 1039.0 480.3 L 1060.0 480.3 L 1060.0 478.4 L 1066.2 482.1 L 1059.7 485.5 L 1060.0 483.8 L 1039.2 483.8 L 1039.0 480.3 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><g transform=\"rotate(359.52 1045.99 467.66)\"><path d=\"M 1038.1 464.2 L 1049.7 464.2 L 1049.7 462.3 L 1053.9 465.9 L 1049.6 469.3 L 1049.7 467.6 L 1038.2 467.6 L 1038.1 464.2 Z\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#868e96\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g></svg>"
  },
  {
    id: "sys-21",
    name: "Archive Storage",
    componentType: SysComponent.ObjectStorage,
    category: "Storage",
    pack: "System Design",
    width: 96,
    height: 72,
    svg: "<svg viewBox=\"936.8 498.0 157.4 121.5\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 945.0 590.7 L 1047.1 590.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 943.2 590.6 L 943.2 539.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1046.4 590.6 L 1046.4 539.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 942.8 540.7 L 1045.3 540.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 943.9 539.9 L 964.6 504.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><g transform=\"rotate(180.00 1057.03 559.61)\"><path d=\"M 1046.7 541.7 L 1025.9 505.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></g><path d=\"M 964.6 504.3 L 1025.7 504.9\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 968.5 511.6 L 1022.4 511.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 964.5 518.0 L 1025.4 518.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 960.9 523.5 L 1027.0 523.5\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 958.1 528.6 L 1031.3 528.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 955.3 533.0 L 1035.1 533.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"971.2\" y=\"535.5\" width=\"43.0\" height=\"12.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"971.2\" y=\"534.9\" width=\"43.0\" height=\"6.0\" stroke=\"#ffffff\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"980.3\" y=\"555.3\" width=\"30.9\" height=\"15.3\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"980.3\" y=\"552.9\" width=\"30.9\" height=\"6.3\" stroke=\"#ffffff\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"10.1\" font-weight=\"600\" fill=\"#ffffff\" text-anchor=\"start\"><tspan x=\"992.1\" y=\"584.7\">7</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"17.1\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"start\"><tspan x=\"966.2\" y=\"589.6\">Archive</tspan></text></svg>"
  },
  {
    id: "sys-22",
    name: "Mobile Client",
    componentType: SysComponent.MobileClient,
    category: "Clients",
    pack: "System Design",
    width: 96,
    height: 172,
    svg: "<svg viewBox=\"948.3 594.4 96.6 163.8\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"16.0\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"996.6\" y=\"749.8\">Mobile</tspan></text><rect x=\"954.3\" y=\"600.4\" width=\"84.6\" height=\"129.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"958.3\" y=\"604.9\" width=\"75.9\" height=\"120.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"997.1\" cy=\"606.4\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fff\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"961.8\" y=\"613.6\" width=\"68.2\" height=\"31.8\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#15aabf\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"966.4\" y=\"652.1\" width=\"23.9\" height=\"18.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"1004.6\" y=\"687.7\" width=\"21.6\" height=\"15.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#495057\" text-anchor=\"start\"><tspan x=\"994.7\" y=\"659.4\">Lorem ipsum dolor sit amet, </tspan><tspan x=\"994.7\" y=\"669.4\">consectetur adipiscing elit,sed</tspan><tspan x=\"994.7\" y=\"679.4\"> do eiusmod tempor incididunt</tspan><tspan x=\"994.7\" y=\"689.4\"> ut labore et dolore magna</tspan><tspan x=\"994.7\" y=\"699.4\"> aliqua. Ut enim ad miveniam,</tspan><tspan x=\"994.7\" y=\"709.4\"> quis nostrud exercitaullamco </tspan><tspan x=\"994.7\" y=\"719.4\">laboris nisi ut aliquip ex ea </tspan><tspan x=\"994.7\" y=\"729.4\">ommodo consequat. Duis aute </tspan><tspan x=\"994.7\" y=\"739.4\">irure dolor in reprehenderit i</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"8.0\" font-weight=\"600\" fill=\"#495057\" text-anchor=\"start\"><tspan x=\"963.3\" y=\"684.7\">Lorem ipsum dolor s, </tspan><tspan x=\"963.3\" y=\"694.7\">consectetur adipng d</tspan><tspan x=\"963.3\" y=\"704.7\"> do eiusmopor incididunt</tspan><tspan x=\"963.3\" y=\"714.7\">ut labore et dolore magna</tspan><tspan x=\"963.3\" y=\"724.7\">aliqua. Ut enim ad miveniam,</tspan><tspan x=\"963.3\" y=\"734.7\">quis nostrud exercitaullamco </tspan><tspan x=\"963.3\" y=\"744.7\">laboris nisi ut aliquip ex ea </tspan><tspan x=\"963.3\" y=\"754.7\">ommodo consequat. Duis aute </tspan><tspan x=\"963.3\" y=\"764.7\"></tspan></text><rect x=\"962.5\" y=\"707.8\" width=\"68.2\" height=\"11.0\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#15aabf\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  },
  {
    id: "sys-23",
    name: "Web Application",
    componentType: SysComponent.WebClient,
    category: "Clients",
    pack: "System Design",
    width: 96,
    height: 75,
    svg: "<svg viewBox=\"925.0 751.3 142.4 113.6\" width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\"><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"16.6\" font-weight=\"600\" fill=\"#000000\" text-anchor=\"middle\"><tspan x=\"996.2\" y=\"855.1\">Web Application</tspan></text><rect x=\"931.0\" y=\"757.3\" width=\"130.4\" height=\"78.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ffffff\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><rect x=\"931.1\" y=\"757.3\" width=\"129.6\" height=\"12.7\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#ced4da\" rx=\"0\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"938.1\" cy=\"763.3\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fa5252\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"948.6\" cy=\"763.3\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#fab005\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"959.5\" cy=\"763.8\" rx=\"2.6\" ry=\"2.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"#40c057\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#228be6\" text-anchor=\"start\"><tspan x=\"966.1\" y=\"796.1\">G</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#d9480f\" text-anchor=\"start\"><tspan x=\"979.1\" y=\"796.1\">o</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#fab005\" text-anchor=\"start\"><tspan x=\"989.4\" y=\"796.1\">o</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#228be6\" text-anchor=\"start\"><tspan x=\"999.0\" y=\"796.1\">g</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#5c940d\" text-anchor=\"start\"><tspan x=\"1007.2\" y=\"796.1\">l</tspan></text><text font-family=\"'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif\" font-size=\"13.7\" font-weight=\"600\" fill=\"#d9480f\" text-anchor=\"start\"><tspan x=\"1012.7\" y=\"796.1\">e</tspan></text><rect x=\"953.0\" y=\"802.1\" width=\"83.9\" height=\"12.4\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\" rx=\"4\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><ellipse cx=\"1029.2\" cy=\"807.3\" rx=\"2.4\" ry=\"2.1\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M 1031.6 809.4 L 1034.0 812.6\" stroke=\"#000000\" stroke-width=\"1\" fill=\"none\"  stroke-linecap=\"round\" stroke-linejoin=\"round\" /></svg>"
  }
]
