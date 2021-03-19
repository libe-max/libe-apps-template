const rawPopDep = [
  [01,9,83155],
  [01,17,70035],
  [01,24,46347],
  [01,29,34155],
  [01,39,86815],
  [01,49,90670],
  [01,59,89454],
  [01,64,38654],
  [01,69,34758],
  [01,74,32939],
  [01,79,20994],
  [01,80,34436],
  [02,9,60983],
  [02,17,55403],
  [02,24,38938],
  [02,29,25568],
  [02,39,61491],
  [02,49,64271],
  [02,59,69912],
  [02,64,35004],
  [02,69,33451],
  [02,74,31521],
  [02,79,16818],
  [02,80,32378],
  [03,9,30630],
  [03,17,28991],
  [03,24,22220],
  [03,29,13657],
  [03,39,32377],
  [03,49,38761],
  [03,59,45767],
  [03,64,23727],
  [03,69,24566],
  [03,74,24723],
  [03,79,15743],
  [03,80,30785],
  [04,9,15901],
  [04,17,14451],
  [04,24,9667],
  [04,29,6778],
  [04,39,17373],
  [04,49,19413],
  [04,59,24047],
  [04,64,12528],
  [04,69,12064],
  [04,74,11833],
  [04,79,7965],
  [04,80,13746],
  [05,9,13718],
  [05,17,12623],
  [05,24,8005],
  [05,29,6183],
  [05,39,15536],
  [05,49,17280],
  [05,59,20074],
  [05,64,10549],
  [05,69,10180],
  [05,74,9320],
  [05,79,6227],
  [05,80,10378],
  [06,9,111105],
  [06,17,95776],
  [06,24,75887],
  [06,29,53770],
  [06,39,127433],
  [06,49,136092],
  [06,59,146856],
  [06,64,69137],
  [06,69,65369],
  [06,74,67350],
  [06,79,50360],
  [06,80,90311],
  [07,9,32839],
  [07,17,30599],
  [07,24,19594],
  [07,29,13511],
  [07,39,34709],
  [07,49,41020],
  [07,59,46950],
  [07,64,23710],
  [07,69,23118],
  [07,74,22664],
  [07,79,14460],
  [07,80,24703],
  [08,9,28151],
  [08,17,25949],
  [08,24,18476],
  [08,29,12770],
  [08,39,30336],
  [08,49,32581],
  [08,59,37296],
  [08,64,18614],
  [08,69,17764],
  [08,74,16537],
  [08,79,8859],
  [08,80,17879],
  [09,9,14105],
  [09,17,13407],
  [09,24,9142],
  [09,29,6812],
  [09,39,15904],
  [09,49,18862],
  [09,59,21574],
  [09,64,11382],
  [09,69,11356],
  [09,74,10506],
  [09,79,6717],
  [09,80,13354],
  [10,9,34990],
  [10,17,32131],
  [10,24,24986],
  [10,29,16104],
  [10,39,36281],
  [10,49,37585],
  [10,59,39795],
  [10,64,19244],
  [10,69,18884],
  [10,74,18771],
  [10,79,10800],
  [10,80,20650],
  [11,9,36959],
  [11,17,34567],
  [11,24,24061],
  [11,29,15636],
  [11,39,39727],
  [11,49,45942],
  [11,59,52020],
  [11,64,26700],
  [11,69,27962],
  [11,74,27401],
  [11,79,17899],
  [11,80,28841],
  [12,9,25517],
  [12,17,24356],
  [12,24,17594],
  [12,29,11744],
  [12,39,28524],
  [12,49,32777],
  [12,59,39176],
  [12,64,20289],
  [12,69,20331],
  [12,74,19976],
  [12,79,12587],
  [12,80,26296],
  [13,9,238521],
  [13,17,196977],
  [13,24,167951],
  [13,29,111057],
  [13,39,255502],
  [13,49,256969],
  [13,59,267451],
  [13,64,121259],
  [13,69,114809],
  [13,74,110413],
  [13,79,79041],
  [13,80,128709],
  [14,9,71013],
  [14,17,69846],
  [14,24,60216],
  [14,29,36605],
  [14,39,78174],
  [14,49,84451],
  [14,59,88608],
  [14,64,44743],
  [14,69,45233],
  [14,74,42847],
  [14,79,24503],
  [14,80,46692],
  [15,9,12067],
  [15,17,11843],
  [15,24,8500],
  [15,29,5629],
  [15,39,14143],
  [15,49,17086],
  [15,59,21035],
  [15,64,11076],
  [15,69,11209],
  [15,74,10735],
  [15,79,6527],
  [15,80,13515],
  [16,9,33161],
  [16,17,31005],
  [16,24,23091],
  [16,29,16451],
  [16,39,37247],
  [16,49,42021],
  [16,59,48932],
  [16,64,25357],
  [16,69,25156],
  [16,74,23487],
  [16,79,14690],
  [16,80,28559],
  [17,9,58093],
  [17,17,57252],
  [17,24,41883],
  [17,29,25839],
  [17,39,66152],
  [17,49,78758],
  [17,59,87029],
  [17,64,47577],
  [17,69,51613],
  [17,74,51121],
  [17,79,31209],
  [17,80,56015],
  [18,9,29419],
  [18,17,26318],
  [18,24,18931],
  [18,29,13165],
  [18,39,31751],
  [18,49,34882],
  [18,59,41734],
  [18,64,21357],
  [18,69,21199],
  [18,74,21252],
  [18,79,12701],
  [18,80,24209],
  [19,9,21072],
  [19,17,21108],
  [19,24,15928],
  [19,29,9654],
  [19,39,23789],
  [19,49,28860],
  [19,59,33144],
  [19,64,17651],
  [19,69,17894],
  [19,74,17595],
  [19,79,10892],
  [19,80,21431],
  [21,9,54475],
  [21,17,51996],
  [21,24,50629],
  [21,29,29685],
  [21,39,61858],
  [21,49,65218],
  [21,59,68294],
  [21,64,33448],
  [21,69,31954],
  [21,74,30803],
  [21,79,18787],
  [21,80,35119],
  [22,9,58866],
  [22,17,58286],
  [22,24,38957],
  [22,29,23306],
  [22,39,60508],
  [22,49,72329],
  [22,59,81175],
  [22,64,43510],
  [22,69,44282],
  [22,74,43585],
  [22,79,24857],
  [22,80,49488],
  [23,9,9104],
  [23,17,8957],
  [23,24,6246],
  [23,29,4270],
  [23,39,10562],
  [23,49,12900],
  [23,59,16682],
  [23,64,9715],
  [23,69,9721],
  [23,74,9490],
  [23,79,5263],
  [23,80,11579],
  [24,9,34499],
  [24,17,33862],
  [24,24,23754],
  [24,29,15817],
  [24,39,39283],
  [24,49,47682],
  [24,59,58838],
  [24,64,32679],
  [24,69,32930],
  [24,74,32984],
  [24,79,20028],
  [24,80,38429],
  [25,9,62425],
  [25,17,57086],
  [25,24,47805],
  [25,29,30412],
  [25,39,66853],
  [25,49,67423],
  [25,59,68746],
  [25,64,31936],
  [25,69,29564],
  [25,74,29669],
  [25,79,18504],
  [25,80,33115],
  [26,9,59704],
  [26,17,53244],
  [26,24,35924],
  [26,29,24496],
  [26,39,62973],
  [26,49,65212],
  [26,59,70012],
  [26,64,33437],
  [26,69,32044],
  [26,74,30690],
  [26,79,20680],
  [26,80,34774],
  [27,9,71290],
  [27,17,63457],
  [27,24,41083],
  [27,29,28110],
  [27,39,72002],
  [27,49,78495],
  [27,59,80520],
  [27,64,38485],
  [27,69,36654],
  [27,74,33506],
  [27,79,18950],
  [27,80,32665],
  [28,9,50949],
  [28,17,44852],
  [28,24,29200],
  [28,29,20223],
  [28,39,50513],
  [28,49,55771],
  [28,59,57361],
  [28,64,27022],
  [28,69,25758],
  [28,74,24485],
  [28,79,14289],
  [28,80,27909],
  [29,9,90208],
  [29,17,88043],
  [29,24,70606],
  [29,29,42270],
  [29,39,99346],
  [29,49,113791],
  [29,59,124274],
  [29,64,64421],
  [29,69,61876],
  [29,74,58837],
  [29,79,33321],
  [29,80,67382],
  ['2A',9,16595],
  ['2A',17,13251],
  ['2A',24,8970],
  ['2A',29,7221],
  ['2A',39,20370],
  ['2A',49,22217],
  ['2A',59,22699],
  ['2A',64,10539],
  ['2A',69,10740],
  ['2A',74,10070],
  ['2A',79,7543],
  ['2A',80,12532],
  ['2B',9,17975],
  ['2B',17,16172],
  ['2B',24,13623],
  ['2B',29,9824],
  ['2B',39,23599],
  ['2B',49,23874],
  ['2B',59,25025],
  ['2B',64,11981],
  ['2B',69,11891],
  ['2B',74,11568],
  ['2B',79,8348],
  ['2B',80,12646],
  [30,9,79756],
  [30,17,72628],
  [30,24,53427],
  [30,29,33954],
  [30,39,83775],
  [30,49,91944],
  [30,59,103365],
  [30,64,51661],
  [30,69,49885],
  [30,74,48297],
  [30,79,31642],
  [30,80,50442],
  [31,9,164088],
  [31,17,140765],
  [31,24,147494],
  [31,29,97762],
  [31,39,194263],
  [31,49,186643],
  [31,59,177073],
  [31,64,74513],
  [31,69,66191],
  [31,74,63607],
  [31,79,41264],
  [31,80,71200],
  [32,9,17126],
  [32,17,16763],
  [32,24,10872],
  [32,29,7226],
  [32,39,18842],
  [32,49,22943],
  [32,59,28176],
  [32,64,14560],
  [32,69,14304],
  [32,74,13837],
  [32,79,8845],
  [32,80,17944],
  [33,9,180261],
  [33,17,162400],
  [33,24,149847],
  [33,29,95630],
  [33,39,214151],
  [33,49,222467],
  [33,59,208374],
  [33,64,94712],
  [33,69,90093],
  [33,74,87940],
  [33,79,54001],
  [33,80,94495],
  [34,9,128036],
  [34,17,115847],
  [34,24,108502],
  [34,29,66902],
  [34,39,143643],
  [34,49,146734],
  [34,59,149627],
  [34,64,70522],
  [34,69,71496],
  [34,74,71508],
  [34,79,47378],
  [34,80,76340],
  [35,9,127228],
  [35,17,118114],
  [35,24,104254],
  [35,29,61913],
  [35,39,136413],
  [35,49,144191],
  [35,59,137756],
  [35,64,60121],
  [35,69,55550],
  [35,74,54226],
  [35,79,31210],
  [35,80,63701],
  [36,9,19536],
  [36,17,18602],
  [36,24,13716],
  [36,29,9003],
  [36,39,20728],
  [36,49,24960],
  [36,59,30645],
  [36,64,16253],
  [36,69,16460],
  [36,74,16240],
  [36,79,10397],
  [36,80,20327],
  [37,9,65525],
  [37,17,61163],
  [37,24,51695],
  [37,29,30942],
  [37,39,71010],
  [37,49,75524],
  [37,59,78861],
  [37,64,37902],
  [37,69,36934],
  [37,74,36055],
  [37,79,22007],
  [37,80,42009],
  [38,9,151154],
  [38,17,135705],
  [38,24,110591],
  [38,29,66908],
  [38,39,156222],
  [38,49,166410],
  [38,59,166718],
  [38,64,73910],
  [38,69,67319],
  [38,74,63308],
  [38,79,42946],
  [38,80,70385],
  [39,9,26312],
  [39,17,24671],
  [39,24,17151],
  [39,29,11475],
  [39,39,28583],
  [39,49,31722],
  [39,59,36547],
  [39,64,17783],
  [39,69,17011],
  [39,74,16610],
  [39,79,10711],
  [39,80,19446],
  [40,9,39765],
  [40,17,37378],
  [40,24,24337],
  [40,29,17106],
  [40,39,45477],
  [40,49,54132],
  [40,59,59000],
  [40,64,29719],
  [40,69,30494],
  [40,74,29538],
  [40,79,17699],
  [40,80,32186],
  [41,9,33290],
  [41,17,31306],
  [41,24,20711],
  [41,29,14062],
  [41,39,34758],
  [41,49,39645],
  [41,59,45141],
  [41,64,22860],
  [41,69,22323],
  [41,74,21978],
  [41,79,12994],
  [41,80,27420],
  [42,9,88946],
  [42,17,77540],
  [42,24,62149],
  [42,29,38250],
  [42,39,86683],
  [42,49,92450],
  [42,59,97400],
  [42,64,46063],
  [42,69,45453],
  [42,74,46148],
  [42,79,29010],
  [42,80,55204],
  [43,9,22813],
  [43,17,21868],
  [43,24,14838],
  [43,29,9725],
  [43,39,23951],
  [43,49,28358],
  [43,59,32207],
  [43,64,16483],
  [43,69,15659],
  [43,74,15430],
  [43,79,8931],
  [43,80,17386],
  [44,9,175039],
  [44,17,154245],
  [44,24,125181],
  [44,29,84343],
  [44,39,189881],
  [44,49,195038],
  [44,59,180424],
  [44,64,81179],
  [44,69,77403],
  [44,74,74007],
  [44,79,42185],
  [44,80,80190],
  [45,9,82628],
  [45,17,72441],
  [45,24,53657],
  [45,29,36136],
  [45,39,82838],
  [45,49,86319],
  [45,59,87528],
  [45,64,40990],
  [45,69,38678],
  [45,74,37618],
  [45,79,22804],
  [45,80,42557],
  [46,9,14501],
  [46,17,13998],
  [46,24,9421],
  [46,29,6802],
  [46,39,16816],
  [46,49,19602],
  [46,59,24726],
  [46,64,14436],
  [46,69,14274],
  [46,74,14111],
  [46,79,8542],
  [46,80,17002],
  [47,9,32469],
  [47,17,30203],
  [47,24,21663],
  [47,29,14321],
  [47,39,34524],
  [47,49,38425],
  [47,59,45458],
  [47,64,23357],
  [47,69,23409],
  [47,74,22782],
  [47,79,15217],
  [47,80,28131],
  [48,9,6948],
  [48,17,6946],
  [48,24,5058],
  [48,29,3296],
  [48,39,7998],
  [48,49,9218],
  [48,59,11021],
  [48,64,5549],
  [48,69,5492],
  [48,74,5372],
  [48,79,3149],
  [48,80,6509],
  [49,9,89810],
  [49,17,90439],
  [49,24,74275],
  [49,29,40775],
  [49,39,94626],
  [49,49,102358],
  [49,59,102703],
  [49,64,49328],
  [49,69,46878],
  [49,74,44848],
  [49,79,26395],
  [49,80,57388],
  [50,9,48525],
  [50,17,45812],
  [50,24,31828],
  [50,29,22470],
  [50,39,52631],
  [50,49,58009],
  [50,59,68032],
  [50,64,35859],
  [50,69,34478],
  [50,74,33420],
  [50,79,19296],
  [50,80,41172],
  [51,9,63171],
  [51,17,57524],
  [51,24,51168],
  [51,29,31719],
  [51,39,68406],
  [51,49,69328],
  [51,59,71987],
  [51,64,33932],
  [51,69,32991],
  [51,74,31651],
  [51,79,17173],
  [51,80,32921],
  [52,9,16199],
  [52,17,14870],
  [52,24,11152],
  [52,29,8279],
  [52,39,17979],
  [52,49,19816],
  [52,59,23827],
  [52,64,12453],
  [52,69,11984],
  [52,74,11566],
  [52,79,6615],
  [52,80,13575],
  [53,9,33996],
  [53,17,32358],
  [53,24,22621],
  [53,29,13847],
  [53,39,33265],
  [53,49,38012],
  [53,59,40734],
  [53,64,19723],
  [53,69,18514],
  [53,74,18166],
  [53,79,10460],
  [53,80,23824],
  [54,9,77730],
  [54,17,72963],
  [54,24,71931],
  [54,29,41850],
  [54,39,90958],
  [54,49,89490],
  [54,59,93068],
  [54,64,44897],
  [54,69,42031],
  [54,74,38907],
  [54,79,21745],
  [54,80,44465],
  [55,9,18328],
  [55,17,17147],
  [55,24,12208],
  [55,29,8220],
  [55,39,20226],
  [55,49,21666],
  [55,59,24971],
  [55,64,12996],
  [55,69,12706],
  [55,74,11824],
  [55,79,6106],
  [55,80,12755],
  [56,9,76275],
  [56,17,72853],
  [56,24,50431],
  [56,29,31021],
  [56,39,80384],
  [56,49,94512],
  [56,59,104540],
  [56,64,56667],
  [56,69,54379],
  [56,74,53863],
  [56,79,29961],
  [56,80,58208],
  [57,9,111047],
  [57,17,96224],
  [57,24,77728],
  [57,29,56609],
  [57,39,132497],
  [57,49,131781],
  [57,59,146437],
  [57,64,71596],
  [57,69,64711],
  [57,74,55207],
  [57,79,33011],
  [57,80,62052],
  [58,9,17302],
  [58,17,16810],
  [58,24,12190],
  [58,29,7860],
  [58,39,18797],
  [58,49,22385],
  [58,59,27331],
  [58,64,15467],
  [58,69,16395],
  [58,74,16125],
  [58,79,9460],
  [58,80,19536],
  [59,9,321486],
  [59,17,282764],
  [59,24,248574],
  [59,29,155288],
  [59,39,330916],
  [59,49,327828],
  [59,59,319840],
  [59,64,148629],
  [59,69,137914],
  [59,74,128093],
  [59,79,67248],
  [59,80,130222],
  [60,9,104891],
  [60,17,89291],
  [60,24,64098],
  [60,29,44879],
  [60,39,106449],
  [60,49,110830],
  [60,59,110969],
  [60,64,49124],
  [60,69,45342],
  [60,74,41658],
  [60,79,22952],
  [60,80,39518],
  [61,9,26923],
  [61,17,25881],
  [61,24,18486],
  [61,29,11784],
  [61,39,27034],
  [61,49,31936],
  [61,59,37885],
  [61,64,20123],
  [61,69,20007],
  [61,74,19539],
  [61,79,11396],
  [61,80,24192],
  [62,9,171959],
  [62,17,156199],
  [62,24,118149],
  [62,29,75434],
  [62,39,179415],
  [62,49,184471],
  [62,59,188532],
  [62,64,92543],
  [62,69,88475],
  [62,74,80795],
  [62,79,40351],
  [62,80,79184],
  [63,9,69250],
  [63,17,65452],
  [63,24,58597],
  [63,29,34768],
  [63,39,79277],
  [63,49,84101],
  [63,59,86286],
  [63,64,42453],
  [63,69,41174],
  [63,74,39913],
  [63,79,24357],
  [63,80,44019],
  [64,9,67039],
  [64,17,62093],
  [64,24,47447],
  [64,29,31974],
  [64,39,78902],
  [64,49,87102],
  [64,59,95890],
  [64,64,46205],
  [64,69,44651],
  [64,74,43333],
  [64,79,28617],
  [64,80,55373],
  [65,9,20210],
  [65,17,19945],
  [65,24,15764],
  [65,29,9527],
  [65,39,23528],
  [65,49,26836],
  [65,59,32737],
  [65,64,17110],
  [65,69,17009],
  [65,74,16235],
  [65,79,10191],
  [65,80,20222],
  [66,9,48430],
  [66,17,43608],
  [66,24,32065],
  [66,29,20714],
  [66,39,50662],
  [66,49,57891],
  [66,59,64555],
  [66,64,32519],
  [66,69,33327],
  [66,74,34329],
  [66,79,22724],
  [66,80,39493],
  [67,9,123508],
  [67,17,109529],
  [67,24,104020],
  [67,29,68569],
  [67,39,145738],
  [67,49,145084],
  [67,59,157339],
  [67,64,72363],
  [67,69,66486],
  [67,74,56357],
  [67,79,35581],
  [67,80,63245],
  [68,9,84336],
  [68,17,72903],
  [68,24,55786],
  [68,29,39860],
  [68,39,93413],
  [68,49,99370],
  [68,59,108543],
  [68,64,50421],
  [68,69,47107],
  [68,74,41133],
  [68,79,25973],
  [68,80,45199],
  [69,9,234634],
  [69,17,196164],
  [69,24,193225],
  [69,29,127946],
  [69,39,258219],
  [69,49,239141],
  [69,59,221569],
  [69,64,93524],
  [69,69,85316],
  [69,74,83182],
  [69,79,57381],
  [69,80,102845],
  [70,9,23640],
  [70,17,23050],
  [70,24,15426],
  [70,29,10091],
  [70,39,25162],
  [70,49,29692],
  [70,59,33145],
  [70,64,16697],
  [70,69,16018],
  [70,74,15603],
  [70,79,8939],
  [70,80,16044],
  [71,9,54397],
  [71,17,50328],
  [71,24,34798],
  [71,29,23463],
  [71,39,57314],
  [71,49,64859],
  [71,59,75967],
  [71,64,38879],
  [71,69,38955],
  [71,74,38658],
  [71,79,23960],
  [71,80,45830],
  [72,9,62440],
  [72,17,57662],
  [72,24,44002],
  [72,29,26670],
  [72,39,61215],
  [72,49,69072],
  [72,59,73851],
  [72,64,36927],
  [72,69,35559],
  [72,74,33431],
  [72,79,20430],
  [72,80,41041],
  [73,9,47109],
  [73,17,42466],
  [73,24,32403],
  [73,29,21834],
  [73,39,53102],
  [73,49,57488],
  [73,59,60727],
  [73,64,28109],
  [73,69,25932],
  [73,74,24443],
  [73,79,16321],
  [73,80,27776],
  [74,9,104200],
  [74,17,83178],
  [74,24,58204],
  [74,29,49901],
  [74,39,120549],
  [74,49,118585],
  [74,59,112302],
  [74,64,45228],
  [74,69,40739],
  [74,74,38929],
  [74,79,25802],
  [74,80,41156],
  [75,9,194194],
  [75,17,163482],
  [75,24,216785],
  [75,29,215982],
  [75,39,333164],
  [75,49,272484],
  [75,59,259253],
  [75,64,111776],
  [75,69,100323],
  [75,74,100525],
  [75,79,66349],
  [75,80,108585],
  [76,9,145117],
  [76,17,127549],
  [76,24,107339],
  [76,29,68884],
  [76,39,153064],
  [76,49,151203],
  [76,59,159418],
  [76,64,77566],
  [76,69,74756],
  [76,74,69298],
  [76,79,40605],
  [76,80,76424],
  [77,9,193152],
  [77,17,161830],
  [77,24,122638],
  [77,29,82654],
  [77,39,191592],
  [77,49,196250],
  [77,59,186156],
  [77,64,77650],
  [77,69,66469],
  [77,74,60416],
  [77,79,35201],
  [77,80,58568],
  [78,9,190880],
  [78,17,160098],
  [78,24,117508],
  [78,29,78997],
  [78,39,183053],
  [78,49,203398],
  [78,59,192197],
  [78,64,78736],
  [78,69,66649],
  [78,74,64213],
  [78,79,43621],
  [78,80,73961],
  [79,9,38506],
  [79,17,37265],
  [79,24,24933],
  [79,29,16514],
  [79,39,40570],
  [79,49,47582],
  [79,59,51626],
  [79,64,25834],
  [79,69,24564],
  [79,74,23204],
  [79,79,14206],
  [79,80,29656],
  [80,9,61639],
  [80,17,58749],
  [80,24,52368],
  [80,29,30616],
  [80,39,66653],
  [80,49,70375],
  [80,59,73359],
  [80,64,35461],
  [80,69,34087],
  [80,74,32142],
  [80,79,18170],
  [80,80,33790],
  [81,9,38885],
  [81,17,37017],
  [81,24,25972],
  [81,29,16001],
  [81,39,41250],
  [81,49,48627],
  [81,59,53866],
  [81,64,26909],
  [81,69,26116],
  [81,74,25601],
  [81,79,16167],
  [81,80,33031],
  [82,9,29282],
  [82,17,27357],
  [82,24,17456],
  [82,29,11458],
  [82,39,29378],
  [82,49,34847],
  [82,59,35458],
  [82,64,17025],
  [82,69,16485],
  [82,74,15563],
  [82,79,9704],
  [82,80,18251],
  [83,9,107278],
  [83,17,94346],
  [83,24,71092],
  [83,29,47672],
  [83,39,119700],
  [83,49,131447],
  [83,59,147677],
  [83,64,73147],
  [83,69,72871],
  [83,74,75676],
  [83,79,54499],
  [83,80,89493],
  [84,9,64169],
  [84,17,54781],
  [84,24,38766],
  [84,29,26901],
  [84,39,64337],
  [84,49,69497],
  [84,59,76489],
  [84,64,36443],
  [84,69,34651],
  [84,74,33606],
  [84,79,23302],
  [84,80,37872],
  [85,9,71378],
  [85,17,68199],
  [85,24,44026],
  [85,29,28911],
  [85,39,74832],
  [85,49,87198],
  [85,59,90642],
  [85,64,48619],
  [85,69,49861],
  [85,74,48840],
  [85,79,27508],
  [85,80,51283],
  [86,9,44924],
  [86,17,44492],
  [86,24,42369],
  [86,29,22366],
  [86,39,48578],
  [86,49,52662],
  [86,59,54986],
  [86,64,28001],
  [86,69,27429],
  [86,74,25467],
  [86,79,15505],
  [86,80,32225],
  [87,9,35731],
  [87,17,33799],
  [87,24,30710],
  [87,29,17312],
  [87,39,38886],
  [87,49,44100],
  [87,59,49279],
  [87,64,25003],
  [87,69,25228],
  [87,74,25387],
  [87,79,15260],
  [87,80,29822],
  [88,9,34675],
  [88,17,33844],
  [88,24,24192],
  [88,29,15915],
  [88,39,38077],
  [88,49,42985],
  [88,59,51410],
  [88,64,26379],
  [88,69,25872],
  [88,74,24831],
  [88,79,13187],
  [88,80,27771],
  [89,9,34627],
  [89,17,31957],
  [89,24,20807],
  [89,29,14809],
  [89,39,36322],
  [89,49,40656],
  [89,59,45451],
  [89,64,23523],
  [89,69,23390],
  [89,74,22906],
  [89,79,13292],
  [89,80,25442],
  [90,9,14985],
  [90,17,13921],
  [90,24,11623],
  [90,29,7508],
  [90,39,16184],
  [90,49,17687],
  [90,59,18570],
  [90,64,8938],
  [90,69,8164],
  [90,74,7720],
  [90,79,4566],
  [90,80,8753],
  [91,9,180266],
  [91,17,144113],
  [91,24,117645],
  [91,29,80000],
  [91,39,174557],
  [91,49,178572],
  [91,59,168038],
  [91,64,69358],
  [91,69,56113],
  [91,74,52935],
  [91,79,34297],
  [91,80,59789],
  [92,9,203421],
  [92,17,157776],
  [92,24,142004],
  [92,29,117660],
  [92,39,244758],
  [92,49,227961],
  [92,59,204643],
  [92,64,82543],
  [92,69,68309],
  [92,74,64434],
  [92,79,42249],
  [92,80,77458],
  [93,9,256375],
  [93,17,185684],
  [93,24,152355],
  [93,29,114839],
  [93,39,255166],
  [93,49,229413],
  [93,59,195170],
  [93,64,78157],
  [93,69,65220],
  [93,74,54417],
  [93,79,32429],
  [93,80,50283],
  [94,9,186006],
  [94,17,142751],
  [94,24,130758],
  [94,29,98542],
  [94,39,204802],
  [94,49,189602],
  [94,59,177680],
  [94,64,74564],
  [94,69,60986],
  [94,74,54563],
  [94,79,34913],
  [94,80,63792],
  [95,9,185562],
  [95,17,144055],
  [95,24,110735],
  [95,29,76473],
  [95,39,175820],
  [95,49,169866],
  [95,59,154524],
  [95,64,66579],
  [95,69,55293],
  [95,74,47279],
  [95,79,27433],
  [95,80,46649],
  [971,9,39834],
  [971,17,39559],
  [971,24,27933],
  [971,29,16577],
  [971,39,36681],
  [971,49,46894],
  [971,59,60313],
  [971,64,28042],
  [971,69,24315],
  [971,74,19837],
  [971,79,14328],
  [971,80,21544],
  [972,9,33332],
  [972,17,33137],
  [972,24,24524],
  [972,29,15085],
  [972,39,34653],
  [972,49,40944],
  [972,59,61707],
  [972,64,29101],
  [972,69,24299],
  [972,74,19774],
  [972,79,14364],
  [972,80,24173],
  [973,9,63161],
  [973,17,46968],
  [973,24,31949],
  [973,29,19584],
  [973,39,41089],
  [973,49,35182],
  [973,59,27023],
  [973,64,10158],
  [973,69,7414],
  [973,74,5041],
  [973,79,2965],
  [973,80,3536],
  [974,9,121070],
  [974,17,106821],
  [974,24,75376],
  [974,29,46642],
  [974,39,105105],
  [974,49,112656],
  [974,59,125419],
  [974,64,49440],
  [974,69,41081],
  [974,74,29051],
  [974,79,19850],
  [974,80,25939],
  [976,9,87847],
  [976,17,55949],
  [976,24,30180],
  [976,29,19251],
  [976,39,38955],
  [976,49,29064],
  [976,59,15251],
  [976,64,4746],
  [976,69,3248],
  [976,74,1833],
  [976,79,1295],
  [976,80,1306]
]

const regions = [{
  name: 'Guadeloupe',
  code: '1',
  depts: [971]
}, {
  name: 'Martinique',
  code: '2',
  depts: [972]
}, {
  name: 'Guyane',
  code: '3',
  depts: [973]
}, {
  name: 'La Réunion',
  code: '4',
  depts: [974]
}, {
  name: 'Mayotte',
  code: '6',
  depts: [976]
}, {
  name: 'Île-de-France',
  code: '11',
  depts: [75, 77, 78, 91, 92, 93, 94, 95]
}, {
  name: 'Centre-Val-de-Loire',
  code: '24',
  depts: [18, 28, 36, 37, 41, 45]
}, {
  name: 'Bourgogne-Franche-Comté',
  code: '27',
  depts: [21, 25, 39, 58, 70, 71, 89, 90]
}, {
  name: 'Normandie',
  code: '28',
  depts: [14, 27, 50, 61, 76]
}, {
  name: 'Hauts-de-France',
  code: '32',
  depts: [2, 59, 60, 62, 80]
}, {
  name: 'Grand Est',
  code: '44',
  depts: [8, 10, 51, 52, 54, 55, 57, 67, 68, 88]
}, {
  name: 'Pays de la Loire',
  code: '52',
  depts: [44, 49, 53, 72, 85]
}, {
  name: 'Bretagne',
  code: '53',
  depts: [22, 29, 35, 56]
}, {
  name: 'Nouvelle-Aquitaine',
  code: '75',
  depts: [16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87]
}, {
  name: 'Occitanie',
  code: '76',
  depts: [9, 11, 12, 30, 31, 32, 34, 46, 47, 48, 65, 66, 81, 82]
}, {
  name: 'Auvergne-Rhône-Alpes',
  code: '84',
  depts: [1, 3, 7, 15, 26, 38, 42, 43, 63, 69, 73, 74]
}, {
  name: 'Provence-Alpes-Côte d\'Azur',
  code: '93',
  depts: [4, 5, 6, 13, 83, 84]
}, {
  name: 'Corse',
  code: '94',
  depts: ['2A', '2B']
}]


rawPopDep.forEach((line, i) => {
  const [dep, cls, pop] = line
  const reg = regions.find(region => region.depts.includes(dep))
  if (!reg.pop) reg.pop = { _tt: 0, _17: 0, _29: 0, _39: 0, _49: 0, _59: 0, _69: 0, _79: 0, _80: 0 }
  switch (cls) {
    case 9:
    case 17:
      reg.pop._17 += pop
      reg.pop._tt += pop
      break
    case 24:
    case 29:
      reg.pop._29 += pop
      reg.pop._tt += pop
      break
    case 39:
      reg.pop._39 += pop
      reg.pop._tt += pop
      break
    case 49:
      reg.pop._49 += pop
      reg.pop._tt += pop
      break
    case 59:
      reg.pop._59 += pop
      reg.pop._tt += pop
      break
    case 64:
    case 69:
      reg.pop._69 += pop
      reg.pop._tt += pop
      break
    case 74:
    case 79:
      reg.pop._79 += pop
      reg.pop._tt += pop
      break
    case 80:
      reg.pop._80 += pop
      reg.pop._tt += pop
      break
    default:
      console.error(i, line)
      break
  }
})

console.log('-----\n\n')
console.log(JSON.stringify(regions, null, 2))
